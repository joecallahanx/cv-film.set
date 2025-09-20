const images = [
  "films/img1.jpg", "films/img2.jpg", "films/img3.jpg", "films/img4.jpg", "films/img5.jpg",
  "films/img6.jpg", "films/img7.jpg", "films/img8.jpg", "films/img9.jpg", "films/img10.jpg",
  "films/img11.jpg", "films/img12.jpg", "films/img13.jpg", "films/img14.jpg", "films/img15.jpg",
  "films/img16.jpg", "films/img17.jpg", "films/img18.jpg", "films/img19.jpg", "films/img20.jpg",
  "films/img21.jpg", "films/img22.jpg", "films/img23.jpg"
];

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");

function getRandomIndex(exclude) {
  let index;
  do {
    index = Math.floor(Math.random() * images.length);
  } while (index === exclude);
  return index;
}

let leftIndex = Math.floor(Math.random() * images.length);
let rightIndex = getRandomIndex(leftIndex);
img1.src = images[leftIndex];
img2.src = images[rightIndex];

img1.addEventListener("click", () => {
  rightIndex = getRandomIndex(leftIndex);
  img2.src = images[rightIndex];
});

img2.addEventListener("click", () => {
  leftIndex = getRandomIndex(rightIndex);
  img1.src = images[leftIndex];
});
