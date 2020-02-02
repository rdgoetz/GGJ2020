import Entity from './entity.js'

export default class TriggeredSpikeTrap extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.tags(['trap', 'triggeredSpikeTrap']);
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
      frame: 'item-6.png'
    }
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
    }
  }

  collisionList() {
    return ['player','hero','skeleton'];
  }

  static animations() {
    return [];
  }

  die(p3) {
    this.properties.overlapOnly = true;
    let spikeTrap = this.world.createEntity('spikeTrap', this.properties);
    this.world.addEntity(p3, spikeTrap, this.physicsBody.x, this.physicsBody.y)

    // let fixCloud = this.world.createEntity('fixCloud', {});
    // this.world.addEntity(p3, fixCloud, this.physicsBody.x, this.physicsBody.y)
  }
}
