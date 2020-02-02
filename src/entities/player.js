import Entity from './entity.js'

export default class Player extends Entity {
  init() {
    this.speed = 200;
    this.hitPoints = 3;
    this.tags(['player']);

    this.hitPoints = 3;

    this.physicsBody.setDepth(7);
  }

  sprite() {
    return {
      size: {
        w: 16,
        h: 28
      },
      offeset: {
        x: 8,
        y: 6
      },
      sheet: 'atlas',
      frame: 'Tux_Hat-0.png'
    }
  }

  static animations(anims) {
    return [];
    return [
      {
        key: "Tux_Hat-up",
        frames: anims.generateFrameNames("atlas", {
          prefix: "Tux_Hat-",
          start: 0,
          end: 3,
          zeroPad: 1
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "Tux_Hat-down",
        frames: anims.generateFrameNames("atlas", {
          prefix: "Tux_Hat-",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "Tux_Hat-left",
        frames: anims.generateFrameNames("atlas", {
          prefix: "Tux_Hat-",

          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "Tux_Hat-right",
        frames: anims.generateFrameNames("atlas", {
          prefix: "Tux_Hat-",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      }
    ]
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('door')) {
      if (!entity.open) {
        entity.openDoor()
      }
    }
  }

  tookDamage() {
    this.physicsBody.setFrame('Tux_Hat-20.png')
    setTimeout(() => {
      this.physicsBody.setFrame('Tux_Hat-0.png')
    }, 200)
  }

  die(p3) {
    this.world.lose("You Were Killed By The Hazards Of The Dungeon.")
  }

  update(p3, time, delta) {
    const prevVelocity = this.physicsBody.body.velocity.clone();
    const cursors = this.world.cursors;

    // Stop any previous movement from the last frame
    this.physicsBody.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      this.physicsBody.body.setVelocityX(-this.speed);
    } else if (cursors.right.isDown) {
      this.physicsBody.body.setVelocityX(this.speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      this.physicsBody.body.setVelocityY(-this.speed);
    } else if (cursors.down.isDown) {
      this.physicsBody.body.setVelocityY(this.speed);
    }

    if (cursors.space.isDown) {
      let target = this.acquireTarget(['brokenVase', 'triggeredSpikeTrap', 'skeletonSpawn'], 30)
      if (target) {
        let killTarget = false;

        if (target.hasTag('needsBones')) {
          if (this.inventory.remove('bone', 3) == 3) {
            killTarget = true
          }
        } else {
          killTarget = true
        }

        if (killTarget) {
          target.kill();
          let fixCloud = this.world.createEntity('fixCloud', {});
          this.world.addEntity(p3, fixCloud, target.physicsBody.x, target.physicsBody.y)
        }
      }
    }

    // Normalize and scale the velocity so that this.physicsBody can't move faster along a diagonal
    this.physicsBody.body.velocity.normalize().scale(this.speed);

    if (this.physicsBody.body.velocity.x < -1) {
      this.physicsBody.setFlipX(true)
    } else if(this.physicsBody.body.velocity.x > 1) {
      this.physicsBody.setFlipX(false)
    }

    Object.entries(this.world.rooms).forEach((entries) => {
      let roomName = entries[0];
      let room = entries[1];

      if (this.physicsBody.x > room.x && this.physicsBody.x < room.x + room.width &&
          this.physicsBody.y > room.y && this.physicsBody.y < room.y + room.height
      ) {
          this.world.taggedEntities(['hero']).filter((hero) => {
            if (hero.currentRoomName == roomName &&
              hero.physicsBody.x > room.x && hero.physicsBody.x < room.x + room.width &&
              hero.physicsBody.y > room.y && hero.physicsBody.y < room.y + room.height
            ) {
              this.world.lose("You Were Seen By A Hero In The Same Room.");
            }
          })
        }
    });

    /*
    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      this.physicsBody.anims.play("Tux_Hat-left", true);
    } else if (cursors.right.isDown) {
      this.physicsBody.anims.play("Tux_Hat-right", true);
    } else if (cursors.up.isDown) {
      this.physicsBody.anims.play("Tux_Hat-up", true);
    } else if (cursors.down.isDown) {
      this.physicsBody.anims.play("Tux_Hat-down", true);
    } else {
      this.physicsBody.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.physicsBody.setTexture("atlas", "Tux_Hat-0");
      else if (prevVelocity.x > 0) this.physicsBody.setTexture("atlas", "Tux_Hat-0");
      else if (prevVelocity.y < 0) this.physicsBody.setTexture("atlas", "Tux_Hat-0");
      else if (prevVelocity.y > 0) this.physicsBody.setTexture("atlas", "Tux_Hat-0");
    }*/
  }

  unload() {
  }
}

window.player = Player;
