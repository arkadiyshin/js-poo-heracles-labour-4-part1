class Arena {
  constructor(hero, monsters, size = 10) {
    this.hero = hero
    this.monsters = monsters
    this.size = size
    this.message = JSON.stringify( { x: hero.x, y: hero.y} );
  }

  getDistance(fighter1, fighter2) {
    return Math.sqrt(Math.pow(fighter2.x - fighter1.x, 2) + Math.pow(fighter2.y - fighter1.y, 2)).toFixed(2)
  }

  isTouchable(attacker, defender) {
    return this.getDistance(attacker, defender) <= attacker.getRange()
  }

  // Hero movement managment
  // Gestion du déplacement du héros
  move(direction) {
    /* Your code goes here */
    const oldPosition = {x: this.hero.x, y: this.hero.y}
    const newPosition = {x: this.hero.x, y: this.hero.y}

    switch (direction) {
      case "N":
        newPosition.y-=1;
      break;
      case "S":
        newPosition.y+=1;
      break;
      case "W":
        newPosition.x+=1;
      break;
      case "E":
        newPosition.x-=1;
      break;
    } 
    
    if(this.isMapExit(newPosition)) {
      this.message = 'The map exit';
    } else if(this.isOccupied(newPosition)) {
      this.message = 'The square is occupied';
    } else {
      this.hero.x = newPosition.x;
      this.hero.y = newPosition.y;
      this.message = JSON.stringify(newPosition);
    }
    this.showMessage();

    return oldPosition;
  }

  isMapExit(position) {
    return (position.x < 0 || position.x >= this.size || position.y < 0 || position.y >= this.size);
  }

  isOccupied(position) {
    for(let monster of this.monsters) {
      if(position.x === monster.x && position.y === monster.y) return true;
    }
    return false;
  }

  showMessage() {
    const errorBlock = document.getElementById('error');
    errorBlock.innerText = this.message;
  }
}
