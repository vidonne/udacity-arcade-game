// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //Init properties of enemy x,y and sprite
    this.x = x;
    this.y = y + 83/1.5;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 101;
    this.limit = this.width * 5;
    this.reset = -this.width;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //If enemy not passed canvas boundary
    if (this.x < this.limit) {
      //Move
      this.x += 200 * dt;
    } else {
      //Reset to start
      this.x = this.reset;
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
    this.width = 101;
    this.height = 83;
    this.startX = this.width * 2;
    this.startY = (this.height * 5) - (this.height/3);
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
          this.x -= this.width;
        }
        break;
      case 'right':
        if (this.x < this.width * 4) {
          this.x += this.width;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= this.height;
        }
        break;
      case 'down':
        if (this.y < this.height * 4) {
          this.y += this.height;
        }
        break;
    }
  }
    //Methods
      //Update position
        //Check collision
        //Check win?
      //Render
        //Draw sprite new position
      //Handle keyboard input
        //Update player x and y according to input
      //Reset player
        //Set x and y to starting point
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//New Player object
const player = new Player();
//Init allEnemies array
const enemy1 = new Enemy(-101, 0, 200);
const enemy2 = new Enemy(-101*3, 83, 300);
const enemy3 = new Enemy(-101*2, 83*2, 300);
//For each enemy create and push Enemy object into array
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3);

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
