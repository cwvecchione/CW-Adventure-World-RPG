export default class DialogWindow {
    constructor(scene, opts) {
        if (!opts) opts = {};
        const {
            x = 0,
            y = 0,
            debug = false,
        } = opts;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.debug = debug;
        this.borderThickness = 3;
        this.borderColor = 0x907748;
        this.borderAlpha = 1;
        this.windowAlpha = 0.4;
        this.textAlpha = 0.2;
        this.windowColor = 0x303030;
        this.windowWidth = 305;
        this.windowHeight = this.scene.scale.height;
        this.messages = [];
        this.messageCount = 0;
        this.messagesHeight = 0;
        this.messageGroup = this.scene.add.group();
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(2);
        this.createWindow();
        this.makeInteractive();
    }

    createWindow() {
        const windowDimensions = this.calculateWindowDimension();
        this.createOuterWindow(windowDimensions);
        this.createInnerWindow(windowDimensions);
    }

    calculateWindowDimension() {
        const x = this.x - this.windowWidth - 2 + this.scene.cameras.main.worldView.x;
        const y = this.y + 2 + this.scene.cameras.main.worldView.y;
        const rectHeight = this.windowHeight - 5;
        const rectWidth = this.windowWidth;
        return {
            x, y, rectWidth, rectHeight,
        };
    }

    createOuterWindow({x, y, rectWidth, rectHeight,}) {
        this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha);
        this.graphics.strokeRect(x, y, rectWidth, rectHeight);
    }

    createInnerWindow({x, y, rectWidth, rectHeight,}) {
        this.graphics.fillStyle(this.windowColor, this.windowAlpha);
        this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1);
        if (this.rect) {
            this.rect.setPosition(x + 1, y + 1);
            this.rect.setDisplaySize(rectWidth - 1, rectHeight - 1);
            this.dialogContainer.setPosition(x + 1, y + 1);
            this.dialogContainer.setAlpha(this.textAlpha);
        } else {
            this.rect = this.scene.add.rectangle(x + 1, y + 1, rectWidth - 1, rectHeight -1);
        if (this.debug) this.rect.setFillStyle(0x6666ff);
            this.rect.setOrigin(0, 0);
            this.dialogContainer = this.scene.add.container(x + 1, y + 1);
            this.dialogContainer.setDepth(3);
            this.dialogContainer.setAlpha(this.textAlpha);
        }
    }

    update() {
        if (this.scene.cameras.main.worldView.x > 0 || this.scene.cameras.main.worldView.y > 0) {
            this.redrawWindow();
        }
    }

    redrawWindow() {
        this.graphics.clear();
        this.createWindow();
    }

    makeInteractive() {
        this.rect.setInteractive();
        this.rect.on('pointerover', () => {
            this.windowAlpha = 1;
            this.borderAlpha = 1;
            this.textAlpha = 1;
            this.redrawWindow();
        });
        this.rect.on('pointerout', () => {
            this.windowAlpha = 0.4;
            this.borderAlpha = 0.3;
            this.textAlpha = 0.2;
            this.redrawWindow();
        });
    }
}
