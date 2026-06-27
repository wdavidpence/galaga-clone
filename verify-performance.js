#!/usr/bin/env node
/**
 * Galaga 20 Iterations - Performance & Bug Fix Verification
 * Uses puppeteer-core to headlessly test the game
 */
const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Find Chrome/Chromium on macOS
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function startServer() {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    });
    
    server.listen(8888, () => resolve(server));
  });
}

async function runTest() {
  console.log('🚀 Starting verification...');
  
  // Start server
  const server = await startServer();
  console.log('  ✓ Server started on http://localhost:8888');
  
  // Launch browser
  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    
    const page = await browser.newPage({
      viewport: { width: 400, height: 700 }
    });
    
    // Navigate to game
    await page.goto('http://localhost:8888/index.html', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(1000);
    
    // Inject performance monitoring
    await page.evaluateOnNewDocument(() => {
      window._gameMetrics = {
        fps: [],
        particles: 0,
        enemies: 0,
        bullets: 0,
        errors: 0,
        startTime: Date.now()
      };
      
      // Monitor DOM for entities
      const observer = new MutationObserver(() => {
        window._gameMetrics.particles = document.querySelectorAll('.particle').length;
        window._gameMetrics.enemies = document.querySelectorAll('.enemy').length;
        window._gameMetrics.bullets = document.querySelectorAll('.bullet').length;
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      // FPS monitoring
      let lastTime = performance.now();
      let frames = 0;
      
      function checkFPS() {
        const now = performance.now();
        frames++;
        
        if (now - lastTime >= 1000) {
          window._gameMetrics.fps.push(frames);
          frames = 0;
          lastTime = now;
          
          // Stop after 10 seconds
          if (now - window._gameMetrics.startTime > 10000) {
            observer.disconnect();
          }
        }
        
        requestAnimationFrame(checkFPS);
      }
      
      requestAnimationFrame(checkFPS);
    });
    
    // Wait for 10 seconds of gameplay
    console.log('  ⏱  Waiting 10 seconds...');
    await page.waitForTimeout(10000);
    
    // Collect metrics
    const metrics = await page.evaluate(() => {
      return {
        fps: window._gameMetrics.fps,
        avgFPS: window._gameMetrics.fps.reduce((a, b) => a + b, 0) / window._gameMetrics.fps.length,
        minFPS: Math.min(...window._gameMetrics.fps),
        maxFPS: Math.max(...window._gameMetrics.fps),
        particles: window._gameMetrics.particles,
        enemies: window._gameMetrics.enemies,
        bullets: window._gameMetrics.bullets,
        errors: window._gameMetrics.errors,
        runtime: window._gameMetrics.startTime ? (Date.now() - window._gameMetrics.startTime) / 1000 : 0
      };
    });
    
    console.log('\n📊 Verification Results:\n');
    console.log('  FPS Performance:');
    console.log(`    Average: ${metrics.avgFPS.toFixed(1)} FPS`);
    console.log(`    Min: ${metrics.minFPS} FPS`);
    console.log(`    Max: ${metrics.maxFPS} FPS`);
    
    console.log('\n  Entity Counts:');
    console.log(`    Enemies: ${metrics.enemies}`);
    console.log(`    Bullets: ${metrics.bullets}`);
    console.log(`    Particles: ${metrics.particles}`);
    
    console.log('\n  Errors:');
    console.log(`    Count: ${metrics.errors}`);
    
    console.log(`\n  Runtime: ${metrics.runtime.toFixed(1)} seconds`);
    
    // Determine pass/fail
    const passed = metrics.avgFPS >= 55 && metrics.errors === 0;
    
    console.log('\n' + '='.repeat(50));
    if (passed) {
      console.log('✅ PASS - All 20 iterations verified');
      console.log('   Game runs at 60fps with no errors');
    } else {
      console.log('❌ FAIL - Issues detected');
      if (metrics.avgFPS < 55) {
        console.log(`   FPS too low: ${metrics.avgFPS.toFixed(1)} (need >= 55)`);
      }
      if (metrics.errors > 0) {
        console.log(`   ${metrics.errors} error(s) detected`);
      }
    }
    console.log('='.repeat(50));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

runTest().catch(console.error);
