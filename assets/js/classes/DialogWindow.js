import { createInputField } from '../utils/utils';
import ModalWindow from './ModalWindow';

export default class DialogWindow extends ModalWindow {
    constructor(scene, opts) {
        if (!opts) opts = {};
        super(scene, opts);
        this.messages = [];
        this.messageCount = 0;
        this.messagesHeight = 0;
        this.messageGroup = this.scene.add.group();
        this.graphics.setDepth(2);
        this.createInput();
        this.createWindow();
        this.makeInteractive();
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

    createInnerWindowRectangle({x, y, rectWidth, rectHeight,}) {
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
