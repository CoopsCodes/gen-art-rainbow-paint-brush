/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const button = document.getElementById("button");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.lineWidth = 2;

let drawing = false;
let clearing = false;
let hue = 0;
let saturation = 100;
let lightness = 50;

class Root {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 3 - 2;
    this.speedY = Math.random() * 3 - 2;
    this.maxSize = Math.random() * 7 + 40;
    this.size = Math.random() * 1 + 2;
    this.vs = Math.random() * 0.2 + 0.05; //=> velocity of size
    this.angleX = Math.random() * 6.2;
    this.vaX = Math.random() * 0.6 - 0.3; //=> velocity of angle
    this.angleY = Math.random() * 6.2;
    this.vaY = Math.random() * 0.6 - 0.3; //=> velocity of angle
    this.angle = 0;
  }

  update() {
    this.size += this.vs;
    if (hue < 259.95) {
      hue += 0.05;
    } else {
      hue = 0;
    }

    if (this.size < this.maxSize) {
      this.x += this.speedX + Math.sin(this.angleX);
      this.y += this.speedY + Math.sin(this.angleY);
      this.size += this.vs;
      this.angleX += this.vaX;
      this.angleY += this.vaY;
      this.angle += 0.5;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      //   ctx.fillStyle = "white";
      ctx.fillRect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);

      let double = this.size * 2;
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.strokeRect(0 - double * 2, 0 - double * 2, this.size, this.size);

      requestAnimationFrame(this.update.bind(this));
      ctx.restore();
    }
  }
}

window.addEventListener("mousemove", function (e) {
  if (drawing) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});

window.addEventListener("mousedown", function (e) {
  drawing = true;
  if (drawing) {
    for (let i = 0; i < 5; i++) {
      const root = new Root(e.x, e.y);
      root.update();
    }
  }
});

window.addEventListener("mouseup", function () {
  drawing = false;
});

function clearCanvas(e) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function positionHandler(e) {
  e.preventDefault();
  clearing = false;
  if (clearing !== true) {
    for (let i = 0; i < 3; i++) {
      const root = new Root(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY
      );
      root.update();

      drawing = false;
    }
  }
}

canvas.addEventListener("touchstart", positionHandler, false);
canvas.addEventListener("touchend", positionHandler, false);
canvas.addEventListener("touchmove", positionHandler, false);
