/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */
import UIManager from './ui/uiManager.js';
const hearts = [];
var timer;
var bones;
var coins;

import World from './game/world.js'
import Player from './entities/player.js'
import Skeleton from './entities/skeleton.js'
import SkeletonSpawn from './entities/skeletonSpawn.js'
import Bone from './entities/bone.js'
import Hero from './entities/hero.js'
import Vase from './entities/vase.js'

document.addEventListener("DOMContentLoaded", function(event) {

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true, 
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

const game = new Phaser.Game(config);
let cursors;
let player;

let world = new World({
  player: Player,
  skeleton: Skeleton,
  skeletonSpawn: SkeletonSpawn,
  bone: Bone,
  hero: Hero,
  vase: Vase,
});

var UI = new UIManager(this);
let showDebug = false;

function preload() {
  world.loadAssets(this);
  this.load.scenePlugin({
    key: 'rexuiplugin',
    url: '/js/rexuiplugin.min.js',
    sceneKey: 'rexUI'
});
  this.load.spritesheet('heart', '/assets/images/Pot Items.png', {
    frameWidth: 16,
    frameHeight: 16,
    }
  )
}

function create() {
  world.create(this)

  cursors = this.input.keyboard.createCursorKeys();

  // Debug graphics
  this.input.keyboard.once("keydown_D", event => {
    // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = this.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  });

  // UI ----------------------------------------------
    for (var i = 0; i < UI.statusBar.display.life; i++) {
      const sprite = this.add.sprite(50 + (50 * i), 575, "heart").setScrollFactor(0).setScale(2);
      hearts[i] = sprite;
    }
    timer = this.add.text(400, 575, UI.statusBar.display.timer).setScrollFactor(0);
    bones = this.add.text(600, 575, UI.statusBar.display.bones).setScrollFactor(0);
    coins = this.add.text(700, 575, UI.statusBar.display.coins).setScrollFactor(0);
  // END UI -------------------------------------
}

function update(time, delta) {
  world.update(this, time, delta)
  UI.update(hearts, timer, bones, coins);
}

})
