import Entity from './entity.js'

export default class Skeleton extends Entity {
  init() {
    this.speed = 100;
    this.dieAt = 0;
    this.lifetime = 3000;
  }

  sprite() {
    return {
      size: {
        w: 32,
        h: 32
      },
      offeset: {
        x: 0,
        y: 0
      },
      sheet: 'atlas',
      frame: 'sword_skeleton-0.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player', 'hero'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
    }
  }

  load() {
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

    if (this.dieAt == 0) { this.dieAt = time + this.lifetime; }

    if (this.dieAt < time) {
      this.die(p3);
    }
  }

  die(p3) {
    let skeletonSpawn = this.world.createEntity('skeletonSpawn', this.properties);
    this.world.addEntity(p3, skeletonSpawn, this.physicsBody.x, this.physicsBody.y)

    for(var i = 0; i<3; i++) {
      let bone = this.world.createEntity('bone', {});
      this.world.addEntity(p3, bone, this.physicsBody.x, this.physicsBody.y)
    }
    this.world.removeEntity(this);
  }

  unload() {
  }
}
