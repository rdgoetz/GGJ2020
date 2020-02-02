import Inventory from '../game/inventory.js'

export default class Entity {
  constructor(world, properties) {
    this.world = world
    this.physicsBody = null

    this.tags = [];
    this.properties = properties;
    this.inventory = new Inventory();
  }

  setProperty() {
  }

  sprite() {
  }

  hasTag(tag) {
    return this.tags.includes(tag);
  }

  collisionList() {
    return [];
  }

  collidedWith(entity) {
  }

  collidesWith(collisionType) {
    return this.collisionList().includes(collisionType);
  }

  setPhysicsBody(physicsBody) {
    this.physicsBody = physicsBody;
  }

  setId(id) {
    this.id = id;
  }

  load() {
  }

  update(p3, time, delta) {
  }

  unload() {
  }
}
