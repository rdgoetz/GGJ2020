export default class StatusBar {
  data = {
    life: 0,
    bones: 0,
    coins: 0,
    powerup: '',
    timeToHero: 120,
    heroAlert: false,
    heroAlertTimer: 0 // time for heroAlertMessage coroutine
  }

  /*
  render() {
    return text(16, 16, 'What a chump', {
      font: "18px monospace",
      fill: "#000000",
      padding: { x: 20, y: 10 },
      backgroundColor: "#ffffff"
    })
    .setScrollFactor(0)
    .setDepth(30);
  }
  */

  // Health
  setHealth = (newHp) => {
    data.life = newHp;
  }

  changeHealth = (hpChange) => {
    data.life += hpChange;
    if (data.life > 12) {
      data.life = 12;
    }
  }

  // Bones
  addBone = () => {
    data.bones++;
  }

  spendBones = (bones) => {
    if (bones >= data.bones) {
      data.bones -= bones;
    }
  }

  // Coins
  addCoins = (coins) => {
    data.coins += coins;
  }

  dropCoins = (coins) => {
    if (data.coins >= coins) {
      data.coins -= coins;
    }
  }

  // Timer
  updateTimer = (newTime) => {
    if (data.timeToHero <= 0) {
      showHeroAlert()
    }
    if (data.heroAlert) {
      updateHeroAlert()
    }
    data.timeToHero = newTime; 
  }

  showHeroAlert = () => {
    data.heroAlert = true;
    data.heroAlertTimer = 5;
  }

  updateHeroAlert = () => {
    if (!data.heroAlert) {
      return;
    }
    else {
      data.heroAlertTimer--;
      if (data.heroAlertTimer <= 0) {
        data.heroAlert = false;
      }
    }
  }

  // chooses whether to display a warning message or the timer
  displayTimer = () => {
    if (data.heroAlert) {
      return 'Warning! New Hero!';
    }
    else {
      return data.timeToHero;
    }
  }

  // Powerups
  setPowerup = (powerup) => {
    data.powerup = powerup
  }

  dropPowerup = () => {
    data.powerup = '';
  }

  // Actual Values being displayed
  /*
  display = {
    enabled: true, // show or hide entire bar
    life: data.life,
    bones: data.bones + "x",
    coins: data.coins + "x",
    powerup: data.powerup,
    timeToHero: displayTimer()
  }
  */
}
