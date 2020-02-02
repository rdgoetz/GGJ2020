import Entity from './entity.js'

export default class Skeleton extends Entity {
  init() {
    this.speed = 100;

    this.spawnDelay = 3000;
    this.spawnTime = 0;
    this.ready = false;

    this.hitPoints = 3;

    this.physicsBody.body.setImmovable(true);

    this.tags(['skeleton', 'enemy']);

    this.acquireRange = 150;
    this.leashRange = 200;

    this.physicsBody.setDepth(7);
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
      frame: 'sword_skeleton-0.png'
    }
  }

  static animations() {
    return [];
  }

  collisionList() {
    return ['player', 'hero', 'vase'];
  }

  collidedWith(p3, entity) {
    if (entity.hasTag('player')) {

      if (!this.flee) {
        entity.damage(1);

        this.flee = true;

        setTimeout(() => {
          this.flee = false;
        }, 500)
      }
    }

    if (entity.hasTag('door')) {
      this.flee = true;

      setTimeout(() => {
        this.flee = false;
      }, 500)
    }
  }

  tookDamage() {
    let bone = this.world.createEntity('bone', {});
    this.world.addEntity(this.world.p3, bone, this.physicsBody.x, this.physicsBody.y)

    this.damaged = true;
    this.flee = true;

    setTimeout(() => {
      this.flee = false;
      this.damaged = false;
    }, 500)
  }

  load() {
  }

  update(p3, time, delta) {
    if (this.spawnTime == 0) {
      this.spawnTime = time + this.spawnDelay;
    }

    if (this.spawnTime < time && !this.ready) {
      this.ready = true;
    }

    if (this.target == null) {
      this.target = this.acquireTarget(['hero', 'player'], this.acquireRange)
    } else if(Phaser.Math.Distance.Between(this.target.physicsBody.x, this.target.physicsBody.x, this.physicsBody.x, this.physicsBody.y) > this.leashRange){
      this.target = null
    }

    this.physicsBody.body.setVelocity(0);

    if (this.ready && this.target) {
      let playerBody = this.target.physicsBody;
      const prevVelocity = this.physicsBody.body.velocity.clone();

      const direction = this.flee ? -1 : 1;

      // Horizontal movement
      if (playerBody.x < this.physicsBody.x - 20) {
        this.physicsBody.body.setVelocityX(-this.speed * direction);
      } else if (playerBody.x > this.physicsBody.x + 20) {
        this.physicsBody.body.setVelocityX(this.speed * direction);
      }

      // Vertical movement
      if (playerBody.y < this.physicsBody.y - 20) {
        this.physicsBody.body.setVelocityY(-this.speed * direction);
      } else if (playerBody.y > this.physicsBody.y + 20) {
        this.physicsBody.body.setVelocityY(this.speed * direction);
      }

      // Normalize and scale the velocity so that this.physicsBody can't move faster along a diagonal
      this.physicsBody.body.velocity.normalize().scale(this.speed);

      if (this.physicsBody.body.velocity.x < -1) {
        this.physicsBody.setFlipX(this.flee)
      } else if(this.physicsBody.body.velocity.x > 1) {
        this.physicsBody.setFlipX(!this.flee)
      }
    }
  }

  die(p3) {
    let skeletonSpawn = this.world.createEntity('skeletonSpawn', this.properties);
    this.world.addEntity(p3, skeletonSpawn, this.physicsBody.x, this.physicsBody.y)
  }
}
