import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  preload() {
    const W = this.scale.width;
    const H = this.scale.height;

    // Loading bar background
    const barBg = this.add.rectangle(W/2, H/2 + 40, W * 0.7, 18, 0x1a1a2e)
      .setStrokeStyle(2, 0x00ffff);

    const bar = this.add.rectangle(W/2 - (W*0.35), H/2 + 40, 0, 14, 0x00ffff)
      .setOrigin(0, 0.5);

    const title = this.add.text(W/2, H/2, 'TOKYO CAN SORT', {
      fontFamily: '"Press Start 2P"',
      fontSize: '14px',
      color: '#00ffff'
    }).setOrigin(0.5);

    const loading = this.add.text(W/2, H/2 - 30, 'LOADING...', {
      fontFamily: '"Press Start 2P"',
      fontSize: '8px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', v => {
      bar.width = W * 0.7 * v;
    });

    this.load.on('complete', () => {
      this.scene.start('TitleScene');
    });

    // Backgrounds
    this.load.image('title-screen',     'assets/images/backgrounds/title-screen.jpg');
    this.load.image('level-select-map', 'assets/images/backgrounds/level-select-map.jpg');
    this.load.image('game-bg',          'assets/images/backgrounds/game-bg.jpg');

    // Cans
    this.load.image('can-red',    'assets/images/cans/can-red.png');
    this.load.image('can-blue',   'assets/images/cans/can-blue.png');
    this.load.image('can-green',  'assets/images/cans/can-green.png');
    this.load.image('can-pink',   'assets/images/cans/can-pink.png');
    this.load.image('can-purple', 'assets/images/cans/can-purple.png');
    this.load.image('can-yellow', 'assets/images/cans/can-yellow.png');

    // Tube
    this.load.image('tube', 'assets/images/tube/tube.png');

    // UI
    this.load.image('btn-play',        'assets/images/ui/btn-play.png');
    this.load.image('btn-back',        'assets/images/ui/btn-back.png');
    this.load.image('panel-quit',      'assets/images/ui/panel-quit.png');
    this.load.image('panel-nextlevel', 'assets/images/ui/panel-nextlevel.png');

    for (let i = 1; i <= 20; i++) {
      this.load.image(`level-node-${i}`, `assets/images/ui/level-node-${i}.png`);
    }
  }
}
