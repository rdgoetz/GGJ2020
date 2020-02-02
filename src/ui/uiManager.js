import StatusBar from "./statusBar/statusBar.js"
var world;
export default class UIManager{
  constructor(game, world) {
    this.statusBar = new StatusBar();
    this.statusBarTextStyle  = {
      fontFamily: 'Courier',
      fontSize: '28px', 
      fill: '#fff',
      strokeThickness: 1,
      stroke: '#c9c9c9'
    }
  }


  getWorld(world) {
    this.world = world
  }

  update(hearts, timer, bones) {
    hearts.forEach(sprite => sprite.visible = false);
    for (var i = 0; i < this.statusBar.display.life; i++) {
      hearts[i].visible = true;
    }

    timer.setText(this.statusBar.display.timer);
    var boneCount = this.world.player.inventory.items['bone'];
    if (boneCount == undefined) {
      bones.setText( "0x");
    }
    else {
      bones.setText( boneCount + "x");
    }

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
