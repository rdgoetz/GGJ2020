import Entity from './entity.js'

export default class SpikeTrap extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.tags(['trap', 'spikeTrap']);

    this.triggering = false;
    this.damaging = false;
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
      frame: 'item-4.png'
    }
  }

  overlappedWith(p3, entity) {
    if (entity.hasTag('player') || entity.hasTag('hero')) {
      if (!this.triggering) {
        this.triggering = true;

        setTimeout(() => {
          this.damaging = true;
          this.kill();
        }, 500)
      }

      if (this.damaging) {
        entity.damage(1);
      }
    }
  }

  collisionList() {
    return ['player','hero'];
  }

  static animations() {
    return [];
  }

  die(p3) {
    this.world.playSound('Trap 3');

    this.properties.overlapOnly = false;
    let triggeredSpikeTrap = this.world.createEntity('triggeredSpikeTrap', this.properties);
    this.world.addEntity(p3, triggeredSpikeTrap, this.physicsBody.x, this.physicsBody.y)
  }
}
