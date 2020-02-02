import Entity from './entity.js'

export default class Door extends Entity {
  init() {
    this.tags(['door']);

    this.open = false;

    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);
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
      frame: 'Doors-2.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player', 'hero', 'skeleton'];
  }

  openDoor() {
    this.open = true;
    this.physicsBody.visible = false;
    this.physicsBody.body.setEnable(false)

    setTimeout(() => {
      this.open = false;
      this.physicsBody.visible = true;
      this.physicsBody.body.setEnable(true)
    }, 500)
  }
}
