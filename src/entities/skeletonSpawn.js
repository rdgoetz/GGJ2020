import Entity from './entity.js'

export default class SkeletonSpawn extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.physicsBody.body.setEnable(false)

    this.tags(['skeletonSpawn', 'needsBones', 'broken']);
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

  static animations() {
    return [];
  }

  die(p3) {
    let newSkeleton = this.world.createEntity('skeleton', this.properties);
    this.world.addEntity(p3, newSkeleton, this.physicsBody.x, this.physicsBody.y)

    //let fixCloud = this.world.createEntity('fixCloud', {});
    //this.world.addEntity(p3, fixCloud, this.physicsBody.x, this.physicsBody.y)
  }

  unload() {
  }
}
