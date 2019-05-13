//create a varible to save the size of the square of the grid size.
let GridSize = 100;
// Enemies our player must avoid
//var Enemy = function() {
function Enemy(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  //assign the valuse from the parameter to the values of the class
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  this.update = function(dt) {
    // make the value of variable dt constant 0.5 to ensure that all the enemies translate with same speed
    // And effect on same new position without cange the speed in diffrent position.
    dt = 0.5;
    this.x = dt + this.x
    // if the enemy reach to end of the canvas it will return to the begin of the canvas.
    if (this.x === 505) {
      this.x = -100;
    }

  };
  // Draw the enemy on the screen, required method for game
  this.render = function() {
    //source from https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
    let img = new Image(); //creates a variable for the new image and make the source of it is the sprite.
    img.src = this.sprite;
    ctx.drawImage(img, this.x, this.y);
  };

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function player(x, y) {
  //assign the valuse from the parameter to the values of the class
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-horn-girl.png';
  // This function to update the new posion of the player.
  this.update = function() {
    this.x = this.x;
    this.y = this.y;
  };
  // This function is to redraw the player with the new position.
  this.render = function() {
    //source from https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
    let img = new Image(); //creates a variable for the new image and make the source of it is the sprite.
    img.src = this.sprite;
    ctx.drawImage(img, this.x, this.y);
  };
  /*
  This function used if the player moved up
  it take the old positon of y and subtract it from the square(of the grid size)
  if the position of y reach to new position outside the canvas will not change it.
  */
  this.moveUp = function() {
    let newPosY = this.y - GridSize;
    //if the player reach to some new position will edit it to make it in the middle of the squares.
    if (newPosY === 101 || newPosY === 102) {
      newPosY += 39;
    }
    if (newPosY === 79) {
      newPosY -= 39;
    }
    if (newPosY === -60) {
      newPosY = -20;
    }
    //if reach outside the canvas will not change.
    if (!(newPosY <= -60))
      this.y = newPosY;
  };
  /*
  This function used if the player moved down
  it take the old positon of y and add it with the size of the square(of the grid size)
  if the position of y reach to new position outside the canvas will not change it.
  */
  this.moveDown = function() {
    let newPosY = this.y + GridSize;
    //if the player reach to some new position will edit it to make it in the middle of the squares.
    if (newPosY === 80) {
      newPosY -= 39;
    }
    if (newPosY === 241 || newPosY === 240) {
      newPosY -= 39;
    }
    //if reach outside the canvas will not change.
    if (!(newPosY >= 405))
      this.y = newPosY;
  };
  /*
  This function used if the player moved right
  it take the old positon of x and add it with the size of the square(of the grid size)
  if the position of x reach to new position outside the canvas will not change it.
  */
  this.moveRight = function() {
    let newPosX = this.x + GridSize;
    //if reach outside the canvas will not change.
    if (!(newPosX >= 500))
      this.x = newPosX;
  };
  /*
  This function used if the player moved left
  it take the old positon of x and subtract it from the square(of the grid size)
  if the position of x reach to new position outside the canvas will not change it.
  */
  this.moveLeft = function() {
    let newPosX = this.x - GridSize;
    if (!(newPosX <= 0))
      this.x = newPosX;
  };
  //This function used for handle the key that presed it the player to call the appropriate function.
  this.handleInput = function(key) {
    switch (key) {
      case 'left':
        this.moveLeft();
        break;
      case 'up':
        this.moveUp();
        break;
      case 'right':
        this.moveRight();
        break;
      case 'down':
        this.moveDown();
        break;
    }
  };

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
  new Enemy(-500, 60),
  new Enemy(-200, 60),
  new Enemy(1, 140),
  new Enemy(-400, 140),
  new Enemy(-100, 220),
  new Enemy(-300, 220)

];
// Place the player object in a variable called player
var player = new player(201, 401);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  // send to function handleInput the key that presed the player.
  player.handleInput(allowedKeys[e.keyCode]);
});
