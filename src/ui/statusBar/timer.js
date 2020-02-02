import StatusBar from './statusBar.js';
var statusBar = new StatusBar();

export default class Timer extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    super(scene, x, y, text, style);
    text = statusBar.display.timer;
    scene.add.existing(this);
}

}