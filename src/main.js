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
import BrokenVase from './entities/brokenVase.js'
import Door from './entities/door.js'
import Position from './entities/position.js'
import SpikeTrap from './entities/spikeTrap.js'
import TriggeredSpikeTrap from './entities/triggeredSpikeTrap.js'
import FixCloud from './entities/fixCloud.js'

document.addEventListener("DOMContentLoaded", function(event) {

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  audio: {
    disableWebAudio: true
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

let world;

var UI = new UIManager(this);
let showDebug = false;

function preload() {
  world = new World(this, {
    player: Player,
    skeleton: Skeleton,
    skeletonSpawn: SkeletonSpawn,
    bone: Bone,
    hero: Hero,
    vase: Vase,
    brokenVase: BrokenVase,
    door: Door,
    position: Position,
    spikeTrap: SpikeTrap,
    triggeredSpikeTrap: TriggeredSpikeTrap,
    fixCloud: FixCloud
  });

  world.loadAssets(this);

  this.load.scenePlugin({
    key: 'rexuiplugin',
    url: '/js/rexuiplugin.min.js',
    sceneKey: 'rexUI'
  });

  UI.loadSpriteSheets(this);
}

var timer;
var clock;

var gameStarted = false;
let welcomeText;

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
    world.worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  });

  this.input.keyboard.once("keydown_SPACE", event => {
    gameStarted = true;
    welcomeText.destroy();
  })

  let style = {
    fontFamily: 'Courier',
    fontSize: '48px',
    fill: '#000000',
    strokeThickness: 2,
    stroke: '#FFFFFF'
  };

  welcomeText = this.add
              .text(115, 250, 'Press Space To Begin', style)
              .setDepth(50)
              .setScrollFactor(0);

  world.onReady((readyWorld) => {
    // UI ----------------------------------------------
    timer = readyWorld.heroTime;

    UI.setWorld(readyWorld);
    hearts = UI.setHearts(this, readyWorld.player.hitPoints);
    clock = UI.setTimer(this, timer);
    bones = UI.setBones(this);

    var timedEvent = this.time.addEvent({
      delay: 1000,
      callback: onEvent,
      callbackScope: this,
      loop: true,
    });
    // END UI -------------------------------------

  })

  var camera = this.cameras.main;
  camera.setZoom(1.25);
}

function update(time, delta) {
  if (gameStarted) {
    world.update(this, time, delta);
  }

  if (UI.world) {
    UI.update(hearts, clock, bones);
  }
}

function onEvent() {
  timer -= 1;
  UI.time = timer;
  if (timer <= 0) {
    world.newHero();
    timer = world.heroTime;
  }
}

})
