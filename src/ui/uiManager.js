import StatusBar from "./statusBar/statusBar.js"
var world;
var time;
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


  setWorld(world) {
    this.world = world
  }

  update(hearts, clock, bones) {
    hearts.forEach(sprite => sprite.visible = false);
    for (var i = 0; i < this.world.player.hitPoints; i++) {
      hearts[i].visible = true;
    }

    clock.setText(this.formatTime(this.time));

    var boneCount = this.world.player.inventory.items['bone'];
    if (boneCount == undefined) {
      bones.setText( "0x");
    }
    else {
      bones.setText( boneCount + "x");
    }
  }

  loadSpriteSheets(game) {
    game.load.spritesheet('pot-items', '/assets/images/Pot Items.png', {
      frameWidth: 16,
      frameHeight: 16,
      }
    );
    game.load.image('bone', '/assets/images/Bone.png');
  }

  setHearts(game, hitPoints) {
    var hearts = []
    for (var i = 0; i < hitPoints; i++) {
      const sprite = game.add.sprite(50 + (50 * i), 575, "pot-items")
        .setScrollFactor(0)
        .setScale(2)
        .setDepth(50)
        .setFrame(0);
      hearts[i] = sprite;
    }

    return hearts;
  }

  setTimer(game, time) {
    var text = game.add
                  .text(400, 560, this.formatTime(time), this.statusBarTextStyle)
                  .setDepth(50)
                  .setScrollFactor(0);
    return text;
  }

  setBones(game) {
    var text = game.add
                  .text(700, 560, "0x", this.statusBarTextStyle)
                  .setDepth(50)
                  .setScrollFactor(0);
    game.add.image(755, 575, 'bone').setScrollFactor(0).setScale(1.6);
    return text;
  }

  formatTime(seconds){
    if (seconds) {
      // Minutes
      var minutes = Math.floor(seconds/60);
      // Seconds
      var partInSeconds = seconds%60;
      // Adds left zeros to seconds
      partInSeconds = partInSeconds.toString().padStart(2,'0');
      // Returns formated time
      return `${minutes}:${partInSeconds}`;
    } else {
      return '00:00';
    }
  }
}
