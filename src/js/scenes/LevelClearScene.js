import Phaser from 'phaser';
import { TOTAL_LEVELS } from '../LevelData.js';

export default class LevelClearScene extends Phaser.Scene {
  constructor() { super('LevelClearScene'); }

  init(data) {
    this.currentLevel = data.level || 1;
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;
    const isLast = this.currentLevel >= TOTAL_LEVELS;

    const goToNext = () => {
      this.scene.stop('LevelClearScene');
      this.scene.stop('GameScene');
      if (isLast) {
        this.scene.start('LevelMapScene');
      } else {
        this.scene.start('GameScene', { level: this.currentLevel + 1 });
      }
    };

    // Dark overlay � blocks clicks to game behind
    const overlay = this.add.rectangle(W/2, H/2, W, H, 0x000000, 0.65)
      .setInteractive();

    // Panel
    const panel = this.add.image(W/2, H/2, 'panel-nextlevel')
      .setDisplaySize(300, 200);

    panel.setScale(0);
    panel.setAlpha(0);

    this.tweens.add({
      targets: panel,
      scaleX: 1, scaleY: 1, alpha: 1,
      duration: 350,
      ease: 'Back.Out'
    });

    const btnLabel = isLast ? 'BACK TO MAP' : 'NEXT LEVEL';
    const buttonY = H/2 + 68;

    const nextBtnHitArea = this.add.rectangle(W/2, buttonY, 190, 42, 0x000000, 0.01)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    const nextBtn = this.add.text(W/2, buttonY, btnLabel, {
      fontFamily: '"Press Start 2P"',
      fontSize: '14px',
      color: '#00ffff',
      stroke: '#003333',
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setAlpha(0)
    .setDepth(3);

    this.tweens.add({ targets: nextBtnHitArea, alpha: { from: 0, to: 0.01 }, delay: 300, duration: 1 });
    this.tweens.add({ targets: nextBtn, alpha: 1, delay: 300, duration: 200 });

    nextBtnHitArea.on('pointerover', () => this.tweens.add({ targets: nextBtn, scaleX: 1.06, scaleY: 1.06, duration: 80 }));
    nextBtnHitArea.on('pointerout',  () => this.tweens.add({ targets: nextBtn, scaleX: 1, scaleY: 1, duration: 80 }));
    nextBtnHitArea.on('pointerdown', () => {
      this.tweens.add({
        targets: nextBtn,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 60,
        onComplete: goToNext
      });
    });

    // Back to map button (below panel)
    const backBtnBg = this.add.rectangle(W/2, H/2 + 130, 180, 38, 0x1a0033, 1)
      .setStrokeStyle(2, 0xff69b4)
      .setAlpha(0)
      .setDepth(1);

    const backBtnHit = this.add.rectangle(W/2, H/2 + 130, 180, 38, 0x000000, 0.01)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    const backBtnText = this.add.text(W/2, H/2 + 130, 'BACK TO MAP', {
      fontFamily: '"Press Start 2P"',
      fontSize: '9px',
      color: '#ff69b4'
    })
    .setOrigin(0.5)
    .setAlpha(0)
    .setDepth(3);

    this.tweens.add({ targets: [backBtnBg, backBtnHit], alpha: { from: 0, to: 1 }, delay: 400, duration: 200 });
    this.tweens.add({ targets: backBtnText, alpha: 1, delay: 400, duration: 200 });

    backBtnHit.on('pointerover', () => {
      backBtnBg.setFillStyle(0x330033);
      this.tweens.add({ targets: backBtnText, scaleX: 1.06, scaleY: 1.06, duration: 80 });
    });
    backBtnHit.on('pointerout', () => {
      backBtnBg.setFillStyle(0x1a0033);
      this.tweens.add({ targets: backBtnText, scaleX: 1, scaleY: 1, duration: 80 });
    });
    backBtnHit.on('pointerdown', () => {
      this.scene.stop('LevelClearScene');
      this.scene.stop('GameScene');
      this.scene.start('LevelMapScene');
    });

    // Particle burst effect
    this.createCelebration(W, H);
  }

  createCelebration(W, H) {
    const colors = [0x00ffff, 0xff69b4, 0xffd700, 0x2ecc71, 0xff6b35];
    for (let i = 0; i < 18; i++) {
      const x = Phaser.Math.Between(60, W - 60);
      const y = Phaser.Math.Between(H * 0.2, H * 0.8);
      const star = this.add.text(x, y, '*', {
        fontSize: `${Phaser.Math.Between(12, 22)}px`,
        color: '#' + colors[i % colors.length].toString(16).padStart(6, '0')
      }).setOrigin(0.5).setAlpha(0);

      this.tweens.add({
        targets: star,
        alpha: { from: 0, to: 1 },
        y: y - Phaser.Math.Between(30, 80),
        scaleX: 0, scaleY: 0,
        duration: Phaser.Math.Between(600, 1000),
        delay: Phaser.Math.Between(0, 400),
        ease: 'Power2Out',
        yoyo: true,
        onComplete: () => star.destroy()
      });
    }
  }
}

