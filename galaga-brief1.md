# Galaga Clone — Progress Brief

**Location:** `/Users/davidpence/galaga-clone/index.html`
**Live URL:** https://wdavidpence.github.io/galaga-clone/
**GitHub:** https://github.com/wdavidpence/galaga-clone
**Deployed:** GitHub Pages (workflow-based)

## What's Been Built

Single-file HTML5 Galaga clone with:
- Player ship at bottom, enemy formation at top
- Touch controls (drag to move, tap to fire)
- Keyboard fallback (arrow keys + space)
- 4 enemy types: Bee, Butterfly, Boss, Boss2
- Enemy bullets that track toward player
- Combo multiplier system (up to 4x)
- Particle explosions, screen shake, hit-stop
- Power-up drops (Dual Fighter, Shield)
- Oscillator-based audio (Web Audio API)
- Wave progression with scaling difficulty
- Score/high score persistence via localStorage
- Parallax starfield background

## Game Mechanics

- **Fire:** Tap screen (bottom area) to fire. Auto-fires when idle. Dual Fighter = triple spread.
- **Move:** Drag anywhere on screen or use arrow keys.
- **Lives:** Start with 3. Shield power-up = 3 seconds invincibility.
- **Combo:** Kill streaks multiply score by (1 + floor(combo/3)). Resets after 2s.
- **Bosses:** Take 2-3 hits. Drop power-ups on death. Boss Galaga uses tractor beam.
- **Split mechanic (wave 4+):** Bees split into 3 children every 20 seconds.
- **Enemies:** Move in formation with sine wave motion. Random dive attacks. Shoot toward player.

## Known Limitations (Ad-hoc verification only)

- Verified via HTTP fetch + structural checks on desktop browser (Playwright).
- **NOT tested on iPhone Safari.** Real iOS Safari behavior unknown.
- Audio may need user gesture to unlock on iOS (handled via pointerdown listeners).
- Canvas size uses `devicePixelRatio` capped at 2x.
- No keyboard "pause" via touch yet — only menu interaction.
- No virtual on-screen buttons — relies on drag-based movement.

## What to Investigate/Improve Next

1. **iPhone Safari testing** — biggest unknown. Need to verify:
   - Ship visible, bullets fire on tap
   - Audio unlocks on first touch
   - Touch movement feels responsive
   - No scroll/bounce interference
2. **On-screen controls** — left/right arrows + fire button overlay would be more reliable than drag
3. **Enemy bullet accuracy** — tracking bullets might be too easy to dodge. Consider adjusting tracking strength.
4. **Wave clear detection** — needs more polish (current: when all enemies dead, start next wave)
5. **Game over screen** — missing "new high score" celebration animation
6. **Visual polish** — more particle effects, better enemy entrance animations, formation swooping patterns
7. **Sound design** — currently 7 sounds. Could add: extra life chime, boss warning, stage clear fanfare
8. **Difficulty curve** — enemy fire rate and density might need balancing per wave

## Files

- `/Users/davidpence/galaga-clone/index.html` — the entire game (single file, ~18KB)
- `/Users/davidpence/galaga-clone/.github/workflows/pages.yml` — GitHub Pages deploy workflow
- `/Users/davidpence/galaga-clone/.git/` — git repo with full history

## Notes for Next Session

- The game is a single HTML file. No build step needed.
- All assets (art, sounds) are procedural — no external files needed.
- Audio uses Web Audio API oscillators (no MP3/WAV files).
- Enemy sprites are drawn with Canvas paths (no images).
- High score stored in localStorage.
- The skill `html5-game-development` has iOS Safari audio patterns that may help with mobile issues.
- User prefers the AI to do the work, not guide them through it.
