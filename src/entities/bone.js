import Entity from './entity.js'

export default class Bone extends Entity {
  init() {
    this.physicsBody.body.setAllowDrag(true);
    this.physicsBody.body.useDamping = true;
    this.physicsBody.body.setDrag(0.95, 0.95);
    this.physicsBody.body.setAcceleration(0,0);

    let xBase = (1-Math.random()*Math.random());
    let yBase = (1-Math.random()*Math.random());
    let speed = 1000;

    this.physicsBody.body.setVelocity(speed*xBase - speed/2, speed*yBase - speed/2);

    this.tags(['bone']);
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
  }

  unload() {
  }
}
