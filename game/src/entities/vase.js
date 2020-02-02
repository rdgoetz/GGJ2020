import Entity from './entity.js'

export default class Vase extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.tags(['vase']);
  }

  sprite() {
    return {
      size: {
        w: 18,
        h: 20
      },
      offeset: {
        x: 7,
        y: 6
      },
      sheet: 'atlas',
      frame: 'item-0.png'
    }
  }

  collisionList() {
    return ['player','hero','skeleton'];
  }

  static animations() {
    return [];
  }

  die(p3) {
    let brokenVase = this.world.createEntity('brokenVase', this.properties);
    this.world.addEntity(p3, brokenVase, this.physicsBody.x, this.physicsBody.y)
  }
}
