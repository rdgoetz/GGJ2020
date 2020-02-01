let Entity = window.entity;

class SkeletonSpawn extends Entity {
  init() {
  }

  sprite() {
    return {
      size: {
        w: 30,
        h: 40
      },
      offeset: {
        x: 0,
        y: 24
      },
      sheet: 'atlas',
      frame: 'sword_skelton-0'
    }
  }

  static animations() {
    return [];
  }

  load() {
  }

  render() {
  }

  update(p3, time, delta) {
  }

  unload() {
  }
}

window.skeletonSpawn = SkeletonSpawn;
