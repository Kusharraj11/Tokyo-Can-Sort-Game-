import Phaser from 'phaser';
import { TOTAL_LEVELS } from '../LevelData.js';

function buildSnakePath(nodePos, W, rowGap) {
  const COLS = 4;
  const path = new Phaser.Curves.Path(nodePos[0].x, nodePos[0].y);

  for (let i = 0; i < nodePos.length - 1; i++) {
    const from    = nodePos[i];
    const to      = nodePos[i + 1];
    const fromRow = Math.floor(i / COLS);
    const toRow   = Math.floor((i + 1) / COLS);

    if (fromRow === toRow) {
      path.lineTo(to.x, to.y);
    } else {
      const bow    = rowGap * 0.5;
      const bowOut = from.x > W * 0.5;
      const cpX    = bowOut ? from.x + bow : from.x - bow;
      path.cubicBezierTo(to.x, to.y, cpX, from.y, cpX, to.y);
    }
  }

  return path;
}

export default class LevelMapScene extends Phaser.Scene {
  constructor() { super('LevelMapScene'); }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // ── Progress (persists across reloads via localStorage) ───────────────
    const savedProgress = parseInt(
      localStorage.getItem('tokyoCanSort_progress') || '1'
    );

    // ── Background: cover screen, keep image aspect ratio (no stretch) ────
    const mapFrame = this.textures.getFrame('level-select-map');
    const natW     = mapFrame.realWidth;
    const natH     = mapFrame.realHeight;
    const bgScale  = Math.max(W / natW, H / natH);   // cover, not contain
    this.add.image(W / 2, H / 2, 'level-select-map')
      .setDisplaySize(natW * bgScale, natH * bgScale)
      .setDepth(0);
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.40).setDepth(1);

    // ── Title (fixed) ─────────────────────────────────────────────────────
    this.add.text(W / 2, H * 0.052, 'SELECT LEVEL', {
      fontFamily: '"Press Start 2P"',
      fontSize: '13px',
      color: '#00ffff',
      stroke: '#003333',
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(20);

    // ── Snake grid layout: 4 columns × 5 rows ─────────────────────────────
    //   Row 0 (bottom) L→R: L1  L2  L3  L4
    //   Row 1          R→L: L5  L6  L7  L8    (reversed so path turns at edge)
    //   Row 2          L→R: L9  L10 L11 L12
    //   Row 3          R→L: L13 L14 L15 L16
    //   Row 4 (top)    L→R: L17 L18 L19 L20
    const COLS = 4;
    const ROWS = 5; // 4 × 5 = 20

    // Column X centres (% of W)
    const colXs = [W * 0.20, W * 0.40, W * 0.60, W * 0.80];

    // Row Y centres — row 0 at bottom, row 4 at top
    const titleH    = H * 0.13;
    const botMargin = H * 0.04;
    const usableH   = H - titleH - botMargin;
    const rowGap = usableH / (ROWS - 1);
    const rowYs  = Array.from({ length: ROWS }, (_, r) =>
      H - botMargin - r * rowGap
    );

    // level index 0-based → world {x, y}
    const nodePos = Array.from({ length: TOTAL_LEVELS }, (_, i) => {
      const row       = Math.floor(i / COLS);
      const col       = i % COLS;
      const reversed  = (row % 2 === 1);           // odd rows go right-to-left
      const actualCol = reversed ? (COLS - 1 - col) : col;
      return { x: colXs[actualCol], y: rowYs[row] };
    });

    // ── Snake ribbon path ─────────────────────────────────────────────────────
    const gfx      = this.add.graphics().setDepth(3);
    const fullPath = buildSnakePath(nodePos, W, rowGap);
    gfx.lineStyle(24, 0x1a2a3a, 0.85);
    fullPath.draw(gfx, 64);

    if (savedProgress > 1) {
      const progressPath = buildSnakePath(nodePos.slice(0, savedProgress), W, rowGap);
      gfx.lineStyle(14, 0x00e5ff, 0.9);
      progressPath.draw(gfx, 64);
    }

    // ── Level nodes ───────────────────────────────────────────────────────
    const nodeSize = Math.min(Math.round(W * 0.135), 54); // responsive, max 54px

    for (let i = 0; i < TOTAL_LEVELS; i++) {
      const levelNum    = i + 1;
      const pos         = nodePos[i];
      const isUnlocked  = levelNum <= savedProgress;
      const isCompleted = levelNum < savedProgress;
      const isCurrent   = levelNum === savedProgress;

      const node = this.add.image(pos.x, pos.y, `level-node-${levelNum}`)
        .setDisplaySize(nodeSize, nodeSize)
        .setDepth(5);

      if (!isUnlocked) {
        continue; // no interaction on locked levels
      }

      node.setInteractive({ useHandCursor: true });

      node.on('pointerover', () =>
        this.tweens.add({ targets: node, scaleX: 1.22, scaleY: 1.22, duration: 90 })
      );
      node.on('pointerout', () =>
        this.tweens.add({ targets: node, scaleX: 1, scaleY: 1, duration: 90 })
      );
      node.on('pointerdown', () => {
        this.tweens.add({
          targets: node, scaleX: 0.88, scaleY: 0.88, duration: 65,
          onComplete: () => {
            this.cameras.main.fadeOut(280, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
              this.scene.start('GameScene', { level: levelNum });
            });
          }
        });
      });

      // Gentle float animation (staggered so all don't sync)
      this.tweens.add({
        targets : node,
        y       : pos.y - 4,
        duration: 1100 + i * 55,
        ease    : 'Sine.InOut',
        yoyo    : true,
        repeat  : -1,
        delay   : i * 65
      });

      // Current target level pulses to draw attention
      if (isCurrent) {
        this.tweens.add({
          targets : node,
          alpha   : 0.5,
          duration: 620,
          ease    : 'Sine.InOut',
          yoyo    : true,
          repeat  : -1
        });
      }
    }

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }
}
