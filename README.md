# 🥫 Tokyo Can Sort

A cozy little color-sorting puzzle game built in JavaScript with [Phaser 3](https://phaser.io/). Pour cans between tubes, line up the colors, clear the level. Easy to learn, surprisingly tricky once the move-limit kicks in.

![Tokyo Can Sort screenshot](Screenshot%202026-05-09%20031000.png)

---

## ✨ What is it?

You've got a bunch of tubes. Each tube is full of cans of different colors, all jumbled up. Your job is simple:

> **Sort every tube so each one holds cans of a single color.**

Tap a tube to pick up the top can(s), then tap another tube to drop them. You can only stack a can on top of a matching color (or onto an empty tube). Sounds easy — until the puzzles start getting mean.

---

## 🎮 How to play

1. **Tap a tube** with cans — the top can lifts up, ready to move.
2. **Tap a target tube** — if the top color matches (or the tube is empty), the can pours over.
3. **Tap the same tube again** to cancel your selection.
4. **Win** when every tube is either empty or filled with a single color.

### Two flavors of levels

| Levels | Mode | Vibe |
|--------|------|------|
| **1 – 10** | Unlimited moves | Chill warm-up. Learn the ropes, experiment freely. |
| **11 – 20** | Move-limited | Now it counts. Every move — right or wrong — eats your budget. Run out, game over. |

> ⚠️ On move-limited levels, **wrong moves still cost a move.** Think before you tap.

The move counter turns red when you're down to your last 5 moves. Tense.

---

## 🧠 Difficulty curve

- **Lv 1–4** — 2 to 3 colors, gentle introduction.
- **Lv 5–10** — 4 to 6 colors, cyclic scrambles, more tubes.
- **Lv 11–14** — 5 colors with shrinking move budgets (35 → 22).
- **Lv 15–20** — 6 colors, deeply interleaved patterns, master-level tightness (down to 22 moves).

Level 20 is the boss. You've been warned.

---

## 🚀 Run it locally

### Prereqs
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- npm (ships with Node)

### Setup

```bash
# clone
git clone https://github.com/Kusharraj11/Tokyo-Can-Sort-Game-.git
cd Tokyo-Can-Sort-Game-

# install
npm install

# run dev server (hot reload, opens in browser)
npm start

# or build a production bundle
npm run build
```

`npm start` spins up `webpack-dev-server` — the game opens at `http://localhost:8080` (or whichever port webpack picks).

`npm run build` outputs a static bundle to `dist/` you can drop on any web host.

---

## 🗂️ Project layout

```
can_sort_game/
├── src/
│   ├── index.html              # entry HTML
│   ├── js/
│   │   ├── Main.js             # Phaser game config + scene registration
│   │   ├── LevelData.js        # all 20 levels (tube layouts + move limits)
│   │   └── scenes/
│   │       ├── BootScene.js          # asset preload
│   │       ├── TitleScene.js         # main menu
│   │       ├── LevelMapScene.js      # level select / snake map
│   │       ├── GameScene.js          # core gameplay
│   │       ├── LevelClearScene.js    # win screen
│   │       └── QuitScene.js          # quit confirm
│   └── assets/
│       └── images/             # cans, tubes, backgrounds, UI buttons
├── package.json
└── webpack.config.js
```

The bulk of the gameplay logic lives in `src/js/scenes/GameScene.js` — tube selection, move validation, animations, win/lose flow.

---

## 🛠️ Tech

- **[Phaser 3](https://phaser.io/)** — 2D game framework
- **Webpack 5** — bundler + dev server
- **Vanilla JS** (ES modules) — no React, no TS, just the basics
- Pixel-style font: **Press Start 2P**

---

## 🎨 Add your own level

Open `src/js/LevelData.js` and append a new entry:

```js
// --- Level 21: your masterpiece ---
{
  maxMoves: 30,                 // omit for unlimited
  tubes: [
    ['red',  'blue', 'red',  'blue'],
    ['blue', 'red',  'blue', 'red' ],
    []                          // empty tube = workspace
  ]
}
```

Each tube holds up to **4 cans**, bottom-first. Available colors out of the box: `red`, `blue`, `green`, `yellow`, `pink`, `purple`. Add more by dropping a `can-<color>.png` in `src/assets/images/cans/` and registering it in `BootScene.js`.

---

## 🐛 Known quirks

- Project folder cannot live in a path with **trailing whitespace** — Git on Windows will refuse to init. (That's why this repo lives at a clean path.)
- The dev server uses Phaser's `Scale.RESIZE` mode, so the game adapts to window size live. Resize away.

---

## 📜 License

No license file yet — treat as **all rights reserved** until one is added. If you want to fork or remix, open an issue and we'll talk.

---

## 🙌 Credits

Built by [Kusharraj11](https://github.com/Kusharraj11). Sprite art and level design original. Phaser does the heavy lifting.

If you enjoyed it — star the repo, it helps. ⭐
