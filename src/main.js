/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */
import UIManager from './ui/uiManager.js';
document.addEventListener("DOMContentLoaded", function(event) {

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true, 
  dom: {
    createContainer: true
  },
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

let World = window.world;
let Player = window.player;
let Skeleton = window.skeleton;
let SkeletonSpawn = window.skeletonSpawn;

let world = new World({
  player: Player,
  skeleton: Skeleton,
  skeletonSpawn: SkeletonSpawn
});

var UI = new UIManager();
let showDebug = false;

function preload() {
  world.loadAssets(this);
  this.load.html('status', UI.uiPanels.statusBar)
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
  
  this.add.dom(400, 550).createFromCache('status')
    .setScrollFactor(0);
  // END UI -------------------------------------
}

function update(time, delta) {
  world.update(this, time, delta)
}

})
