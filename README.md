# 🥫 Tokyo Can Sort

A cozy little color-sorting puzzle game built in JavaScript with [Phaser 3](https://phaser.io/). Pour cans between tubes, line up the colors, clear the level. Easy to learn — surprisingly tricky once the move-limit kicks in.

---

## ▶️ Play it now (free, no install)

# 👉 **[Click here to play in your browser](https://kusharraj11.github.io/Tokyo-Can-Sort-Game-/)** 👈

> **Live at:** `https://kusharraj11.github.io/Tokyo-Can-Sort-Game-/`

- 🆓 100% free — no ads, no signup, no download
- 📱 Works on **phone, tablet, laptop, desktop** — anywhere with a browser
- 👆 Tap (mobile) or click (desktop) — same controls
- 🌐 Hosted on GitHub Pages — loads in seconds, runs entirely in your browser
- 🤝 Share the link with friends — they're playing in 5 seconds

> 💡 **Tip:** On mobile, tap the browser's "Add to Home Screen" — looks like a real app!

![Tokyo Can Sort screenshot](Screenshot%202026-05-09%20031000.png)

---

## ✨ What is this game?

You've got a row of glass tubes. Each tube is stuffed with colored cans, all jumbled up — red, blue, green, yellow, pink, purple. Your mission, should you choose to accept it:

> **Sort every tube so each one holds cans of a single color.** That's it. That's the whole game.

It starts gentle. By level 11 it starts biting back. By level 20 you'll be staring at the screen at 2 AM whispering "*one more try*."

It's the kind of puzzle game you load up "for five minutes" and look up an hour later.

---

## 🎮 How to play (60-second guide)

1. **🫳 Tap a tube** with cans in it — the top can(s) lift up, like they're ready to be poured.
2. **🫴 Tap another tube** — the lifted cans pour into it. The pour only works if:
   - The destination is **empty**, OR
   - The top can in the destination matches the color you're pouring.
3. **❌ Tap the same tube again** to cancel and put the cans back.
4. **🏆 Win** when every tube is either completely empty or completely one color.

That's the whole control scheme. **One finger, one tap.** No swipes, no menus, no buttons to memorize.

### A few neat details

- **Same-color stacks move together.** If you have 3 reds stacked on top, one tap pours all 3.
- **Tubes hold 4 cans max.** You can't overfill — the game blocks invalid moves with a satisfying shake.
- **The board is responsive.** Resize your window or rotate your phone — it adjusts live.

---

## 🧩 Two ways to play

| Levels | Mode | Vibe |
|--------|------|------|
| **1 – 10** | 🌿 Unlimited moves | Chill mode. Learn the patterns, experiment, no pressure. |
| **11 – 20** | ⏳ Move-limited | Brain mode. Every tap counts — even the wrong ones. Run out, game over. |

> ⚠️ **Heads up:** On move-limited levels, **wrong moves still cost you a move.** This isn't a bug — it's the whole point. The game wants you to *think*, not flail.

The move counter glows red when you're down to your last 5. That's the moment your palms start sweating.

---

## 📈 Difficulty curve

| Levels | Colors | Tubes | Twist |
|--------|--------|-------|-------|
| **1 – 4** | 2–3 | 3–5 | Gentle ramp. Learn the basics. |
| **5 – 10** | 4–6 | 5–8 | Cyclic scrambles, deeper stacks. |
| **11 – 14** | 5 | many | Move budgets shrink: 35 → 30 → 26 → 22. |
| **15 – 19** | 6 | many | Mixed sub-patterns, alternating scrambles. |
| **20** | 6 | many | 22 moves. The final boss. |

Level 20 is the boss. **You've been warned.** 😈

---

## 🌟 Why you'll like it

- 🎯 **Pure brain food** — no timers between levels, no pay-to-win, no energy meters
- 🎨 **Clean pixel-style visuals** — easy on the eyes, no flashy ads or pop-ups
- 🧘 **Plays at your pace** — 1 minute or 1 hour, both work
- 📲 **Truly portable** — same URL, same save, any device
- 💾 **Tiny download** — under 5 MB total, loads instantly even on weak Wi-Fi
- 🔓 **Source code is open** — peek under the hood, fork it, remix it

---

## 🚀 Run it locally (for devs)

Want to mess with the code, add levels, or just run it offline?

### Prereqs
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- npm (ships with Node)

### Setup

```bash
# clone
git clone https://github.com/Kusharraj11/Tokyo-Can-Sort-Game-.git
cd Tokyo-Can-Sort-Game-

# install dependencies
npm install

# run dev server (hot reload, opens in browser)
npm start

# or build a production bundle
npm run build
```

- `npm start` — spins up `webpack-dev-server`, game opens at `http://localhost:8080`
- `npm run build` — outputs a static bundle to `dist/` you can drop on any web host

---

## 🗂️ Project layout

```
can_sort_game/
├── .github/workflows/deploy.yml   # auto-deploys to GitHub Pages on push
├── src/
│   ├── index.html                 # entry HTML
│   ├── js/
│   │   ├── Main.js                # Phaser game config + scene registration
│   │   ├── LevelData.js           # all 20 levels (tube layouts + move limits)
│   │   └── scenes/
│   │       ├── BootScene.js          # asset preload
│   │       ├── TitleScene.js         # main menu
│   │       ├── LevelMapScene.js      # level select / snake map
│   │       ├── GameScene.js          # core gameplay
│   │       ├── LevelClearScene.js    # win screen
│   │       └── QuitScene.js          # quit confirm
│   └── assets/
│       └── images/                # cans, tubes, backgrounds, UI buttons
├── package.json
└── webpack.config.js
```

The bulk of the gameplay logic lives in `src/js/scenes/GameScene.js` — tube selection, move validation, animations, win/lose flow.

---

## 🛠️ Built with

- **[Phaser 3](https://phaser.io/)** — 2D game framework
- **Webpack 5** — bundler + dev server
- **Vanilla JavaScript** (ES modules) — no React, no TypeScript, just the basics
- **Press Start 2P** — pixel font for that arcade feel
- **GitHub Pages + Actions** — free hosting + auto-deploy

---

## 🎨 Add your own level

Open `src/js/LevelData.js` and append a new entry:

```js
// --- Level 21: your masterpiece ---
{
  maxMoves: 30,                 // omit for unlimited moves
  tubes: [
    ['red',  'blue', 'red',  'blue'],
    ['blue', 'red',  'blue', 'red' ],
    []                          // empty tube = workspace
  ]
}
```

Each tube holds up to **4 cans**, bottom-first. Built-in colors: `red`, `blue`, `green`, `yellow`, `pink`, `purple`. Add more by dropping a `can-<color>.png` into `src/assets/images/cans/` and registering it in `BootScene.js`.

Push the change → site auto-rebuilds → live in 2 minutes. Magic.

---

## 🐛 Known quirks

- Project folder **cannot live in a Windows path with trailing whitespace** — Git refuses to init. (Fun bug.)
- Phaser's `Scale.RESIZE` mode means the game reshuffles on window resize. Feature, not bug.

---

## 💡 Roadmap / ideas

- [ ] Sound effects + chill background music
- [ ] More levels (community contributions welcome!)
- [ ] Daily challenge mode
- [ ] Undo button (1 per level?)
- [ ] Hint system
- [ ] Dark / light theme toggle

Got an idea? [Open an issue](https://github.com/Kusharraj11/Tokyo-Can-Sort-Game-/issues) — happy to chat.

---

## 🤝 Contributing

PRs welcome — especially new levels and bug fixes. The code is small enough to read end-to-end in an afternoon. If you're learning Phaser, this is a friendly place to start.

---

## 📜 License

No license file yet — treat as **all rights reserved** until one is added. If you want to fork, remix, or use commercially, open an issue and we'll figure it out.

---

## 🙌 Credits

Built with way too much coffee by [**Kusharraj11**](https://github.com/Kusharraj11). Level design and sprite art are original. Phaser does the heavy lifting on rendering and input.

If you enjoyed the game:
- ⭐ **Star the repo** — it genuinely helps
- 🐦 **Share the link** — `https://kusharraj11.github.io/Tokyo-Can-Sort-Game-/`
- 🐛 **Report bugs** — open an issue, no detail too small
- 💬 **Tell me what you'd add** — I read everything

Thanks for playing. Now go beat level 20. 🥫✨
