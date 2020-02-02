export default class World {
  constructor(p3, entitySet) {
    this.player = null;
    this.entities = [];
    this.entitySet = entitySet;
    this.cursors = null;

    this.configuration = {};

    this.lastEntityId = 0;

    this.started = false;

    this.sounds = {};
    this.music = {};

    this.p3 = p3;

    this.heroTime = null;
    this.heroesSpawned = 1;

    this.readyCallbacks = [];

    this.rooms = {};
  }

  onReady(callback) {
    this.readyCallbacks.push(callback);
  }

  win() {
    alert('You Win!');
  }

  lose() {
    alert('You Lose');
  }

  newHero() {
    this.heroTime -= this.configuration.heroRules.heroTimerDecrease;
    this.heroesSpawned++;

    if (this.heroesSpawned > this.configuration.heroRules.totalHeroes) {
      this.win();
    } else {
      let hero = this.createEntity('hero', {type: 'hero'});
      this.addEntity(this.p3, hero, this.configuration.hero_spawn.x, this.configuration.hero_spawn.y)
    }
  }

  loadAssets(p3) {
    p3.load.image("tiles", "../assets/tilesets/32_dungeon_tiles.png");
    p3.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");

    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    //p3.load.multiatlas("atlas", "../assets/atlas/full_atlas.json", "../assets/atlas/sprites",);
    p3.load.atlas({
      key: 'atlas',
      textureURL: '../assets/atlas/full_atlas.png',
      atlasURL: '../assets/atlas/full_atlas.json'
    });

    let sounds = [
      'Attack',
      'Trap 3',
      'Bones Down',
      'Bones Up'
    ];

    sounds.forEach((sound) => {
      p3.load.audio(sound, '../assets/sounds/effects/'+sound+'.mp3');
      this.sounds[sound] = null;
    });

    let music = [
      //'Music TR 3'
    ]

    music.forEach((track) => {
      p3.load.audio(track, '../assets/sounds/music/'+track+'.mp3');
      this.music[track] = null;
    });
  }

  create(p3) {
    Object.keys(this.sounds).forEach((sound) => {
      this.sounds[sound] = p3.sound.add(sound);
    });

    Object.keys(this.music).forEach((track) => {
      this.music[track] = p3.sound.add(track);
    });

    this.cursors = p3.input.keyboard.createCursorKeys();

    Object.values(this.entitySet).forEach((entityClass) => {
      this.addEntityAnimations(p3, entityClass);
    });
    const map = p3.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("32_dungeon", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    this.aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    this.worldLayer.setCollisionByProperty({ collides: true });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    this.aboveLayer.setDepth(10);
    this.worldLayer.setDepth(5);
    this.belowLayer.setDepth(1);

    map.getObjectLayer('Objects').objects.forEach((object) => {
      if (object.properties && object.type == 'room') {
        let properties = {}

        object.properties.forEach((property) => {
          properties[property.name] = property.value;
        });

        this.rooms[properties.name] = object;
        this.rooms[properties.name].entities = {};
      }
    })

    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    map.getObjectLayer('Objects').objects.forEach((object) => {
      if (object.properties && object.type == 'entity') {
        let properties = {}

        object.properties.forEach((property) => {
          properties[property.name] = property.value;
        });

        let type = object.properties.find((property) => property.name === 'type');

        let newEntity = this.createEntity(type.value, properties);

        let physicsBody = this.addEntity(p3, newEntity, object.x, object.y)

        if (type.value == 'player') {
          this.player = newEntity

          const camera = p3.cameras.main;
          camera.startFollow(physicsBody);
          camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        }
      }

    });

    map.getObjectLayer('Objects').objects.forEach((object) => {
      if (object.properties && object.type == 'config') {
        let config = {}

        object.properties.forEach((property) => {
          try {
            config[property.name] = JSON.parse(property.value);
          } catch {
            config[property.name] = property.value;
          }
        });

        let key = config['key'];
        delete config['key'];

        if (config.usePosition) {
          config = {
            x: object.x,
            y: object.y
          }
        }

        this.configuration[key] = config;
      }
    })

  }

  nextEntityId() {
    return this.lastEntityId++;
  }

  createEntity(type, properties) {
    let EntityClass = this.entitySet[type]

    if (EntityClass) {
      let entity = new EntityClass(this, properties);

      return entity;
    }

    throw 'Invalid Entity Type';
  }

  removeEntity(entity) {
    entity.unload();
    entity.physicsBody.destroy();

    if (entity.properties.room_id) {
      delete this.rooms[entity.properties.room_id].entities[entity.id];
    }
    delete this.entities[entity.id];
  }

  addEntity(p3, entity, x, y) {
    if (!entity) { throw 'Invalid Entity'; }

    if (!x || !y) { throw 'Invalid Entity Postion'; }

    let physicsBody = p3.physics.add
            .sprite(x, y, entity.sprite().sheet, entity.sprite().frame)
            .setSize(entity.sprite().size.w, entity.sprite().size.h)
            .setOffset(entity.sprite().offeset.x, entity.sprite().offeset.y);

    entity.setPhysicsBody(physicsBody)
    p3.physics.add.collider(physicsBody, this.worldLayer);

    entity.setId(this.nextEntityId())
    this.entities[entity.id] = entity;

    p3.physics.add.collider(physicsBody, this.worldLayer);

    let collisionEntities = this.taggedEntities(entity.collisionList());

    collisionEntities.forEach((collisionEntity) => {
      if (collisionEntity) {
        if (entity.overlapOnly()) {
          p3.physics.add.overlap(physicsBody, collisionEntity.physicsBody, ((_entityBody, _secondBody) => {
            entity.handleOverlap(p3, collisionEntity);
          }).bind(this));
        } else {
          p3.physics.add.collider(physicsBody, collisionEntity.physicsBody, ((_entityBody, _secondBody) => {
            entity.handleCollision(p3, collisionEntity);
          }).bind(this));
        }
      } else {
        console.log("INVALID COLLISION TAG")
      }
    });

    if (entity.properties.room_id) {
      this.rooms[entity.properties.room_id].entities[entity.id] = entity;
    }

    entity.addedToWorld();

    return physicsBody;
  }

  taggedEntities(tags) {
    return this.entities.filter((entity) => {
      return tags.filter((tag) => entity.hasTag(tag)).length > 0;
    });
  }

  addEntityAnimations(p3, entityClass) {
    const anims = p3.anims;
    entityClass.animations(anims).forEach((animation) => anims.create(animation))
  }

  worldReady(p3) {
    this.heroTime = this.configuration.heroRules.baseHeroTimer;
    this.playTrack('Music TR 3');

    this.readyCallbacks.forEach((callback) => callback(this));
  }

  update(p3, time, delta) {
    if (!this.started) {
      this.started = true;
      this.worldReady(p3);
    }

    Object.values(this.entities).forEach((entity) => entity.worldStep(p3, time, delta))
    Object.values(this.entities).filter((entity) => entity.markedForDeath).forEach((entity) => {
      this.removeEntity(entity);
    })
  }

  unload() {
  }

  playSound(sound) {
    let audio = this.sounds[sound]

    if (audio) {
      audio.play();
    }
  }

  playTrack(track) {
    let audio = this.music[track]

    if (audio) {
      // audio.play();
    }
  }
}

window.world = World
