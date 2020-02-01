let Entity = window.entity;

class Player extends Entity {
  init() {
    this.speed = 200;
  }

  sprite() {
    return {
      size: {
        w: 30,
        h: 40
      },
      offeset: {
        x: 0,
        y: 24
      },
      sheet: 'atlas',
      frame: 'misa-front'
    }
  }

  static animations(anims) {
    return [
      {
        key: "misa-left-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "sword_skelton-",
          start: 0,
          end: 3,
          zeroPad: 1
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "misa-right-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-right-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "misa-front-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-front-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      },
      {
        key: "misa-back-walk",
        frames: anims.generateFrameNames("atlas", {
          prefix: "misa-back-walk.",
          start: 0,
          end: 3,
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      }
    ]
  }

  load() {
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

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      this.physicsBody.anims.play("misa-left-walk", true);
    } else if (cursors.right.isDown) {
      this.physicsBody.anims.play("misa-right-walk", true);
    } else if (cursors.up.isDown) {
      this.physicsBody.anims.play("misa-back-walk", true);
    } else if (cursors.down.isDown) {
      this.physicsBody.anims.play("misa-front-walk", true);
    } else {
      this.physicsBody.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.physicsBody.setTexture("atlas", "misa-left");
      else if (prevVelocity.x > 0) this.physicsBody.setTexture("atlas", "misa-right");
      else if (prevVelocity.y < 0) this.physicsBody.setTexture("atlas", "misa-back");
      else if (prevVelocity.y > 0) this.physicsBody.setTexture("atlas", "misa-front");
    }
  }

  unload() {
  }
}

window.player = Player;
