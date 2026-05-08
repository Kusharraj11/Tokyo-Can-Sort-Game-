const LEVELS = [
  // --- Level 1 ---
  {
    tubes: [
      ['red',  'blue', 'red',  'blue'],
      ['blue', 'red',  'blue', 'red' ],
      []
    ]
  },
  // --- Level 2 ---
  {
    tubes: [
      ['green',  'yellow', 'green',  'yellow'],
      ['yellow', 'green',  'yellow', 'green' ],
      []
    ]
  },
  // --- Level 3 ---
  {
    tubes: [
      ['red',   'blue',  'green', 'red'  ],
      ['blue',  'green', 'red',   'blue' ],
      ['green', 'red',   'blue',  'green'],
      []
    ]
  },
  // --- Level 4 ---
  {
    tubes: [
      ['pink',   'purple', 'yellow', 'pink'  ],
      ['purple', 'yellow', 'pink',   'purple'],
      ['yellow', 'pink',   'purple', 'yellow'],
      [],
      []
    ]
  },
  // --- Level 5 ---
  {
    tubes: [
      ['red',    'blue',   'green',  'yellow'],
      ['blue',   'green',  'yellow', 'red'   ],
      ['green',  'yellow', 'red',    'blue'  ],
      ['yellow', 'red',    'blue',   'green' ],
      [],
      []
    ]
  },
  // --- Level 6: 4 colours, shifted cyclic ---
  {
    tubes: [
      ['red',    'purple', 'blue',   'yellow'],
      ['yellow', 'red',    'purple', 'blue'  ],
      ['blue',   'yellow', 'red',    'purple'],
      ['purple', 'blue',   'yellow', 'red'   ],
      [],
      []
    ]
  },
  // --- Level 7: 5 colours (+ pink), 1-step cyclic ---
  {
    tubes: [
      ['red',    'blue',   'green',  'yellow'],
      ['blue',   'green',  'yellow', 'pink'  ],
      ['green',  'yellow', 'pink',   'red'   ],
      ['yellow', 'pink',   'red',    'blue'  ],
      ['pink',   'red',    'blue',   'green' ],
      [],
      []
    ]
  },
  // --- Level 8: 5 colours (+ purple), 3-step offset ---
  {
    tubes: [
      ['red',    'blue',   'green',  'yellow'],
      ['green',  'yellow', 'purple', 'red'   ],
      ['purple', 'red',    'blue',   'green' ],
      ['blue',   'green',  'yellow', 'purple'],
      ['yellow', 'purple', 'red',    'blue'  ],
      [],
      []
    ]
  },
  // --- Level 9: 6 colours, 1-step cyclic ---
  {
    tubes: [
      ['red',    'blue',   'green',  'yellow'],
      ['blue',   'green',  'yellow', 'pink'  ],
      ['green',  'yellow', 'pink',   'purple'],
      ['yellow', 'pink',   'purple', 'red'   ],
      ['pink',   'purple', 'red',    'blue'  ],
      ['purple', 'red',    'blue',   'green' ],
      [],
      []
    ]
  },
  // --- Level 10: 6 colours, 3-step cyclic (hardest) ---
  {
    tubes: [
      ['red',    'purple', 'blue',   'yellow'],
      ['green',  'red',    'purple', 'blue'  ],
      ['pink',   'green',  'red',    'purple'],
      ['yellow', 'pink',   'green',  'red'   ],
      ['blue',   'yellow', 'pink',   'green' ],
      ['purple', 'blue',   'yellow', 'pink'  ],
      [],
      []
    ]
  },

  // ── MOVE-LIMITED LEVELS (11-20) ──────────────────────────────────────────

  // --- Level 11: 5 colours, cyclic variant A, 35 moves ---
  {
    maxMoves: 35,
    tubes: [
      ['green',  'pink',   'red',    'yellow'],
      ['pink',   'red',    'yellow', 'blue'  ],
      ['red',    'yellow', 'blue',   'green' ],
      ['yellow', 'blue',   'green',  'pink'  ],
      ['blue',   'green',  'pink',   'red'   ],
      [],
      []
    ]
  },
  // --- Level 12: 5 colours, Latin-square scramble, 30 moves ---
  {
    maxMoves: 30,
    tubes: [
      ['red',    'green',  'yellow', 'blue'  ],
      ['blue',   'pink',   'green',  'yellow'],
      ['yellow', 'blue',   'pink',   'red'   ],
      ['pink',   'red',    'blue',   'green' ],
      ['green',  'yellow', 'red',    'pink'  ],
      [],
      []
    ]
  },
  // --- Level 13: 5 colours, complex scramble, 26 moves ---
  {
    maxMoves: 26,
    tubes: [
      ['blue',   'red',    'pink',   'green' ],
      ['green',  'yellow', 'red',    'pink'  ],
      ['pink',   'blue',   'yellow', 'red'   ],
      ['red',    'pink',   'green',  'yellow'],
      ['yellow', 'green',  'blue',   'blue'  ],
      [],
      []
    ]
  },
  // --- Level 14: 5 colours, tightest limit, 22 moves ---
  {
    maxMoves: 22,
    tubes: [
      ['yellow', 'pink',   'blue',   'red'   ],
      ['red',    'blue',   'green',  'yellow'],
      ['green',  'red',    'pink',   'blue'  ],
      ['blue',   'green',  'yellow', 'pink'  ],
      ['pink',   'yellow', 'red',    'green' ],
      [],
      []
    ]
  },
  // --- Level 15: 6 colours, 1-step cyclic shift, 40 moves ---
  {
    maxMoves: 40,
    tubes: [
      ['purple', 'red',    'blue',   'green' ],
      ['red',    'blue',   'green',  'yellow'],
      ['blue',   'green',  'yellow', 'pink'  ],
      ['green',  'yellow', 'pink',   'purple'],
      ['yellow', 'pink',   'purple', 'red'   ],
      ['pink',   'purple', 'red',    'blue'  ],
      [],
      []
    ]
  },
  // --- Level 16: 6 colours, mixed sub-patterns, 35 moves ---
  {
    maxMoves: 35,
    tubes: [
      ['red',    'yellow', 'purple', 'green' ],
      ['green',  'red',    'yellow', 'purple'],
      ['purple', 'green',  'red',    'yellow'],
      ['yellow', 'purple', 'green',  'red'   ],
      ['blue',   'pink',   'blue',   'pink'  ],
      ['pink',   'blue',   'pink',   'blue'  ],
      [],
      []
    ]
  },
  // --- Level 17: 6 colours, non-cyclic scramble, 32 moves ---
  {
    maxMoves: 32,
    tubes: [
      ['blue',   'purple', 'green',  'yellow'],
      ['yellow', 'blue',   'purple', 'red'   ],
      ['red',    'yellow', 'blue',   'purple'],
      ['purple', 'red',    'yellow', 'blue'  ],
      ['green',  'pink',   'red',    'pink'  ],
      ['pink',   'green',  'pink',   'green' ],
      [],
      []
    ]
  },
  // --- Level 18: 6 colours, alternating sub-pattern, 28 moves ---
  {
    maxMoves: 28,
    tubes: [
      ['pink',   'red',    'yellow', 'blue'  ],
      ['blue',   'pink',   'red',    'yellow'],
      ['yellow', 'blue',   'pink',   'red'   ],
      ['red',    'yellow', 'blue',   'pink'  ],
      ['purple', 'green',  'purple', 'green' ],
      ['green',  'purple', 'green',  'purple'],
      [],
      []
    ]
  },
  // --- Level 19: 6 colours, deeply interleaved, 25 moves ---
  {
    maxMoves: 25,
    tubes: [
      ['green',  'blue',   'pink',   'red'   ],
      ['red',    'purple', 'blue',   'pink'  ],
      ['pink',   'yellow', 'purple', 'blue'  ],
      ['blue',   'green',  'yellow', 'purple'],
      ['purple', 'pink',   'green',  'yellow'],
      ['yellow', 'red',    'red',    'green' ],
      [],
      []
    ]
  },
  // --- Level 20: 6 colours, master level, 22 moves ---
  {
    maxMoves: 22,
    tubes: [
      ['purple', 'green',  'red',    'yellow'],
      ['yellow', 'pink',   'green',  'blue'  ],
      ['blue',   'yellow', 'pink',   'red'   ],
      ['red',    'blue',   'yellow', 'green' ],
      ['green',  'red',    'blue',   'purple'],
      ['pink',   'purple', 'pink',   'purple'],
      [],
      []
    ]
  }
];

export function getLevelData(levelNum) {
  const idx = (levelNum - 1) % LEVELS.length;
  return JSON.parse(JSON.stringify(LEVELS[idx]));
}

export const TOTAL_LEVELS = LEVELS.length;
export const TUBE_CAPACITY = 4;

export const CAN_COLORS = {
  red:    0xe74c3c,
  blue:   0x3498db,
  green:  0x2ecc71,
  pink:   0xff69b4,
  purple: 0x9b59b6,
  yellow: 0xf1c40f
};
