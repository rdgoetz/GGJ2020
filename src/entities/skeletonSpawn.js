import Entity from './entity.js'

export default class SkeletonSpawn extends Entity {
  init() {
    this.nextSpawn = 0;
    this.spawnTimer = 3000;
    this.numBones = 0;

    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);
  }

  sprite() {
    return {
      size: {
        w: 16,
        h: 16
      },
      offeset: {
        x: 8,
        y: 16
      },
      sheet: 'atlas',
      frame: 'sword_skeleton-5.png'
    }
  }

  collisionList() {
    return ['player'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
      this.numBones += entity.inventory.remove('bones', 3)
    }
  }

  static animations() {
    return [];
  }

  update(p3, time, delta) {
    if (this.nextSpawn == 0) { this.nextSpawn = time + this.spawnTimer; }

    if (this.numBones >= 3 && this.nextSpawn < time) {
      this.hasSkeleton = true;
      let newSkeleton = this.world.createEntity('skeleton', this.properties);
      this.world.addEntity(p3, newSkeleton, this.physicsBody.x, this.physicsBody.y)

      this.world.removeEntity(this);
    }
  }

  unload() {
  }
}
