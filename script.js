// ✅ Select Elements
const rat = document.getElementById("rat");
const flower = document.getElementById("flower");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const nextButton = document.getElementById("next-button");

let ratX = 175, ratY = 175;
const speed = 50;
const gameSize = 400;
let score = 5;

// ✅ Messages List
const messages = [
    "collect it baby girl",
    "you are so cool",
    "you are so funny",
    "i appreciate you a lot",
    "BEARSSS <3",
    "ok phew"
];

// ✅ Load Sound
const scurrySound = new Audio("rat.mp3");
scurrySound.volume = 1.0;
scurrySound.playbackRate = 2.5;

function playScurrySound() {
    if (scurrySound.paused || scurrySound.ended) {
        scurrySound.currentTime = 0;
        scurrySound.play().catch(e => console.error("Sound error:", e));
    }
}

// ✅ Position Rat and Flower
rat.style.left = `${ratX}px`;
rat.style.top = `${ratY}px`;

function respawnFlower() {
    if (score > 0) {
        let flowerX = Math.floor(Math.random() * (gameSize - 50));
        let flowerY = Math.floor(Math.random() * (gameSize - 50));
        flower.style.left = `${flowerX}px`;
        flower.style.top = `${flowerY}px`;
    } else {
        flower.style.display = "none";
        nextButton.style.display = "block"; // Show Next Button
    }
}

// ✅ Move Rat Function
function moveRat(direction) {
    if (direction === "ArrowUp" && ratY > 0) ratY -= speed;
    if (direction === "ArrowDown" && ratY < gameSize - 50) ratY += speed;
    if (direction === "ArrowLeft" && ratX > 0) ratX -= speed;
    if (direction === "ArrowRight" && ratX < gameSize - 50) ratX += speed;

    rat.style.left = `${ratX}px`;
    rat.style.top = `${ratY}px`;

    // ✅ Add Animation
    rat.classList.add("scurry");
    setTimeout(() => rat.classList.remove("scurry"), 100);

    playScurrySound();
    checkCollision();
}

// ✅ Check Collision with Flower
function checkCollision() {
    let ratRect = rat.getBoundingClientRect();
    let flowerRect = flower.getBoundingClientRect();

    if (
        ratRect.left < flowerRect.right &&
        ratRect.right > flowerRect.left &&
        ratRect.top < flowerRect.bottom &&
        ratRect.bottom > flowerRect.top
    ) {
        score--;
        scoreDisplay.innerText = `Flowers Left: ${score}`;
        message.innerText = messages[5 - score]; // Update Message

        if (score === 0) {
            message.innerText = messages[5];
        }

        respawnFlower();
    }
}

// ✅ Key Events
document.addEventListener("keydown", (event) => {
    moveRat(event.key);
});

// ✅ Function to Redirect
function goToValentinePage() {
    window.location.href = "valentine.html";
}

// ✅ Initial Flower Placement
respawnFlower();
