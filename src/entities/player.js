import Entity from './entity.js'

export default class Player extends Entity {
  init() {
    this.speed = 200;
    this.tags(['player']);
  }

  sprite() {
    return {
      size: {
        w: 16,
        h: 32
      },
      offeset: {
        x: 8,
        y: 0
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

    // Normalize and scale the velocity so that this.physicsBody can't move faster along a diagonal
    this.physicsBody.body.velocity.normalize().scale(this.speed);

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
