import Entity from './entity.js'

export default class Vase extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);
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
      frame: 'item-0.png'
    }
  }

  collisionList() {
    return ['player', 'hero'];
  }

  collidedWith(p3, entity) {
  }

  static animations() {
    return [];
  }

  update(p3, time, delta) {
  }

  unload() {
  }
}
