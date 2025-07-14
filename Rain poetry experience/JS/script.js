// Audio setup
const audio = new Audio();
audio.src = "poetry.mp3"; // Replace with actual audio file
audio.volume = document.getElementById("volumeControl").value;

const playBtn = document.getElementById("playBtn");
const volumeControl = document.getElementById("volumeControl");
const verses = document.querySelectorAll(".verse");
const lightning = document.querySelector(".lightning");

// Play button functionality
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "❚❚";
    showVerses();

    // Start lightning strikes randomly during playback
    startLightning();
  } else {
    audio.pause();
    playBtn.innerHTML = "▶";
    clearInterval(lightningInterval);
  }
});

// Volume control
volumeControl.addEventListener("input", () => {
  audio.volume = volumeControl.value;
});

// Show verses line by line
// function showVerses() {
//     let delay = 0;
//     verses.forEach((verse, index) => {
//         setTimeout(() => {
//             verse.classList.add('show');
//         }, delay);
//         delay += 10000; // Show each verse for 3 seconds
//     });
// }
// Show verses line by line with repetition
function showVerses() {
  let delay = 0;
  const repeatCount = 2; // Number of times to repeat the first two lines
  const interval = 10000; // Interval for each line

  // Show first two lines twice
  for (let i = 0; i < repeatCount; i++) {
    setTimeout(() => {
      verses[0].classList.add("show");
    }, delay);
    delay += interval;
    setTimeout(() => {
      verses[1].classList.add("show");
    }, delay);
    delay += interval;
  }
  // Show the next two lines after the first two lines have been shown twice
  setTimeout(() => {
    verses[2].classList.add("show");
  }, delay);
  delay += interval;
  setTimeout(() => {
    verses[3].classList.add("show");
  }, delay);
}

// Reset when audio ends
audio.addEventListener("ended", () => {
  playBtn.innerHTML = "▶";
  verses.forEach((verse) => verse.classList.remove("show"));
  clearInterval(lightningInterval);
});

// Rain effect with canvas
const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];
const rainCount = 200;

class Raindrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.z = Math.random() * 0.5 + 0.5;
    this.len = Math.random() * 20 + 10;
    this.speed = Math.random() * 5 + 5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.thickness = Math.random() * 1 + 1;
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = Math.random() * canvas.height - canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.len);
    ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
    ctx.lineWidth = this.thickness * this.z;
    ctx.stroke();

    // Create splashes
    if (this.y > canvas.height - 20) {
      ctx.beginPath();
      ctx.arc(this.x, canvas.height, Math.random() * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(174, 194, 224, ${Math.random() * 0.3})`;
      ctx.fill();
    }
  }
}

// Initialize raindrops
for (let i = 0; i < rainCount; i++) {
  raindrops.push(new Raindrop());
}

function animateRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw rain streaks
  raindrops.forEach((drop) => {
    drop.update();
    drop.draw();
  });

  requestAnimationFrame(animateRain);
}

// Lightning effect
let lightningInterval;

function startLightning() {
  lightningInterval = setInterval(() => {
    if (Math.random() > 0.9) {
      // 10% chance of lightning
      lightning.classList.add("active");
      setTimeout(() => {
        lightning.classList.remove("active");
      }, 500);
    }
  }, 5000); // Check every 5 seconds
}

// Resize handling
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start animation
animateRain();
