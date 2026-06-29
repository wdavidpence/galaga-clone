# Galaga Clone - iPhone Polish Iteration Plan (15 Loops)

**Goal:** Transform from "barely functional" to "polished, fun, addictive iPhone HTML5 game"

**Target:** Playable on iPhone Safari, feels like real Galaga, massive visual/audio/juice upgrade

## Phase 1: Mobile Controls & Audio (Loops 1-5)

1. **D-Pad + Fire Button** — Replace drag controls with virtual D-pad (left) + large FIRE button (right). Make them semi-transparent, haptic feedback on tap.

2. **Audio Unlock on First Touch** — Ensure Web AudioContext starts on first pointerdown. Add "TAP TO START" overlay that forces audio init.

3. **Touch Target Sizing** — Make FIRE button 80px radius on iPhone (thumb-friendly). Add visual press feedback (scale + glow).

4. **Auto-Fire Toggle** — Add setting: "Hold to fire" vs "Tap to fire". Default to hold-to-fire for arcade feel.

5. **iOS Scroll Prevention** — Lock body scroll, prevent pull-to-refresh, ensure canvas captures all touches.

## Phase 2: Visual Polish & Juice (Loops 6-10)

6. **Enemy Sprite Polish** — Redraw bees/butterflies/bosses with more detail (wings, antennae, metallic highlights). Add "formation shimmer" effect.

7. **Player Ship Upgrade** — Add engine glow, thruster particles, shield bubble visual. Make dual-fighter look distinct (two ships side-by-side).

8. **Bullet Trails & Impact** — Add light trails to player bullets. Enemy bullet impact sparks on miss. Muzzle flash on fire.

9. **Explosion Variety** — 3 explosion types: small (bee), medium (butterfly), large (boss with debris). Add ring flash + smoke.

10. **Formation Animation** — Enemies bob/sway in formation with sine wave. Formation shifts left/right slowly. Champion bee has star glow.

## Phase 3: Gameplay Depth (Loops 11-15)

11. **Tractor Beam Polish** — Make beam more menacing (pulsing red, warning sound). Capture animation for player ship (slow pull up). Rescue sequence with timing challenge.

12. **Challenge Stage Polish** — Better patterns (figure-8, spiral). Bonus points popup with multiplier. "STAGE CLEAR" fanfare.

13. **Powerup Variety** — Add: Triple shot (temporary), Rapid fire (5s), Extra bomb. Visual: rotating icons with glow.

14. **Score Multiplier System** — Chain kills build multiplier (1x→2x→3x→5x). Display combo meter. Bonus for wave clear without dying.

15. **iPhone Performance + Settings** — Add FPS counter toggle. Quality settings (particles, stars). Pause on app switch. Save settings to localStorage.

## Success Criteria

- iPhone Safari: 55+ FPS, responsive touch, no scroll issues
- Audio plays on first touch without gesture errors
- Controls feel arcade-accurate (not floaty, not twitchy)
- Visuals look like 1981 Galaga but modern (not pixel art, but clean vectors)
- One play session feels addictive (5-10 min before game over)
- High score chase is compelling

## Verification Before Each Push

- Run `python3 verify-performance.js` (if exists) or manual check
- Check brace/paren balance
- Verify touch handlers exist and fire correctly
- Ensure no `console.log` left in production path
- Test on localhost:8888 before push

## Notes

- User wants massive upgrade, not incremental
- Focus on iPhone first, desktop second
- All changes in single index.html
- Commit after each 3-iteration batch
- Notify via Telegram when ready for testing