import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import LevelMapScene from './scenes/LevelMapScene';
import GameScene from './scenes/GameScene';
import LevelClearScene from './scenes/LevelClearScene';
import QuitScene from './scenes/QuitScene';

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#0a0a1a',
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight
  },
  scene: [
    BootScene,
    TitleScene,
    LevelMapScene,
    GameScene,
    LevelClearScene,
    QuitScene
  ]
};

new Phaser.Game(config);
