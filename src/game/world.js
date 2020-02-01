let Player = window.player;
let Skeleton = window.skeleton;

class World {
  constructor(entitySet) {
    this.player = null;
    this.entities = [];
    this.entitySet = entitySet;
    this.cursors = null;

    this.lastEntityId = 0;
  }

  loadAssets(p3) {
    p3.load.image("tiles", "../assets/tilesets/32_dungeon_tiles.png");
    p3.load.tilemapTiledJSON("map", "../assets/tilemaps/tuxemon-town.json");

    // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
    // the player animations (walking left, walking right, etc.) in one image. For more info see:
    //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
    // If you don't use an atlas, you can do the same thing with a spritesheet, see:
    //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
    p3.load.atlas("atlas", "../assets/atlas/atlas.png", "../assets/atlas/atlas.json");

  }

  create(p3) {
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

    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    map.getObjectLayer('Objects').objects.forEach((object) => {
      if (object.properties) {
        let physicsBody = null;
        let spawnProp = object.properties.find((property) => property.name === 'spawns');

        if (spawnProp.value == 'skeleton') {
          physicsBody = this.addEntity(p3, new Skeleton(this), object.x, object.y)
        } else if (spawnProp.value == 'player') {
          this.player = new Player(this)
          physicsBody = this.addEntity(p3, this.player, object.x, object.y)

          const camera = p3.cameras.main;
          camera.startFollow(physicsBody);
          camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        }

        p3.physics.add.collider(physicsBody, this.worldLayer);
      }
    });
  }

  nextEntityId() {
    return this.lastEntityId++;
  }

  addEntity(p3, entity, x, y) {
    let physicsBody = p3.physics.add
            .sprite(x, y, entity.sprite().sheet, entity.sprite().frame)
            .setSize(entity.sprite().size.w, entity.sprite().size.h)
            .setOffset(entity.sprite().offeset.x, entity.sprite().offeset.y);

    entity.setPhysicsBody(physicsBody)

    entity.setId(this.nextEntityId())
    this.entities[entity.id] = entity;

    p3.physics.add.collider(physicsBody, this.worldLayer);

    return physicsBody;
  }

  addEntityAnimations(p3, entityClass) {
    const anims = p3.anims;
    entityClass.animations(anims).forEach((animation) => anims.create(animation))
  }

  update(p3, time, delta) {
    Object.values(this.entities).forEach((entity) => entity.update(p3, time, delta))
  }

  unload() {
  }
}

window.world = World
