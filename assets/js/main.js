import scenes from './scenes/scenes';

const config = {
  type: Phaser.AUTO,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  scale: {
    width: '100%',
    height: '100%',
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-game'
  },
  pixelArt: true,
  roundPixels: true,
};

var game = new Phaser.Game(config);
