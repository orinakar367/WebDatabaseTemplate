import { create, get } from "componentUtilities";
import { send } from "clientUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");
let allImagesDiv = get("div", "allimages");
let parsDiv = get("div", "pars");
let backButton = get("button", "backButton");
let youwon = get("div", "youWon");

let parsCount: number = 0;
let token = localStorage.getItem("userToken");

let cardsopen = 0;
let firstCard: HTMLImageElement | null = null;
let lockBoard = false;

let backImage = "../images/card.png";
let gameStarted = false;
let difficulty = "Easy";

let seconds = 0;
let timer: ReturnType<typeof setInterval> | null = null;

let cardsLeft: number;

youwon.style.visibility = "hidden";
parsDiv.innerText = parsCount.toString();

/* ================= TIMER ================= */

stopperButton.onclick = function () {
    stopperButton.style.display = "none";

    if (!gameStarted) {
        timer = setInterval(function () {
            seconds++;

            let minutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;

            stopperDiv.innerText =
                `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
        }, 1000);

        gameStarted = true;
    }
};

/* ================= CARDS ================= */

var pics: string[] = [
    "https://africawildlifesafari.com/wp-content/uploads/2024/03/Zebra-1-768x576.png",
    "https://a-z-animals.com/media/horse-3.jpg",
    "https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fe24bfbd855cda99e303975f2bd2a1bf43079b320-800x600.jpg&w=1080&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1CuF5ByhjpYZMllwvBG75hNLw58TW7Dp6Q&s",
    "https://th-thumbnailer.cdn-si-edu.com/R9oIE9yGcTQQ0f9uOBnarjfmUuw=/1026x684/filters:no_upscale():focal(1542x1697:1543x1698)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d0/06/d00620a0-8dc9-4be8-a3c1-cd075845b348/42-53008611.jpg"
];

let indexes = new Array(pics.length * 2).fill(-1);

for (let i = 0; i < indexes.length;) {
    let place = Math.floor(Math.random() * 10);

    if (indexes[place] == -1) {
        indexes[place] = Math.floor(i / 2);
        i++;
    }
}

cardsLeft = indexes.length;

/* ================= GAME LOOP ================= */

for (let i = 0; i < indexes.length; i++) {

    let cardImg = create("img", {
        src: backImage,
        className: "cardImg"
    });

    cardImg.onclick = function () {

        if (!gameStarted) return;
        if (lockBoard) return;
        if (cardImg === firstCard) return;

        cardImg.src = pics[indexes[i]];
        cardImg.classList.add("openCard");

        cardsopen++;

        if (cardsopen === 1) {
            firstCard = cardImg;
            return;
        }

        if (cardsopen === 2) {

            lockBoard = true;

            if (firstCard && firstCard.src === cardImg.src) {

                let first = firstCard;
                let second = cardImg;

                setTimeout(function () {

                    first.classList.remove("openCard");
                    second.classList.remove("openCard");

                    first.classList.add("matchedCard");
                    second.classList.add("matchedCard");

                    cardsopen = 0;
                    firstCard = null;
                    lockBoard = false;

                    parsCount++;
                    parsDiv.innerText = parsCount.toString();

                    cardsLeft -= 2;

                    if (cardsLeft === 0) {
                        handleWin();
                    }

                }, 500);

            } else {

                let first = firstCard;
                let second = cardImg;

                setTimeout(function () {

                    if (first != null) {
                        first.src = backImage;
                        first.classList.remove("openCard");
                    }

                    second.src = backImage;
                    second.classList.remove("openCard");

                    cardsopen = 0;
                    firstCard = null;
                    lockBoard = false;

                }, 1000);
            }
        }
    };

    allImagesDiv.append(cardImg);
}

/* ================= WIN HANDLER (FIX ONLY) ================= */

async function handleWin() {

    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }

    youwon.innerText = "you won in " + seconds + " seconds!";
    youwon.style.visibility = "visible";

    // 🔥 FIX: היה "token" וזה שבר הכל
    token = localStorage.getItem("userToken");

    console.log("Sending win request...");

    if (token != null) {
        try {
            let result = await send<boolean>(
                "userWon",
                seconds,
                difficulty,
                token
            );

            console.log("Game result saved:", result);
        }
        catch (err) {
            console.log("ERROR sending win:", err);
        }
    }
    else {
        console.log("No token found");
    }
}

/* ================= BACK BUTTON ================= */

backButton.onclick = function () {
    window.location.href = "index.html";
};