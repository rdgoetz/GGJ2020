import Entity from './entity.js'

export default class Hero extends Entity {
  init() {
    this.speed = 100;
    this.currentRoomIndex = null;
    this.currentRoom = null;

    //this.goals = this.roomEntities();
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
      frame: 'Hero-0.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {
    }
  }

  roomEntities() {
    this.world.entities.filter((entity) => {
    });
  }

  acquireNextGoal() {
  }

  load() {
  }

  update(p3, time, delta) {
    if (this.currentRoomIndex == null) {
      this.currentRoomIndex = 0;
      this.currentRoom = this.world.configuration.room_path.path[this.currentRoomIndex];
    }
  }

  die(p3) {
  }

  unload() {
  }
}
