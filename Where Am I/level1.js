// level1.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 1024; // Increased width
canvas.height = 768; // Increased height

const penguinImageLeft = new Image(); // Image facing left
const penguinImageRight = new Image(); // Image facing right

// Load images using relative paths from the 'Where Am I' directory
const itemFilenames = [
  'pixil-frame-0(3).png',
  'pixil-frame-0(4).png',
  'pixil-frame-0(5).png',
  'pixil-frame-0(6).png',
  'pixil-frame-0(7).png',
  'pixil-frame-0(9).png',
  'pixil-frame-0(10).png',
  'pixil-frame-0(11).png',
  // Add any other item images here
];

const itemsToCollect = itemFilenames.map(filename => ({
  img: new Image(),
  x: Math.random() * canvas.width,  // Random x position - adjust as needed
  y: Math.random() * canvas.height, // Random y position - adjust as needed
  collected: false
}));

// Set onload for all item images
let itemsLoaded = 0;
const totalItems = itemsToCollect.length; // Total number of items to load
itemsToCollect.forEach((item, index) => {
  item.img.onload = () => {
    itemsLoaded++;
    if (itemsLoaded === totalItems) {
      // When all items are loaded, we load the penguin images
      penguinImageRight.onload = () => {
        penguinImageLeft.onload = startGame;
        penguinImageLeft.src = 'items/pixil-frame-0(8).png'; // Left-facing penguin
      };
      penguinImageRight.src = 'items/pixil-frame-0(right).png'; // Right-facing penguin
    }
  };
  item.img.src = `items/${itemFilenames[index]}`; // Set the correct src for each item image
});

const penguin = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 40,
  height: 40,
  image: penguinImageRight // Start with the penguin facing right
};

const keysPressed = {
  up: false,
  down: false,
  left: false,
  right: false
};

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'ArrowUp': keysPressed.up = true; break;
    case 'ArrowDown': keysPressed.down = true; break;
    case 'ArrowLeft':
      keysPressed.left = true;
      penguin.image = penguinImageLeft; // Change image when facing left
      break;
    case 'ArrowRight':
      keysPressed.right = true;
      penguin.image = penguinImageRight; // Change image when facing right
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case 'ArrowUp': keysPressed.up = false; break;
    case 'ArrowDown': keysPressed.down = false; break;
    case 'ArrowLeft': keysPressed.left = false; break;
    case 'ArrowRight': keysPressed.right = false; break;
  }
});

function updatePenguinPosition() {
  const penguinSpeed = 2;
  if (keysPressed.up) penguin.y -= penguinSpeed;
  if (keysPressed.down) penguin.y += penguinSpeed;
  if (keysPressed.left) penguin.x -= penguinSpeed;
  if (keysPressed.right) penguin.x += penguinSpeed;

  penguin.x = Math.max(0, Math.min(penguin.x, canvas.width - penguin.width));
  penguin.y = Math.max(0, Math.min(penguin.y, canvas.height - penguin.height));
}

function drawPenguin() {
  ctx.drawImage(penguin.image, penguin.x, penguin.y, penguin.width, penguin.height);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePenguinPosition();
  drawPenguin();

  itemsToCollect.forEach(item => {
    if (!item.collected) {
      ctx.drawImage(item.img, item.x, item.y);
    }
  });

  drawLightingEffect();
  requestAnimationFrame(draw);
}

function drawLightingEffect() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = 'destination-out';
  const lightRadius = 100;
  const radialGradient = ctx.createRadialGradient(
    penguin.x + penguin.width / 2,
    penguin.y + penguin.height / 2,
    0,
    penguin.x + penguin.width / 2,
    penguin.y + penguin.height / 2,
    lightRadius
  );

  radialGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  radialGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(penguin.x + penguin.width / 2, penguin.y + penguin.height / 2, lightRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = 'source-over';
}

function startGame() {
  if (itemsLoaded === totalItems) {
    requestAnimationFrame(draw);
  }
}

// We no longer need to call draw here, as it's called after all images have loaded
