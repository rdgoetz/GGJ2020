let Entity = window.entity;

class Skeleton extends Entity {
  init() {
    this.speed = 100;
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
      frame: 'sword_skelton-5'
    }
  }

  static animations() {
    return [];
  }

  load() {
  }

  render() {
  }

  update(p3, time, delta) {
    let playerBody = this.world.player.physicsBody;
    const prevVelocity = this.physicsBody.body.velocity.clone();

    // Stop any previous movement from the last frame
    this.physicsBody.body.setVelocity(0);

    // Horizontal movement
    if (playerBody.x < this.physicsBody.x - 20) {
      this.physicsBody.body.setVelocityX(-this.speed);
    } else if (playerBody.x > this.physicsBody.x + 20) {
      this.physicsBody.body.setVelocityX(this.speed);
    }

    // Vertical movement
    if (playerBody.y < this.physicsBody.y - 20) {
      this.physicsBody.body.setVelocityY(-this.speed);
    } else if (playerBody.y > this.physicsBody.y + 20) {
      this.physicsBody.body.setVelocityY(this.speed);
    }

    // Normalize and scale the velocity so that this.physicsBody can't move faster along a diagonal
    this.physicsBody.body.velocity.normalize().scale(this.speed);
  }

  unload() {
  }
}

window.skeleton = Skeleton;
