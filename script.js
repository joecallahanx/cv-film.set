// Elo K-factor
const K = 32;

// Load database from LocalStorage or create default
let database = JSON.parse(localStorage.getItem("eloDatabase")) || {
  "films/img1.jpg": 1400,
  "films/img2.jpg": 1400,
  "films/img3.jpg": 1400,
  "films/img4.jpg": 1400,
  "films/img5.jpg": 1400,
  "films/img6.jpg": 1400,
  "films/img7.jpg": 1400,
  "films/img8.jpg": 1400,
  "films/img9.jpg": 1400,
  "films/img10.jpg": 1400,
  "films/img11.jpg": 1400,
  "films/img12.jpg": 1400,
  "films/img13.jpg": 1400,
  "films/img14.jpg": 1400,
  "films/img15.jpg": 1400,
  "films/img16.jpg": 1400,
  "films/img17.jpg": 1400,
  "films/img18.jpg": 1400,
  "films/img19.jpg": 1400,
  "films/img20.jpg": 1400,
  "films/img21.jpg": 1400,
  "films/img22.jpg": 1400,
  "films/img23.jpg": 1400
};

function saveDatabase() {
  localStorage.setItem("eloDatabase", JSON.stringify(database));
}

const images = Object.keys(database);
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const heading = document.querySelector(".heading");

let picksDone = 0;
const picksPerRound = 12;

// Ensure different starting images
let leftIndex = Math.floor(Math.random() * images.length);
let rightIndex = getRandomIndex(leftIndex, -1);

function getRandomIndex(exclude1, exclude2) {
  let index;
  do {
    index = Math.floor(Math.random() * images.length);
  } while (index === exclude1 || index === exclude2);
  return index;
}

function getExpectedScore(ratingA, ratingB) {
  return 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
}

function updateRatings(database, winnerId, loserId) {
  let ratingA = database[winnerId];
  let ratingB = database[loserId];

  let expectedA = getExpectedScore(ratingA, ratingB);
  let expectedB = getExpectedScore(ratingB, ratingA);

  database[winnerId] = Math.round(ratingA + K * (1 - expectedA));
  database[loserId] = Math.round(ratingB + K * (0 - expectedB));
}

function updateImages() {
  img1.src = images[leftIndex];
  img2.src = images[rightIndex];
  heading.textContent = `Pick ${picksDone + 1} of ${picksPerRound}`;
}

function showLeaderboard() {
  const leaderboard = document.createElement("div");
  leaderboard.id = "leaderboard";
  leaderboard.style.marginTop = "30px";
  leaderboard.style.textAlign = "center";

  const title = document.createElement("h2");
  title.textContent = "Top 3 Films";
  leaderboard.appendChild(title);

  // Sort database by rating descending and take top 3
  const sorted = Object.entries(database)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  sorted.forEach(([img, rating], idx) => {
    const entry = document.createElement("p");

    // Remove "films/" prefix and ".jpg" extension
    const displayName = img.replace("films/", "").replace(".jpg", "");

    entry.textContent = `${idx + 1}. ${displayName} - ${rating}`;
    leaderboard.appendChild(entry);
  });

  document.body.appendChild(leaderboard);

  // Add Next Round button
  const btn = document.createElement("button");
  btn.textContent = "Next Round";
  btn.style.fontSize = "20px";
  btn.style.padding = "10px 20px";
  btn.style.marginTop = "20px";
  btn.id = "nextRound";
  leaderboard.appendChild(btn);

  btn.addEventListener("click", () => {
    picksDone = 0;
    leftIndex = Math.floor(Math.random() * images.length);
    rightIndex = getRandomIndex(leftIndex, -1);

    img1.style.display = "inline";
    img2.style.display = "inline";
    heading.style.display = "block";

    leaderboard.remove(); // hide leaderboard
    updateImages();
  });
}

function handlePick(winner, loser, winnerIndex, loserIndex) {
  updateRatings(database, images[winnerIndex], images[loserIndex]);
  picksDone++;
  saveDatabase();

  if (picksDone >= picksPerRound) {
    img1.style.display = "none";
    img2.style.display = "none";
    heading.style.display = "none";
    showLeaderboard();
  } else {
    if (winner === "left") {
      rightIndex = getRandomIndex(leftIndex, rightIndex);
    } else {
      leftIndex = getRandomIndex(leftIndex, rightIndex);
    }
    updateImages();
  }
}

img1.addEventListener("click", () => handlePick("left", "right", leftIndex, rightIndex));
img2.addEventListener("click", () => handlePick("right", "left", leftIndex, rightIndex));

// Start
updateImages();
