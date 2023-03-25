// Set up PixiJS application
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

// Create ground platform
const ground = new PIXI.Graphics();
ground.beginFill(0x5a5a5a);
ground.y = app.view.height - 50;
ground.drawRect(0, 0, app.view.width, 50);
ground.endFill();
app.stage.addChild(ground);

// Create character
const character = new PIXI.Graphics();
character.beginFill(0xff0000);
character.drawRect(0, 0, 50, 50);
character.endFill();
character.x = app.view.width / 2 - 25;
character.y = ground.y - character.height;
app.stage.addChild(character);

// Character movement and physics
const keys = {};
const characterVelocity = { x: 0, y: 0 };
const gravity = 1;
const jumpPower = 20;
let isOnGround = false;

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});
document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});

function update() {
  if (keys["ArrowLeft"]) {
    character.x -= 5;
  }
  if (keys["ArrowRight"]) {
    character.x += 5;
  }

  // Check if character is on the ground
  isOnGround = character.y + character.height >= ground.y - 1;

  // Apply gravity
  if (!isOnGround) {
    characterVelocity.y += gravity;
  } else {
    characterVelocity.y = 0;
  }

  // Limit falling speed
  if (characterVelocity.y > 20) {
    characterVelocity.y = 20;
  }

  // Jump
  if ((keys["Space"] || keys[" "]) && isOnGround) {
    characterVelocity.y = -jumpPower;
  }

  // Apply character velocity
  character.y += characterVelocity.y;

  // Collision with the ground
  if (character.y + character.height > ground.y) {
    character.y = ground.y - character.height;
  }

  requestAnimationFrame(update);
}

update();
