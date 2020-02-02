import Entity from './entity.js'

export default class Bone extends Entity {
  init() {
    this.physicsBody.body.setAllowDrag(true);
    this.physicsBody.body.useDamping = true;
    this.physicsBody.body.setDrag(0.99, 0.99);
    this.physicsBody.body.setAcceleration(0,0);

    this.physicsBody.body.setVelocity(100*Math.random() - 50, 100*Math.random() - 50);
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
      frame: 'Bone-0.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
      entity.inventory.add('bone')
      this.world.removeEntity(this);
    }
  }

  update(p3, time, delta) {
    console.log('update');
  }

  unload() {
  }
}
