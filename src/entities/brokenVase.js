import Entity from './entity.js'

export default class BrokenVase extends Entity {
  init() {
    this.physicsBody.body.setVelocity(0);
    this.physicsBody.body.setImmovable(true);

    this.physicsBody.body.setEnable(false)

    this.tags(['brokenVase','broken']);
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
      frame: 'item-1.png'
    }
  }

  collisionList() {
    return ['player', 'hero'];
  }

  static animations() {
    return [];
  }

  die(p3) {
    let vase = this.world.createEntity('vase', this.properties);
    this.world.addEntity(p3, vase, this.physicsBody.x, this.physicsBody.y)

    // let fixCloud = this.world.createEntity('fixCloud', {});
    // this.world.addEntity(p3, fixCloud, this.physicsBody.x, this.physicsBody.y)
  }

  unload() {
  }
}
