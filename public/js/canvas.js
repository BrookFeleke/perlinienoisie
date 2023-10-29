import { noise, noiseSeed } from "./perlin-noise/index.js";
import { randomIntFromRange, randomColor } from "./utils.js";
import Vector from "./Vector.js";
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// **Global Variables** \
let num = 14000;
let scaleNoise = 0.001;
let angleMult = 10;
let colors = [
  // ["yellow", "blue"],
  ["yellow", "blue", "red", "orange", "black", "grey", "cyan", "peach"],
  ["yellow", "blue", "green", "purple"],
  ["grey", "blue", "green", "black"],
  ["black", "darkgrey"],
  ["cyan", "yellow"],
];

let acc = 2.5;
let backgroundColor = "#222";
let startingStroke = 500;
let frameCount = 0;
// const groupMembers = document.getElementById("members-container");
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const fullScreen = document.getElementById("full-screen-btn");
const closeFullScreen = document.getElementById("close-full-screen");

h1.style.color = colors[randomIntFromRange(0, 4)];
setInterval(() => {
  h1.style.color = colors[randomIntFromRange(0, 4)];
}, 2000);

fullScreen.addEventListener("click", () => {
  // groupMembers.style.display = "none";
  c.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = "none";
  closeFullScreen.style.display = "flex";
  init();
});

closeFullScreen.addEventListener("click", () => {
  groupMembers.style.display = "block";
  c.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth * 0.65;
  canvas.height = window.innerHeight * 0.65;
  closeFullScreen.style.display = "none";
  init();
});

// **Canvas Resize** \

canvas.width = window.innerWidth * 0.65;
canvas.height = window.innerHeight * 0.65;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth * 0.65;
  canvas.height = window.innerHeight * 0.65;

  init();
});
window.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    c.clearRect(0, 0, canvas.width, canvas.height);
    let startingStroke = 500;
    init();

    let milli = new Date().getMilliseconds();
    noiseSeed(milli);
  }
  // do something
});
canvas.addEventListener("dblclick", () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
  init();
  let milli = new Date().getMilliseconds();
  noiseSeed(milli);
});

let particales = [];
class Particale {
  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.prevPos = this.pos.copy();
    this.color = color;
  }

  draw() {
    c.save();
    c.beginPath();
    c.moveTo(this.prevPos.x, this.prevPos.y);
    c.lineTo(this.pos.x, this.pos.y);
    c.strokeStyle = this.color;
    if (frameCount % 10000 == 0 && startingStroke > 3) {
      startingStroke--;
    }
    // if (this.color == "red" || this.color == "grey")
    c.lineWidth = randomIntFromRange(
      startingStroke - startingStroke * 0.25,
      startingStroke
    );
    // c.lineWidth = startingStroke;
    c.stroke();
    c.closePath();
    c.restore();
    this.updatePrev();
    frameCount++;
    // console.log(startingStroke);
  }

  // Keep track of pervious p osition of the Particale
  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  // Keep Particales on Screen
  edges() {
    if (this.pos.x > canvas.width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = canvas.width;
      this.updatePrev();
    }
    if (this.pos.y > canvas.height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = canvas.height;
      this.updatePrev();
    }
  }
}
let rr = randomIntFromRange(0, 4);
// **Init Function** \
function init() {
  frameCount = 0;
  particales = [];
  c.fillStyle = backgroundColor;
  c.globalAlpha = 4;
  c.fillRect(0, 0, canvas.width, canvas.height);
  rr = randomIntFromRange(0, 4);
  const test = ["royalblue", "peach"];
  for (let i = 0; i < num; i++) {
    particales.push(
      new Particale(
        randomIntFromRange(0, canvas.width),
        randomIntFromRange(0, canvas.height),
        randomColor(colors[rr])
      )
    );
  }
}

// **Animation Loop** \
function animate() {
  requestAnimationFrame(animate);

  for (let i = 0; i < particales.length; i++) {
    particales[i].edges();
    particales[i].draw();

    let n = noise(
      particales[i].pos.x * scaleNoise,
      particales[i].pos.y * scaleNoise
    );

    let a = 2 * n * angleMult;
    // let a =  Math.PI *2 * n * angleMult;
    particales[i].pos.x += Math.cos(a) * acc;
    particales[i].pos.y += Math.sin(a) * acc;
  }
}

init();
animate();
document.getElementById("download").addEventListener("click", function (e) {
  // Convert our canvas to a data URL
  let canvasUrl = canvas.toDataURL();
  // Create an anchor, and set the href value to our data URL
  const createEl = document.createElement("a");
  createEl.href = canvasUrl;

  // This is the name of our downloaded file
  createEl.download = `Perlin ${colors[rr][0]} ${colors[rr][1]}  ${Date.now()}`;

  // Click the download button, causing a download, and then remove it
  createEl.click();
  createEl.remove();
});
