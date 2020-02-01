class Entity {
  constructor(world) {
    this.world = world
    this.physicsBody = null

    this.init();
  }

  sprite() {
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

window.entity = Entity
