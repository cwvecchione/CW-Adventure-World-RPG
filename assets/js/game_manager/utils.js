const SpawnerType = {
  MONSTER: 'MONSTER',
  CHEST: 'CHEST',
  ITEM: 'ITEM',
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}
