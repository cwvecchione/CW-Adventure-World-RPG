class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // create title text
    this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'CW Adventure World', { fontSize: '64px', fill: '#fff' });
    this.titleText.setOrigin(0.5);

    this.startGameButton = new UiButton(this, this.scale.width / 2, this.scale.height * 0.65, 'button1', 'button2', 'Start', this.startScene.bind(this, 'Game'));
    
    this.scale.on('resize', this.resize, this);
    this.resize({ height: this.scale.height, width: this.scale.width });
  }

  startScene(targetScene) {
    this.scale.removeListener('resize', this.resize);
    this.scene.start(targetScene);
  }

  resize(gameSize) {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);
    if (width < 1000) {
      this.titleText.setFontSize('64px');
    } else {
      this.titleText.setFontSize('128px');
    }
    if (height < 700) {
      this.titleText.setPosition(width / 2, height * 0.4);
      this.startGameButton.setPosition(width / 2, height * 0.7);
      this.startGameButton.setScale(0.5);
    } else {
      this.titleText.setPosition(width / 2, height / 2);
      this.startGameButton.setPosition(width / 2, height * 0.75);
      this.startGameButton.setScale(1);
    }
  }
}
