
const data = {
  life = 12,
  bones = 0,
  coins = 0,
  powerItem = '',
  timeToHero = 120
}

const state = {
  statusBar = true,
  gameOver = false,
  newHeroAlert = false
}

// Health
const setHealth = (newHp) => {
  data.life = newHp;
  if (data.life <= 0) {
    state.gameOver = true;
  }
}

const changeHealth = (hpChange) => {
  data.life += hpChange;
  if (data.life <= 0) {
    state.gameOver = true;
  }
  else if (data.life > 12) {
    data.life = 12;
  }
}

// Bones
const addBone = () => {
  data.bones++;
}

const spendBones = (bones) => {
  if (bones >= data.bones) {
    data.bones -= bones;
  }
}

// Coins
const addCoins = (coins) => {
  data.coins += coins;
}

const dropCoins = (coins) => {
  if (data.coins >= coins) {
    data.coins -= coins;
  }
}

// Timer
const updateTimer = (newTime) => {
  if (data.timeToHero <= 0) {
    // Display "New hero!"
    // Coroutine ~ 3 sec
  }
  else {
    data.timeToHero = newTime;
  }
}

const showHeroAlert = () => {
  
}