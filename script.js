const clickSound = document.getElementById("clickSound");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

document.querySelectorAll(".project-header").forEach(h => {
  h.addEventListener("click", () => {
    playClick();
    h.nextElementSibling.classList.toggle("open");
  });
});

document.querySelectorAll(".season-header").forEach(h => {
  h.addEventListener("click", () => {
    playClick();
    h.nextElementSibling.classList.toggle("open");
  });
});

const container = document.querySelector(".falling-container");

const images = [
  "img/snowball.png",
  "img/grassblock.png",
  "img/creeper.png"
]; // 👈 ảnh bạn muốn rơi

function spawnFallingImage() {
  const img = document.createElement("img");
  img.src = images[Math.floor(Math.random() * images.length)];
  img.className = "falling-item";

  img.style.left = Math.random() * 100 + "vw";
  img.style.animationDuration = 6 + Math.random() * 6 + "s";
  img.style.setProperty("--drift", (Math.random() * 100 - 50) + "px");

  container.appendChild(img);

  setTimeout(() => img.remove(), 12000);
}

setInterval(spawnFallingImage, 400);

const bgImages = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg"
];

const bgA = document.querySelector(".bg-a");
const bgB = document.querySelector(".bg-b");

let showingA = true;
let lastIndex = -1;

function getRandomBg() {
  let i;
  do {
    i = Math.floor(Math.random() * bgImages.length);
  } while (i === lastIndex);
  lastIndex = i;
  return bgImages[i];
}

function switchBackground() {
  const nextBg = getRandomBg();

  if (showingA) {
    bgB.style.backgroundImage = `url('${nextBg}')`;
    bgB.style.opacity = "1";
    bgA.style.opacity = "0";
  } else {
    bgA.style.backgroundImage = `url('${nextBg}')`;
    bgA.style.opacity = "1";
    bgB.style.opacity = "0";
  }

  showingA = !showingA;
}

// nền đầu tiên
bgA.style.backgroundImage = `url('${getRandomBg()}')`;

// đổi mỗi 3 giây
setInterval(switchBackground, 6000);


const bgMusic = document.getElementById("bgMusic");
let bgStarted = false;

function tryPlayBgMusic() {
  if (bgStarted) return;

  bgMusic.volume = 0.25;
  bgMusic.play()
    .then(() => {
      bgStarted = true;
      console.log("🎵 Background music started");
    })
    .catch(err => {
      console.log("❌ Music blocked:", err);
    });
}

// BẤT KỲ tương tác nào cũng kích hoạt
["click", "keydown", "touchstart"].forEach(evt => {
  document.addEventListener(evt, tryPlayBgMusic, { once: true });
});

