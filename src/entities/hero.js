import Entity from './entity.js'

export default class Hero extends Entity {
  init() {
    this.speed = 100;
    this.currentRoomIndex = null;
    this.currentRoom = null;
    this.goalEntity = null;

    this.attacking = false;

    this.tags(['hero']);

    this.hitPoints = 3;

    this.physicsBody.setDepth(7);
  }

  sprite() {
    return {
      size: {
        w: 24,
        h: 32
      },
      offeset: {
        x: 4,
        y: 0
      },
      sheet: 'atlas',
      frame: 'Hero-0.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player', 'vase', 'skeleton', 'skeletonSpawn'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('vase') || entity.hasTag('skeleton')) {
      if (entity.healthy() && !this.attacking) {
        this.attack(entity);
        if (!entity.healthy()) {
          delete this.currentRoomEntities[entity.id];
          this.acquireNextGoal()
        }
      }
    }

    if (entity.hasTag('door') && !entity.open) {
      entity.openDoor()
    }

    if (entity.hasTag('location') && entity.id == this.goalEntity.id) {
      delete this.currentRoomEntities[entity.id];
      this.acquireNextGoal()
    }
  }

  roomEntities(room) {
    return this.world.entities.filter((entity) => {
      return entity.properties.room_id && entity.properties.room_id == room
    });
  }

  acquireNextRoom() {
    if (this.currentRoomIndex == null) {
      this.currentRoomIndex = 0;
    } else {
      this.currentRoomIndex++;
    }

    this.currentRoomName = this.world.configuration.room_path.path[this.currentRoomIndex];
    this.currentRoom = this.world.rooms[this.currentRoomName];

    this.currentRoomEntities = Object.assign({}, this.currentRoom.entities);
  }

  acquireNextGoal() {
    if (this.goalEntity == null) {
      this.acquireNextRoom();
    }

    if (this.completedRoomGoals()) {
      this.acquireNextRoom();
    }

    if (this.currentRoomIndex >= this.world.configuration.room_path.path.length) {
      this.kill();
    } else {
      let positions = Object.values(this.currentRoomEntities).filter((entity) => entity.hasTag('position') && !entity.properties.exit)

      if (positions.length > 0) {
        this.goalEntity = positions[0]
      } else {
        let enemies = Object.values(this.currentRoomEntities).filter((entity) => entity.hasTag('enemy'))

        if (enemies.length > 0) {
          this.goalEntity = enemies[0]
        } else {
          let entities = Object.values(this.currentRoomEntities).filter((entity) => !entity.properties.exit)

          if (entities.length > 0) {
            this.goalEntity = entities[0];
          } else {
            let exits = Object.values(this.currentRoomEntities).filter((entity) => entity.properties.exit)
            this.goalEntity = exits[0];
          }
        }
      }
    }
  }

  completedRoomGoals() {
    return Object.values(this.currentRoomEntities).length <= 0;
  }

  attack(entity) {
    this.attacking = true;
    entity.damage(1);

    this.world.playSound('Attack');

    setTimeout(() => {
      this.attacking = false;
    }, 450)
  }

  update(p3, time, delta) {
    if (this.goalEntity == null) {
      this.acquireNextGoal();
    }

    this.physicsBody.body.setVelocity(0);

    let goalEntityBody = this.goalEntity.physicsBody;
    const prevVelocity = this.physicsBody.body.velocity.clone();

    if (this.goalEntity && this.goalEntity.hasTag('broken')) {
      this.world.lose();
    }

    if (!this.attacking) {
      let offset = 20;

      if (this.goalEntity.hasTag('door') || this.goalEntity.hasTag('location')) {
        offset = 2;
      }

      // Horizontal movement
      if (goalEntityBody.x < this.physicsBody.x - offset) {
        this.physicsBody.body.setVelocityX(-this.speed);
      } else if (goalEntityBody.x > this.physicsBody.x + offset) {
        this.physicsBody.body.setVelocityX(this.speed);
      }

      // Vertical movement
      if (goalEntityBody.y < this.physicsBody.y - offset) {
        this.physicsBody.body.setVelocityY(-this.speed);
      } else if (goalEntityBody.y > this.physicsBody.y + offset) {
        this.physicsBody.body.setVelocityY(this.speed);
      }

      // Normalize and scale the velocity so that this.physicsBody can't move faster along a diagonal
      this.physicsBody.body.velocity.normalize().scale(this.speed);
    }
  }
}
