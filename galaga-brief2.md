# Galaga Clone — Project Brief

**Location:** `/Users/davidpence/galaga-clone/index.html`
**GitHub:** https://github.com/wdavidpence/galaga-clone
**Deployed:** GitHub Pages (workflow-based)
**Format:** Single HTML file, ~25KB, 816 lines. All code inline.

## What's Been Built

Single-file HTML5 Galaga clone with:
- Player ship at bottom, enemy formation at top
- Touch controls: drag left to move, tap FIRE button (right side) to shoot
- Keyboard fallback: arrow keys + Space/J to fire
- 4 enemy types: Bee (yellow, 1HP), Butterfly (magenta, 1HP), Boss (red, 2HP), Boss2 (cyan, 3HP)
- Galaga-style dive attacks (curved toward player)
- Boss HP bars, combo multiplier, wave progression (1-25)
- Particle explosions, screen shake, screen flash on damage
- Parallax starfield (90 stars with depth-based alpha)
- Oscillator-based audio (shoot, explode, bigExplode, gameover, powerup, dive, wave)
- Dual fighter powerup (boss drops), score persistence via localStorage
- Wave transition screen with "Get ready..." text
- New high score indicator on game over

## Current Game Feel (as of last session)

- Fire rate: 35 frames (slow, tap-to-fire only, no auto-fire)
- Enemy fire: 0.15% per frame, max 1 shot per dive (Galaga-style, sparse)
- Player movement: smooth inertia/acceleration with 0.88 friction
- Dives: curved paths toward player, not straight drops
- Player hitbox: 16x14 rectangle
- Enemy hitbox: 14x12 rectangle (slightly generous)
- Invincibility: 150 frames on spawn, 180 on respawn after hit
- Combo: resets after 100 frames without kill, multiplier = 1 + floor(combo/3)
- Ship position: y = H - 85 (above bottom)
- 5 rows x 8 cols formation (rows scale with wave)

## Code Architecture

- `getEnemyVisX(e)` — returns `e.x + formationX` only in 'form' state, raw `e.x` during dive/retreat
- `mkForm()` — creates 5x8 enemy formation with types cycling bee/butterfly/bee/butterfly/boss
- `shootAimed(e, x)` — helper to fire aimed bullet at player position
- `hitPlayer()` — handles lives, invincibility reset, screen shake/flash, game over
- `spawnP(x, y, c, n)` — spawns particle burst
- States: MENU → PLAYING → WAVE_TRANS → PLAYING → GAMEOVER
- Audio context lazy-initialized on first user interaction
- DPR-capped canvas at 2x for performance

## Last User Feedback

1. "seems like the game was better a couple of sessions ago, I loved how the game was more like Galaga" — current version is closer to Galaga with rare enemy fire and curved dives
2. "user controls on iphone are still terrible" — FIRE button on right, drag on left. Test to verify.
3. "no more smooth scrolling of the ship" — inertia-based physics (accel=0.35, friction=0.88). Test to verify.
4. "it fires way to fast automatically by itself" — removed auto-fire, tap-to-fire only, rate=35 frames. Test to verify.
5. "enemies produce wat too much fire" — reduced to 0.15% per frame, max 1 shot per dive. Test to verify.
6. "most of these fired shots do not do collision detection" — hitboxes made reliable (16x14 player, 14x12 enemy), eVis helper fixes double-counting. Test to verify.

## What Needs to Be Verified Next

1. **iPhone Safari playtest** — biggest unknown:
   - Ship visible, bullets fire on tap
   - Audio unlocks on first touch
   - Touch movement feels responsive (not jerky)
   - FIRE button is easy to tap
   - No scroll/bounce interference
2. **Collision reliability** — do bullets actually hit?
3. **Enemy fire feel** — is it sparse enough? Galaga-style or still too much?
4. **Movement feel** — smooth or jerky? Good inertia or too floaty?
5. **Enemy dives** — curved and threatening but dodgeable?
6. **Performance** — 60fps on iPhone?
7. **Visual polish** — does it feel like Galaga?

## Known Issues

- Test results on iPhone not yet collected (user hasn't tested the latest version)
- No keyboard pause feature
- No virtual D-pad — relies on touch drag area (left half)

## Priority for Next Session

1. Get playtest feedback from iPhone
2. Iterate on whatever feels off: controls, collision, fire rate, enemy behavior, visuals
3. Polish and stabilize

## Notes

- User prefers the AI to do the work, not guide them
- All dev is 100% local (Ornith-1.0-35B-MLX-oQ8 on Mac Studio)
- No external API calls, no build system
- git repo initialized at `/Users/davidpence/galaga-clone/.git/`
- Branch: main
- Pre-commit signing attempted but gpg unavailable — unsigned commits
