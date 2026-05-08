import Phaser from 'phaser';
import { getLevelData, TUBE_CAPACITY, CAN_COLORS } from '../LevelData.js';

export default class GameScene extends Phaser.Scene {
  constructor() { super('GameScene'); }

  init(data) {
    this.currentLevel = data.level || 1;
    this.selectedTube = null;
    this.tubes = [];         // data: arrays of color strings
    this.tubeImages = [];    // display: tube image objects
    this.canSprites = [];    // display: 2D array of can sprites
    this.tubePositions = []; // {x, y} world positions
    this.isAnimating = false;
    this.movesLeft = null;   // null = unlimited
    this.movesText = null;
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;
    this.W = W; this.H = H;

    // --- Containers ---
    this.bgContainer   = this.add.container(0, 0).setDepth(0);
    this.tubeContainer = this.add.container(0, 0).setDepth(5);
    this.canContainer  = this.add.container(0, 0).setDepth(6);
    this.uiContainer   = this.add.container(0, 0).setDepth(10);

    // Background
    const bg = this.add.image(W/2, H/2, 'game-bg').setDisplaySize(W, H);
    const overlay = this.add.rectangle(W/2, H/2, W, H, 0x000000, 0.38);
    this.bgContainer.add([bg, overlay]);

    // Level label
    const lvlLabel = this.add.text(W/2, 28, `LEVEL ${this.currentLevel}`, {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#00ffff',
      stroke: '#003333',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(20);
    this.uiContainer.add(lvlLabel);

    // Back button
    const backBtn = this.add.image(75, 36, 'btn-back')
      .setDisplaySize(126, 42)
      .setInteractive({ useHandCursor: true });
    const backBtnBaseScaleX = backBtn.scaleX;
    const backBtnBaseScaleY = backBtn.scaleY;
    backBtn.on('pointerover', () => this.tweens.add({ targets: backBtn, scaleX: backBtnBaseScaleX * 1.1, scaleY: backBtnBaseScaleY * 1.1, duration: 100 }));
    backBtn.on('pointerout',  () => this.tweens.add({ targets: backBtn, scaleX: backBtnBaseScaleX, scaleY: backBtnBaseScaleY, duration: 100 }));
    backBtn.on('pointerdown', () => {
      if (this.isAnimating) return;
      this.scene.launch('QuitScene', { level: this.currentLevel });
      this.scene.pause('GameScene');
    });
    this.uiContainer.add(backBtn);

    // Moves counter (only for levels with maxMoves)
    const levelData = getLevelData(this.currentLevel);
    if (levelData.maxMoves) {
      this.movesLeft = levelData.maxMoves;
      this.movesText = this.add.text(W - 12, 28, `MOVES: ${this.movesLeft}`, {
        fontFamily: '"Press Start 2P"',
        fontSize: '9px',
        color: '#ffd700',
        stroke: '#332200',
        strokeThickness: 3
      }).setOrigin(1, 0.5).setDepth(20);
      this.uiContainer.add(this.movesText);
    }

    // Build the level
    this.buildLevel();

    // Rebuild on window resize for full adaptive desktop support
    this.scale.on('resize', (gameSize) => {
      this.W = gameSize.width;
      this.H = gameSize.height;
      lvlLabel.setPosition(gameSize.width / 2, 28);
      backBtn.setPosition(75, 36);
      if (this.movesText) this.movesText.setPosition(gameSize.width - 12, 28);
      this.buildLevel();
    });

    this.cameras.main.fadeIn(400, 0, 0, 0);
  }

  buildLevel() {
    const W = this.W, H = this.H;
    const levelData = getLevelData(this.currentLevel);
    this.tubes = levelData.tubes;

    const numTubes = this.tubes.length;

    // --- Vending machine bounds (tubes must fit inside the machine window) ---
    // Reserve space: top UI bar ~60px, bottom padding, sides for machine frame
    const machineLeft   = W * 0.06;
    const machineRight  = W * 0.94;
    const machineTop    = H * 0.18;
    const machineBottom = H * 0.88;
    const machineW      = machineRight - machineLeft;
    const machineH      = machineBottom - machineTop;

    // Max tube height = 72% of machine height (leave room for can lift animation)
    const maxTubeH   = machineH * 0.72;
    const canH_raw   = maxTubeH / TUBE_CAPACITY;

    // Max tube width constrained by how many fit side-by-side with gaps
    const maxTubeW   = Math.min(
      canH_raw * 0.72,                           // keep aspect ratio
      (machineW * 0.90) / numTubes * 0.82        // fit all tubes in machine width
    );

    const tubeW      = maxTubeW;
    const canH       = tubeW * 1.45;
    const tubeBodyH  = canH * TUBE_CAPACITY;
    const tubeTotalH = tubeBodyH + tubeW * 0.65;

    // Gap so total span never exceeds machine interior width
    const totalSpanMax = machineW * 0.90;
    const rawGap       = tubeW * 0.45;
    const totalRaw     = numTubes * tubeW + (numTubes - 1) * rawGap;
    const gap          = totalRaw > totalSpanMax
      ? (totalSpanMax - numTubes * tubeW) / Math.max(numTubes - 1, 1)
      : rawGap;

    const totalWidth = numTubes * tubeW + (numTubes - 1) * gap;
    const startX     = machineLeft + (machineW - totalWidth) / 2 + tubeW / 2;

    // Vertically center tubes in the machine window
    const tubeY = machineTop + (machineH - tubeTotalH) / 2 + tubeTotalH / 2;

    this.tubeW      = tubeW;
    this.canH       = canH;
    this.tubeBodyH  = tubeBodyH;
    this.tubeTotalH = tubeTotalH;

    this.tubePositions = [];
    this.tubeImages    = [];
    this.canSprites    = [];

    // Clear containers
    this.tubeContainer.removeAll(true);
    this.canContainer.removeAll(true);

    for (let i = 0; i < numTubes; i++) {
      const tx = startX + i * (tubeW + gap);
      const ty = tubeY;
      this.tubePositions.push({ x: tx, y: ty });

      // Tube image
      const tubeImg = this.add.image(tx, ty, 'tube')
        .setDisplaySize(tubeW, tubeTotalH)
        .setInteractive({ useHandCursor: true });

      tubeImg.on('pointerdown', () => this.handleTubeClick(i));
      tubeImg.on('pointerover', () => {
        if (!this.isAnimating && this.selectedTube !== i) {
          tubeImg.setTint(0xaaffff);
        }
      });
      tubeImg.on('pointerout', () => {
        if (this.selectedTube !== i) tubeImg.clearTint();
      });

      this.tubeContainer.add(tubeImg);
      this.tubeImages.push(tubeImg);

      // Cans for this tube
      const canRow = [];
      for (let c = 0; c < this.tubes[i].length; c++) {
        const color = this.tubes[i][c];
        const canSprite = this.createCanSprite(color, tx, this.getCanY(ty, c));
        this.canContainer.add(canSprite);
        canRow.push(canSprite);
      }
      this.canSprites.push(canRow);
    }
  }

  createCanSprite(color, x, y) {
    const key = `can-${color}`;
    // Use colored rectangle if image missing
    let sprite;
    if (this.textures.exists(key)) {
      sprite = this.add.image(x, y, key).setDisplaySize(this.tubeW * 0.82, this.canH * 0.88);
    } else {
      sprite = this.add.rectangle(x, y, this.tubeW * 0.82, this.canH * 0.88, CAN_COLORS[color] || 0xffffff);
    }
    sprite.colorKey = color;
    return sprite;
  }

  getCanY(tubeY, canIndex) {
    const tubeBottom = tubeY + this.tubeBodyH / 2 - this.canH * 0.08;
    return tubeBottom - (canIndex * this.canH) - this.canH / 2;
  }

  handleTubeClick(index) {
    if (this.isAnimating) return;

    // Deselect if same tube clicked
    if (this.selectedTube === index) {
      this.deselectTube(index);
      this.selectedTube = null;
      return;
    }

    // No tube selected yet — select this one
    if (this.selectedTube === null) {
      if (this.tubes[index].length === 0) return; // can't select empty
      this.selectedTube = index;
      this.selectTube(index);
      return;
    }

    // Try to move from selectedTube → index
    const from = this.selectedTube;
    const to = index;

    if (this.isValidMove(from, to)) {
      this.deselectTube(from);
      this.selectedTube = null;
      this.moveStack(from, to);
    } else {
      this.shakeTube(to);
      this.deselectTube(from);
      this.selectedTube = null;

      // Invalid move still costs a move on move-limited levels
      if (this.movesLeft !== null) {
        this.movesLeft = Math.max(0, this.movesLeft - 1);
        this.movesText.setText(`MOVES: ${this.movesLeft}`);
        if (this.movesLeft <= 5) this.movesText.setColor('#ff4444');
        if (this.movesLeft <= 0) {
          this.time.delayedCall(400, () => this.handleOutOfMoves());
        }
      }
    }
  }

  selectTube(index) {
    const tube = this.tubeImages[index];
    const pos  = this.tubePositions[index];
    tube.setTint(0x00ffff);
    this.tweens.add({ targets: tube, y: pos.y - 22, duration: 120, ease: 'Power2' });
    // Move cans with tube
    this.canSprites[index].forEach(can => {
      this.tweens.add({ targets: can, y: can.y - 22, duration: 120, ease: 'Power2' });
    });
  }

  deselectTube(index) {
    const tube = this.tubeImages[index];
    const pos  = this.tubePositions[index];
    tube.clearTint();
    this.tweens.add({ targets: tube, y: pos.y, duration: 120, ease: 'Bounce.Out' });
    this.canSprites[index].forEach((can, ci) => {
      const targetY = this.getCanY(pos.y, ci);
      this.tweens.add({ targets: can, y: targetY, duration: 120, ease: 'Bounce.Out' });
    });
  }

  getMovableStack(tubeIndex) {
    const tube = this.tubes[tubeIndex];
    if (tube.length === 0) return 0;
    const topColor = tube[tube.length - 1];
    let count = 0;
    for (let i = tube.length - 1; i >= 0; i--) {
      if (tube[i] === topColor) count++;
      else break;
    }
    return count;
  }

  isValidMove(from, to) {
    if (from === to) return false;
    const srcTube  = this.tubes[from];
    const destTube = this.tubes[to];
    if (srcTube.length === 0) return false;
    if (destTube.length >= TUBE_CAPACITY) return false;

    const stackSize = this.getMovableStack(from);
    const space = TUBE_CAPACITY - destTube.length;
    if (stackSize > space) return false;

    if (destTube.length === 0) return true;
    return destTube[destTube.length - 1] === srcTube[srcTube.length - 1];
  }

  moveStack(from, to) {
    this.isAnimating = true;
    const stackSize = this.getMovableStack(from);
    const movingCans = [];

    // Get cans to move (top N from source)
    for (let i = 0; i < stackSize; i++) {
      const canIdx = this.tubes[from].length - 1 - i;
      movingCans.unshift(this.canSprites[from][canIdx]);
    }

    // Update data
    const movedColors = this.tubes[from].splice(this.tubes[from].length - stackSize, stackSize);
    this.tubes[to].push(...movedColors);

    // Update sprite arrays
    this.canSprites[from].splice(this.canSprites[from].length - stackSize, stackSize);
    this.canSprites[to].push(...movingCans);

    // Animate each can in the stack
    const destPos = this.tubePositions[to];
    const liftY   = Math.min(this.tubePositions[from].y, destPos.y) - this.tubeTotalH * 0.6;

    let completed = 0;
    movingCans.forEach((can, i) => {
      const finalY = this.getCanY(destPos.y, this.tubes[to].length - stackSize + i);
      this.tweens.chain({
        targets: can,
        tweens: [
          { y: liftY - i * this.canH * 0.5, duration: 180, ease: 'Power2Out' },
          { x: destPos.x, duration: 180, ease: 'Linear' },
          { y: finalY, duration: 200, ease: 'Bounce.Out',
            onComplete: () => {
              completed++;
              if (completed === movingCans.length) {
                this.isAnimating = false;
                // Decrement move counter
                if (this.movesLeft !== null) {
                  this.movesLeft = Math.max(0, this.movesLeft - 1);
                  this.movesText.setText(`MOVES: ${this.movesLeft}`);
                  if (this.movesLeft <= 5) this.movesText.setColor('#ff4444');
                }
                const won = this.checkWin();
                if (!won && this.movesLeft !== null && this.movesLeft <= 0) {
                  this.time.delayedCall(400, () => this.handleOutOfMoves());
                }
              }
            }
          }
        ]
      });
    });
  }

  shakeTube(index) {
    const tube = this.tubeImages[index];
    const pos  = this.tubePositions[index];
    this.tweens.add({
      targets: tube,
      x: pos.x + 9,
      duration: 55,
      ease: 'Linear',
      yoyo: true,
      repeat: 3,
      onComplete: () => tube.x = pos.x
    });
  }

  checkWin() {
    const allDone = this.tubes.every(tube => {
      if (tube.length === 0) return true;
      if (tube.length !== TUBE_CAPACITY) return false;
      return new Set(tube).size === 1;
    });
    if (allDone) this.handleWin();
    return allDone;
  }

  handleOutOfMoves() {
    const W = this.W, H = this.H;

    const overlay = this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.72)
      .setDepth(60);

    this.add.text(W / 2, H / 2 - 52, 'OUT OF MOVES!', {
      fontFamily: '"Press Start 2P"',
      fontSize: '13px',
      color: '#ff4444',
      stroke: '#330000',
      strokeThickness: 5
    }).setOrigin(0.5).setDepth(61);

    this.add.text(W / 2, H / 2 - 18, `LEVEL ${this.currentLevel}`, {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#888888'
    }).setOrigin(0.5).setDepth(61);

    const retryBtn = this.add.text(W / 2, H / 2 + 22, '[ RETRY ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '11px',
      color: '#00ffff',
      stroke: '#003333',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(61).setInteractive({ useHandCursor: true });

    retryBtn.on('pointerover', () => retryBtn.setColor('#ffffff'));
    retryBtn.on('pointerout',  () => retryBtn.setColor('#00ffff'));
    retryBtn.on('pointerdown', () => {
      this.cameras.main.fadeOut(280, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('GameScene', { level: this.currentLevel });
      });
    });

    const menuBtn = this.add.text(W / 2, H / 2 + 60, '[ MENU ]', {
      fontFamily: '"Press Start 2P"',
      fontSize: '9px',
      color: '#aaaaaa',
      stroke: '#222222',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(61).setInteractive({ useHandCursor: true });

    menuBtn.on('pointerover', () => menuBtn.setColor('#ffffff'));
    menuBtn.on('pointerout',  () => menuBtn.setColor('#aaaaaa'));
    menuBtn.on('pointerdown', () => {
      this.cameras.main.fadeOut(280, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start('LevelMapScene');
      });
    });
  }

  handleWin() {
    // Save progress
    const saved = parseInt(localStorage.getItem('tokyoCanSort_progress') || '1');
    if (this.currentLevel >= saved) {
      localStorage.setItem('tokyoCanSort_progress', String(this.currentLevel + 1));
    }

    this.time.delayedCall(500, () => {
      this.scene.launch('LevelClearScene', { level: this.currentLevel });
      this.scene.pause('GameScene');
    });
  }
}
