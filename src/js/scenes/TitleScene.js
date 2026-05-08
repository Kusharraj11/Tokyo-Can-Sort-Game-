import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() { super('TitleScene'); }

  create() {
    const W = this.scale.width;
    const H = this.scale.height;

    // --- Containers ---
    this.bgContainer = this.add.container(0, 0).setDepth(0);
    this.uiContainer = this.add.container(0, 0).setDepth(10);

    // Background — no overlay, no blur, clean full image
    const bg = this.add.image(W / 2, H / 2, 'title-screen')
      .setDisplaySize(W, H);
    this.bgContainer.add(bg);

    // Play button — centered, floating animation
    const playBtn = this.add.image(W / 2, H * 0.72, 'btn-play')
      .setDisplaySize(180, 55)
      .setInteractive({ useHandCursor: true });

    this.uiContainer.add(playBtn);

    // Floating animation on play button
    this.tweens.add({
      targets: playBtn,
      y: H * 0.72 - 12,
      duration: 1600,
      ease: 'Sine.InOut',
      yoyo: true,
      repeat: -1
    });

    // Hover effects
    playBtn.on('pointerover', () => {
      this.tweens.add({ targets: playBtn, scaleX: 1.08, scaleY: 1.08, duration: 100 });
    });
    playBtn.on('pointerout', () => {
      this.tweens.add({ targets: playBtn, scaleX: 1, scaleY: 1, duration: 100 });
    });
    playBtn.on('pointerdown', () => {
      this.tweens.add({
        targets: playBtn, scaleX: 0.95, scaleY: 0.95, duration: 80,
        onComplete: () => {
          this.cameras.main.fadeOut(400, 0, 0, 0);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('LevelMapScene');
          });
        }
      });
    });

    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Reposition on resize
    this.scale.on('resize', (gameSize) => {
      const nW = gameSize.width, nH = gameSize.height;
      bg.setPosition(nW / 2, nH / 2).setDisplaySize(nW, nH);
      const newBtnY = nH * 0.72;
      playBtn.setPosition(nW / 2, newBtnY);
      // Re-attach tween target position
      this.tweens.killTweensOf(playBtn);
      this.tweens.add({
        targets: playBtn,
        y: newBtnY - 12,
        duration: 1600,
        ease: 'Sine.InOut',
        yoyo: true,
        repeat: -1
      });
    });
  }
}
