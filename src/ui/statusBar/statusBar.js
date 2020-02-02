export default class StatusBar {
  constructor() {
    this.data = {
      life: 3,
      bones: 0,
      coins: 0,
      powerup: '',
      timeToHero: 120,
      heroAlert: false,
      heroAlertTimer: 0 // time for heroAlertMessage coroutine
    }
    this.display = {
        life: this.data.life,
        timer: this.displayTimer(),
        bones: this.data.bones + "x",
        coins: this.data.coins + "x",
        powerup: this.data.powerup,
    }
  }

  // Health
  setHealth = (newHp) => {
    this.data.life = newHp;
  }

  changeHealth = (hpChange) => {
    this.data.life += hpChange;
    if (this.data.life > 12) {
      this.data.life = 12;
    }
  }

  // Bones
  addBone = () => {
    this.data.bones++;
  }

  spendBones = (bones) => {
    if (bones >= this.data.bones) {
      this.data.bones -= bones;
    }
  }

  // Coins
  addCoins = (coins) => {
    this.data.coins += coins;
  }

  dropCoins = (coins) => {
    if (this.data.coins >= coins) {
      this.data.coins -= coins;
    }
  }

  // Timer
  updateTimer = (newTime) => {
    if (this.data.timeToHero <= 0) {
      showHeroAlert()
    }
    if (this.data.heroAlert) {
      updateHeroAlert()
    }
    this.data.timeToHero = newTime; 
  }

  showHeroAlert = () => {
    this.data.heroAlert = true;
    this.data.heroAlertTimer = 5;
  }

  updateHeroAlert = () => {
    if (!this.data.heroAlert) {
      return;
    }
    else {
      this.data.heroAlertTimer--;
      if (this.data.heroAlertTimer <= 0) {
        this.data.heroAlert = false;
      }
    }
  }

  // chooses whether to display a warning message or the timer
  displayTimer() {
    if (this.data.heroAlert) {
      return 'Warning! New Hero!';
    }
    else {
      return this.data.timeToHero;
    }
  }

  // Powerups
  setPowerup = (powerup) => {
    this.data.powerup = powerup
  }

  dropPowerup = () => {
    this.data.powerup = '';
  }

  // Actual Values being displayed


}
