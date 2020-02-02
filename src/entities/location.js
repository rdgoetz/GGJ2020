import Entity from './entity.js'

export default class Position extends Entity {
  init() {
    this.tags(['location']);

    this.physicsBody.visible = false;

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
        y: 8
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
