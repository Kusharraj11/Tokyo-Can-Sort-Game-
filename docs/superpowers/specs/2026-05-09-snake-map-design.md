# Snake Map Design — LevelMapScene

**Date:** 2026-05-09  
**File:** `src/js/scenes/LevelMapScene.js`

## Goal

Replace current thin straight-line connectors with a thick ribbon snake path — a zig-zag snake diagram where rows alternate direction (L→R / R→L) and U-turns bow outward at edges.

## Layout

- **Grid:** 4 columns × 5 rows = 20 nodes
- **Snake order:** row 0 L→R, row 1 R→L, row 2 L→R, etc. (unchanged)
- **Column X positions:** [20%, 40%, 60%, 80%] of screen width (shifted inward from [14%, 38%, 62%, 86%])
  - Reason: leaves ~20% margin on each side for U-turn arcs to bow outward without clipping
- **Row Y positions:** unchanged — evenly distributed between title height and bottom margin

## Path Drawing

Two `Phaser.Curves.Path` objects, both built from the same `nodePos` array:

### Full dim path (depth 3)
- Entire route from node[0] to node[19]
- `lineStyle(24, 0x1a2a3a, 0.85)`
- Drawn first as the track/road base

### Bright progress path (depth 4)
- Route from node[0] to node[savedProgress - 1]
- `lineStyle(14, 0x00e5ff, 0.9)`
- Drawn on top of dim path

### Path segment logic (same for both)
For each consecutive pair of nodes in snake order:

- **Within a row** (same row index): `path.lineTo(next.x, next.y)`
- **Between rows** (U-turn at edge): `path.cubicBezierTo()` with control points bowing outward:
  - `bow = rowGap * 0.5` (where `rowGap = usableH / (ROWS - 1)`)
  - Right edge turn: `cp1 = (from.x + bow, from.y)`, `cp2 = (to.x + bow, to.y)`
  - Left edge turn: `cp1 = (from.x - bow, from.y)`, `cp2 = (to.x - bow, to.y)`

U-turn occurs between node[COLS-1] and node[COLS] of each row (indices 3→4, 7→8, 11→12, 15→16).

To detect U-turn: when `Math.floor(i / COLS) !== Math.floor((i+1) / COLS)` (row boundary crossing).

To detect which side bows: if `from.x > W * 0.5` → right bow; else → left bow.

## Nodes (unchanged)

- Image per level: `level-node-{n}`, sized to `min(W * 0.135, 54)px`
- Locked (levelNum > savedProgress): dark tint `0x111111`, alpha 0.35, no interaction
- Completed (levelNum < savedProgress): green tint `0x99ffbb`
- Current (levelNum === savedProgress): alpha pulse tween
- All unlocked: hover scale tween (1.22×), click shrink (0.88×) → fade to GameScene
- Float animation: staggered y-4 sine tween, repeat infinite
- Depth: 5 (above both path layers)

## Removed

- Current `for` loop drawing thin lines and midpoint dots — replaced entirely by ribbon paths

## No changes needed

- Background image, overlay rectangle, title text
- Camera fade in/out
- localStorage progress read
- GameScene transition
