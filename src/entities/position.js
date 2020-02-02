import Entity from './entity.js'

export default class Position extends Entity {
  init() {
    this.tags(['position']);

    this.physicsBody.visible = false;

    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);
  }

  sprite() {
    return {
      size: {
        w: 8,
        h: 8
      },
      offeset: {
        x: 12,
        y: 12
      },
      sheet: 'atlas',
      frame: 'item-3.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['hero'];
  }
}
