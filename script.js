//your code here
const images = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
];

let selectedImages = [];
let selectedElements = [];

function shuffleImages() {
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const imageList = [...images];
  imageList.push(images[duplicateIndex]);

  // Shuffle
  for (let i = imageList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imageList[i], imageList[j]] = [imageList[j], imageList[i]];
  }

  return imageList;
}

function createTiles() {
  const container = document.getElementById("image-container");
  const shuffled = shuffleImages();
  shuffled.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = `./images/${src}`;
    img.classList.add("tile");
    img.dataset.src = src;

    img.addEventListener("click", () => handleTileClick(img));

    container.appendChild(img);
  });
}

function handleTileClick(img) {
  if (selectedImages.length >= 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selectedImages.push(img.dataset.src);
  selectedElements.push(img);

  document.getElementById("reset").style.display = "inline";

  if (selectedImages.length === 2) {
    document.getElementById("verify").style.display = "inline";
  }
}

function resetSelection() {
  selectedImages = [];
  selectedElements.forEach(el => el.classList.remove("selected"));
  selectedElements = [];

  document.getElementById("verify").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("para").textContent = "";
}

function verifySelection() {
  const message = document.getElementById("para");
  if (selectedImages[0] === selectedImages[1]) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  document.getElementById("verify").style.display = "none";
}

document.getElementById("reset").addEventListener("click", () => {
  resetSelection();
});

document.getElementById("verify").addEventListener("click", () => {
  verifySelection();
});

window.onload = () => {
  createTiles();
};
