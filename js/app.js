// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Init properties of enemy x,y and sprite
    this.x = x;
    this.y = y + 83/2;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.stepX = 101;
    this.limit = this.stepX * 5;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //If enemy passed canvas boundary
    if (this.x > this.limit) {
      //Reset to start
      this.x = -this.stepX;
      //Change to random speed
      this.speed = 100 + Math.floor(Math.random() * 512);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player class
class Player {
  constructor() {
    //Init properties of player x,y and sprite
    this.sprite = 'images/char-boy.png';
    this.stepX = 101;
    this.stepY = 83;
    this.startX = this.stepX * 2;
    this.startY = (this.stepY * 4) + (this.stepY/2);
    this.x = this.startX;
    this.y = this.startY;
  }

  //Draw player
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  //Update player x and y according to input
  handleInput(input) {
    switch (input) {
      case 'left':
        if (this.x > 0) {
          this.x -= this.stepX;
        }
        break;
      case 'right':
        if (this.x < this.stepX * 4) {
          this.x += this.stepX;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.stepY;
        }
        break;
      case 'down':
        if (this.y < this.stepY * 4) {
          this.y += this.stepY;
        }
        break;
    }
  }

  //Check collision and win
  update() {
    //Check collision
    for(let enemy of allEnemies) {
      if (this.y === enemy.y && (enemy.x + enemy.stepX/2 > this.x && enemy.x < this.x + this.stepX/2)) {
        this.reset();
      }
    }
    //Check win player reach the water
    if (this.y === -this.stepY/2) {
      this.reset();
    }
  }

  //Reset after collision or win
  reset() {
    this.x = this.startX;
    this.y = this.startY;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//New Player object
const player = new Player();
//Init allEnemies array
const allEnemies = [];
const enemyPosition = [0, 83, 166];
let enemy;
//For each enemy create and push Enemy object into array
enemyPosition.forEach(function(posY) {
  enemy = new Enemy(-101, posY, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
