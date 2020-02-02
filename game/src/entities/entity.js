import Inventory from '../game/inventory.js'

export default class Entity {
  constructor(world, properties) {
    this.world = world
    this.physicsBody = null

    this.hitPoints = 1;

    this.tagSet = [];
    this.properties = properties;
    this.inventory = new Inventory();

    this.markedForDeath = false;
  }

  addedToWorld() {
    this.physicsBody.setDepth(6);
    this.init();
  }

  tags(tags) {
    this.tagSet = this.tagSet.concat(tags)
  }

  setProperty() {
  }

  sprite() {
  }

  hasTag(tag) {
    return this.tagSet.includes(tag);
  }

  kill() {
    this.markedForDeath = true;
  }

  damage(amount) {
    this.hitPoints -= amount;

    this.tookDamage();

    if (!this.healthy()) {
      this.kill();
    }
  }

  tookDamage() {
  }

  healthy() {
    return this.hitPoints > 0;
  }

  collisionList() {
    return [];
  }

  overlapOnly() {
    return this.properties.overlapOnly;
  }

  handleCollision(p3, entity) {
    this.collidedWith(p3, entity);
    entity.collidedWith(p3, this);
  }

  handleOverlap(p3, entity) {
    this.overlappedWith(p3, entity);
    entity.overlappedWith(p3, this);
  }

  collidedWith(p3, entity) {
  }

  overlappedWith(p3, entity) {
  }

  collidesWith(collisionType) {
    return this.collisionList().includes(collisionType);
  }

  setPhysicsBody(physicsBody) {
    this.physicsBody = physicsBody;
  }

  acquireTarget(tags, acquireRange) {
    let targets = this.world.taggedEntities(tags).filter((entity) => {
      return Phaser.Math.Distance.Between(entity.physicsBody.x, entity.physicsBody.y, this.physicsBody.x, this.physicsBody.y) < acquireRange
    });

    if (targets.length > 0) {
      return targets[0];
    }

    return null
  }

  setId(id) {
    this.id = id;
  }

  worldStep(p3, time, delta) {
    if (this.markedForDeath) {
      this.die(p3);
    } else {
      this.update(p3, time, delta);
    }
  }

  die(p3) {
  }

  update(p3, time, delta) {
  }

  unload() {
  }
}
