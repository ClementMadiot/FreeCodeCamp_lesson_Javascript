const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");
const checkpointMessage = document.querySelector(".checkpoint-screen > p");
// console.log(checkpointMessage)

const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;
let isCheckpointCollisionDetectionActive = true;

// size of element
const proportionalSize = (size) => {
  return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;
};

// characteristics of the player
class Player {
  constructor() {
    // the proportionalSize function make sure that the player's position is always proportional to the screen size.
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    // The velocity property store the player's speed in the x and y directions.
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
    // proportionalSize() function set the width & height properties of your class to be proportional to the height of the screen.
  }
  draw() {
    ctx.fillStyle = "#99c9ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      if(this.position.y < 0){
        this.position.y = 0
        this.velocity.y = gravity
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
