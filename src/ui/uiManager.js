import StatusBar from "./statusBar/statusBar.js"

export default class UIManager{
  constructor() {
    this.statusBar = new StatusBar();

    this.uiPanels = {
      statusBar: '/src/ui/statusBar/statusBar.html'
    }
  
    this.timer = this.statusBar.display.timer;
  }

  update(hearts, timer, bones) {
    hearts.forEach(sprite => sprite.visible = false);
    for (var i = 0; i < this.statusBar.display.life; i++) {
      hearts[i].visible = true;
    }

    timer.setText(this.statusBar.display.timer);
    bones.setText(this.statusBar.display.bones);
    //coins.setText(this.statusBar.display.coins);
  }

  loadSpriteSheets(game) {
    game.load.spritesheet('pot-items', '/assets/images/Pot Items.png', {
      frameWidth: 16,
      frameHeight: 16,
      }
    );
    game.load.image('bone', '/assets/images/Bone.png');
  }

  statusBarTextStyle  = {
    fontSize: '28px', 
    fill: '#fff',
    strokeThickness: 1.5,
  }

  setHearts(game) {
    var hearts = []
    for (var i = 0; i < this.statusBar.display.life; i++) {
      const sprite = game.add.sprite(50 + (50 * i), 575, "pot-items")
        .setScrollFactor(0)
        .setScale(2)
        .setFrame(0);
      hearts[i] = sprite;
    }

    return hearts;
  }

  setTimer(game) {
    var text = game.add
                  .text(400, 560, this.statusBar.display.timer, this.statusBarTextStyle)
                  .setScrollFactor(0);
    return text;
  }

  setBones(game) {
    var text = game.add 
                  .text(700, 560, this.statusBar.display.bones, this.statusBarTextStyle)
                  .setScrollFactor(0);
    game.add.image(755, 575, 'bone').setScrollFactor(0).setScale(1.6);
    return text;
  }
}
