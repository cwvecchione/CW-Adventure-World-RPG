class PlayerModel {
  constructor(spawnLocations) {
    tthis.attack = 25;
    this.defense = 10;
    this.health = 150;
    this.maxHealth = 150;
    this.gold = 0;
    this.id = `player-${uuid.v4()}`;
    this.spawnLocations = spawnLocations;
    this.playerItems = {};
    this.maxNumberOfItems = 5;

    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    [this.x, this.y] = location;
  }

  updateGold(gold) {
    this.gold += gold;
  }

  updateHealth(health) {
    this.health += health;
    if (this.health > this.maxHealth) this.health = this.maxHealth;
  }

  playerAttacked(attack) {
    const damage = this.defense - attack;
    this.updateHealth(damage);
  }

  respawn() {
    this.health = this.maxHealth;
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    [this.x, this.y] = location;
  }

  addItem(item) {
    this.playerItems[item.id] = item;
  }
  removeItem(item) {
    delete this.playerItems[item.id];
  }

  canPickupItem() {
if (Object.keys(this.playerItems).length < this.maxNumberOfItems) {
    return true;
  }
    return false;
  }
}