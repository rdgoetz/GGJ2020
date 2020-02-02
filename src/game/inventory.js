export default class Inventory {
  constructor() {
    this.items = {}
  }

  add(itemType, amount) {
    amount = amount || 1;

    if (this.items[itemType]) {
      this.items[itemType] += amount;
    } else {
      this.items[itemType] = amount;
    }
  }

  remove(itemType, amount) {
    amount = amount || 1;

    let numberRemoved = 0;

    if (this.items[itemType]) {
      if (this.items[itemType] > numberRemoved) {
        this.items[itemType] -= amount;
        numberRemoved = amount;
      } else {
        numberRemoved = 0
      }
    }

    return numberRemoved;
  }
}
