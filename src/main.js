/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */
import UIManager from './ui/uiManager.js';
var hearts = [];
var timer;
var bones;

import World from './game/world.js'
import Player from './entities/player.js'
import Skeleton from './entities/skeleton.js'
import SkeletonSpawn from './entities/skeletonSpawn.js'
import Bone from './entities/bone.js'
import Hero from './entities/hero.js'
import Vase from './entities/vase.js'
import Door from './entities/door.js'
import Position from './entities/exit.js'

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
  door: Door,
  position: Position
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
  UI.loadSpriteSheets(this);
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
  UI.getWorld(world);
  hearts = UI.setHearts(this);
  timer = UI.setTimer(this);
  bones = UI.setBones(this);  
  // END UI -------------------------------------
}

function update(time, delta) {
  world.update(this, time, delta);
  UI.update(hearts, timer, bones);
}

})
