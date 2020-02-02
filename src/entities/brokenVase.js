import Entity from './entity.js'

export default class BrokenVase extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.tags(['brokenVase']);
  }

  sprite() {
    return {
      size: {
        w: 18,
        h: 20
      },
      offeset: {
        x: 7,
        y: 7
      },
      sheet: 'atlas',
      frame: 'item-1.png'
    }
  }

  collisionList() {
    return ['player', 'hero'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
      this.kill();
    }

    if (entity.hasTag('hero')) {
    }
  }

  static animations() {
    return [];
  }

  die(p3, time, delta) {
    let vase = this.world.createEntity('vase', this.properties);
    this.world.addEntity(p3, vase, this.physicsBody.x, this.physicsBody.y)
  }

  unload() {
  }
}
