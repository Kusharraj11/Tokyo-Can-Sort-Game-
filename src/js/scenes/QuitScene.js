import Phaser from 'phaser';

export default class QuitScene extends Phaser.Scene {
  constructor() { super('QuitScene'); }

  init(data) {
    this.currentLevel = data.level || 1;
  }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Dark overlay — blocks clicks
    const overlay = this.add.rectangle(W/2, H/2, W, H, 0x000000, 0.65)
      .setInteractive();

    // Panel
    const panel = this.add.image(W/2, H/2, 'panel-quit')
      .setDisplaySize(300, 210);

    panel.setScale(0);
    panel.setAlpha(0);
    this.tweens.add({
      targets: panel,
      scaleX: 1, scaleY: 1, alpha: 1,
      duration: 300,
      ease: 'Back.Out'
    });

    // YES button
    const yesBtn = this.add.text(W/2 + 58, H/2 + 50, '✓ YES', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      color: '#00ff88',
      backgroundColor: '#0a2e1a',
      padding: { x: 14, y: 10 }
    })
    .setOrigin(0.5)
    .setAlpha(0)
    .setInteractive({ useHandCursor: true });

    // NO button
    const noBtn = this.add.text(W/2 - 58, H/2 + 50, '✕ NO', {
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      color: '#ff4444',
      backgroundColor: '#2e0a0a',
      padding: { x: 14, y: 10 }
    })
    .setOrigin(0.5)
    .setAlpha(0)
    .setInteractive({ useHandCursor: true });

    this.tweens.add({ targets: [yesBtn, noBtn], alpha: 1, delay: 250, duration: 200 });

    // Hover effects
    [yesBtn, noBtn].forEach(btn => {
      btn.on('pointerover', () => this.tweens.add({ targets: btn, scaleX: 1.08, scaleY: 1.08, duration: 80 }));
      btn.on('pointerout',  () => this.tweens.add({ targets: btn, scaleX: 1, scaleY: 1, duration: 80 }));
    });

    // YES → go to map
    yesBtn.on('pointerdown', () => {
      this.tweens.add({
        targets: yesBtn, scaleX: 0.9, scaleY: 0.9, duration: 60,
        onComplete: () => {
          this.scene.stop('QuitScene');
          this.scene.stop('GameScene');
          this.scene.start('LevelMapScene');
        }
      });
    });

    // NO → resume game
    noBtn.on('pointerdown', () => {
      this.tweens.add({
        targets: noBtn, scaleX: 0.9, scaleY: 0.9, duration: 60,
        onComplete: () => {
          this.scene.stop('QuitScene');
          this.scene.resume('GameScene');
        }
      });
    });
  }
}
