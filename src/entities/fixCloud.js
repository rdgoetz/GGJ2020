import Entity from './entity.js'

export default class FixCloud extends Entity {
  init() {
    this.tags(['fixCloud', 'effect']);

    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);
    this.physicsBody.body.setEnable(false)

    this.physicsBody.setDepth(7);

    this.world.playSound('Bones Up');

    setTimeout(() => {
      this.kill()
    }, 500)
  }

  sprite() {
    let frame = Math.random() > 0.5;
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
      frame: frame ? 'Cloud-0.png' : 'Cloud-1.png'
    }
  }

  static animations() {
    return [];
  }
}
