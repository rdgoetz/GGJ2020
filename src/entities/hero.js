import Entity from './entity.js'

export default class Hero extends Entity {
  init() {
    this.speed = 100;
    this.currentRoomIndex = null;
    this.currentRoom = null;
    this.goalEntity = null;

    this.attacking = false;

    this.tags(['hero']);
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
      if (entity.healthy()) {
        this.attack(entity);
        if (!entity.healthy()) {
          this.acquireNextGoal()
        }
      }
    }

    if (entity.hasTag('door') && !entity.open) {
      entity.openDoor()
    }

    if (entity.hasTag('location') && entity.id == this.goalEntity.id) {
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

    this.currentGoalEntityIndex = null;
    this.currentRoom = this.world.configuration.room_path.path[this.currentRoomIndex];
    this.currentRoomEntities = this.roomEntities(this.currentRoom);
  }

  acquireNextGoal() {
    if (this.goalEntity == null) {
      this.acquireNextRoom();
    }

    if (this.currentGoalEntityIndex == null) {
      this.currentGoalEntityIndex = 0;
    } else {
      this.currentGoalEntityIndex++;
    }

    if (this.completedRoomGoals()) {
      this.acquireNextRoom();
      this.currentGoalEntityIndex = 0;
    }

    this.goalEntity = this.currentRoomEntities[this.currentGoalEntityIndex]
  }

  completedRoomGoals() {
    return this.currentGoalEntityIndex >= this.world.configuration.room_path.room_goals[this.currentRoom];
  }

  attack(entity) {
    this.attacking = true;
    entity.damage(1);

    setTimeout(() => {
      this.attacking = false;
    }, 1500)
  }

  update(p3, time, delta) {
    if (this.goalEntity == null || this.completedRoomGoals()) {
      this.acquireNextGoal();
    }

    this.physicsBody.body.setVelocity(0);

    if (this.attacking) {
      return;
    }

    if (this.goalEntity == null) {
      debugger;
    }

    let goalEntityBody = this.goalEntity.physicsBody;
    const prevVelocity = this.physicsBody.body.velocity.clone();

    // Stop any previous movement from the last frame

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
