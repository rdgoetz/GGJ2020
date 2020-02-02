import Inventory from '../game/inventory.js'

export default class Entity {
  constructor(world, properties) {
    this.world = world
    this.physicsBody = null

    this.hitPoints = 1;

    this.tagSet = [];
    this.properties = properties;
    this.inventory = new Inventory();
  }

  addedToWorld() {
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

  damage(amount) {
    this.hitPoints -= amount;
  }

  healthy() {
    return this.hitPoints > 0;
  }

  collisionList() {
    return [];
  }

  handleCollision(p3, entity) {
    this.collidedWith(p3, entity);
    entity.collidedWith(p3, this);
  }

  collidedWith(p3, entity) {
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
