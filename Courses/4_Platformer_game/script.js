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
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
    // ensure that the player stays within the boundaries of the canvas screen
    if (this.position.x < this.width) {
      this.position.x = this.width;
    }
    // ensure that the player's x position will never exceed the right edge of the canvas.
    if (this.position.x >= canvas.width - this.width * 2) {
      this.position.x = canvas.width - this.width * 2;
    }
  }
}
// plaftorm instance
class Platform {
  constructor(x, y) {
    this.position = { x, y };
    this.width = 200;
    this.height = proportionalSize(40);
  }
  draw() {
    ctx.fillStyle = "#acd157";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

// checkpoint instance
class CheckPoint {
  constructor(x, y, z) {
    this.position = { x, y };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
  }
  draw() {
    ctx.fillStyle = "#f1be32";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}

// player instance
const player = new Player();

// platform position
const platformPositions = [
  { x: 500, y: proportionalSize(450) },
  { x: 700, y: proportionalSize(400) },
  { x: 850, y: proportionalSize(350) },
  { x: 900, y: proportionalSize(350) },
  { x: 1050, y: proportionalSize(150) },
  { x: 2500, y: proportionalSize(450) },
  { x: 2900, y: proportionalSize(400) },
  { x: 3150, y: proportionalSize(350) },
  { x: 3900, y: proportionalSize(450) },
  { x: 4200, y: proportionalSize(400) },
  { x: 4400, y: proportionalSize(200) },
  { x: 4700, y: proportionalSize(150) },
];

// list of new platforms
const platforms = platformPositions.map(
  (platform) => new Platform(platform.x, platform.y)
);

// checkpoint position
const checkpointPositions = [
  { x: 1170, y: proportionalSize(80), z: 1 },
  { x: 2900, y: proportionalSize(330), z: 2 },
  { x: 4800, y: proportionalSize(80), z: 3 },
];

// create a list of new checkpoint
const checkpoints = checkpointPositions.map(
  (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
);

const startGame = () => {
  canvas.style.display = "block";
  startScreen.style.display = "none";
  // player.draw();
  animate();
};
// show the checkpoint message
const showCheckpointScreen = (msg) => {
  checkpointScreen.style.display = "block";
  checkpointMessage.textContent = msg;
  if (isCheckpointCollisionDetectionActive) {
    setTimeout(() => {
      checkpointScreen.style.display = "none";
    }, 2000);
  }
};

// moving player across the screen
const animate = () => {
  // update the animation on the screen.
  requestAnimationFrame(animate);
  //  clear the canvas before rendering the next frame of the animation.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the platforms
  platforms.forEach((platform) => {
    platform.draw();
  });

  // draw the checkpoints
  checkpoints.forEach((checkpoint) => {
    checkpoint.draw();
  });

  // update the player's position as it moves
  player.update();

  if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
    player.velocity.x = 5;
  } else if (
    keys.leftKey.pressed &&
    player.position.x > proportionalSize(100)
  ) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }
  if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
    platforms.forEach((platform) => (platform.position.x -= 5));
    checkpoints.forEach((checkpoint) => {
      checkpoint.position.x -= 5;
    });
  } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
    platforms.forEach((platform) => (platform.position.x += 5));
    checkpoints.forEach((checkpoint) => {
      checkpoint.position.x += 5;
    });
  }
  // detect collision between player and platform
  platforms.forEach((platform) => {
    const collisionDetectionRules = [
      player.position.y + player.height <= platform.position.y,
      player.position.y + player.height + player.velocity.y >=
        platform.position.y,
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
    ];
    if (collisionDetectionRules.every((el) => el)) {
      player.velocity.y = 0;
      return;
    }
    const platformDetectionRules = [
      player.position.x >= platform.position.x - player.width / 2,
      player.position.x <=
        platform.position.x + platform.width - player.width / 3,
      player.position.y + player.height >= platform.position.y,
      player.position.y <= platform.position.y + platform.height,
    ];
    if (platformDetectionRules.every((rule) => rule)) {
      player.position.y = platform.position.y + player.height;
      player.velocity.y = gravity;
    }
  });
  // updating animate function to display the checkpoint screen
  checkpoints.forEach((checkpoint, index, checkpoints) => {
    const checkpointDetectionRules = [
      player.position.x >= checkpoint.position.x,
      player.position.y >= checkpoint.position.y,
      player.position.y + player.height <=
        checkpoint.position.y + checkpoint.height,
      isCheckpointCollisionDetectionActive,
      player.position.x - player.width <=
        checkpoint.position.x - checkpoint.width + player.width * 0.9, // claimed checkpoint
      index === 0 || checkpoints[index - 1].claimed === true,
    ];
    if(checkpointDetectionRules.every((rule) => rule)) {
      checkpoint.claim();
      if(index === checkpoints.length - 1){
        isCheckpointCollisionDetectionActive = false;
        showCheckpointScreen("You reached the final checkpoint!");
        movePlayer("ArrowRight", 0, false);
      } else if(player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40){
        showCheckpointScreen("You reached a checkpoint !");
      }
    }
  })
};

// Player movement
const keys = {
  rightKey: {
    pressed: false,
  },
  leftKey: {
    pressed: false,
  },
};

// Responsible for moving the player across the screen.
const movePlayer = (key, xVelocity, isPressed) => {
  if (!isCheckpointCollisionDetectionActive) {
    player.velocity.x = 0;
    player.velocity.y = 0;
    return;
  }
  switch (key) {
    case "ArrowLeft":
      keys.leftKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x -= xVelocity;
      break;
    case "ArrowUp":
    case "Spacebar":
    case " ":
      player.velocity.y -= 8;
      break;
    case "ArrowRight":
      keys.rightKey.pressed = isPressed;
      if (xVelocity === 0) {
        player.velocity.x = xVelocity;
      }
      player.velocity.x += xVelocity;
  }
};

// Even listeners for the player movement
startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", ({ key }) => {
  movePlayer(key, 8, true);
});

window.addEventListener("keyup", ({ key }) => {
  movePlayer(key, 0, false);
});
