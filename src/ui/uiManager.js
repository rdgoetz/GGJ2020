import StatusBar from "./statusBar/statusBar.js"

export default class UIManager{
  constructor() {
    this.statusBar = new StatusBar();

    this.uiPanels = {
      statusBar: '/src/ui/statusBar/statusBar.html'
    }
  
    this.timer = this.statusBar.display.timer;
  }

  update(hearts, timer, bones, coins) {
    hearts.forEach(sprite => sprite.visible = false);
    for (var i = 0; i < this.statusBar.display.life; i++) {
      hearts[i].visible = true;
    }

    timer.setText(this.statusBar.display.timer);
    bones.setText(this.statusBar.display.bones);
    coins.setText(this.statusBar.display.coins);
  }
}
