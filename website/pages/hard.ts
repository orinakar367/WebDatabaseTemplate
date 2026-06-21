import { create, get } from "componentUtilities";
import { send } from "clientUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");
let allImagesDiv = get("div", "allimages");
let parsDiv = get("div", "pars");
let backButton = get("button", "backButton");
let youwon = get("div", "youWon");

let parsCount: number = 0;

// 🔥 חשוב: אותו מפתח כמו בלוגין שלך
let token = localStorage.getItem("userToken");

let cardsopen = 0;
let firstCard: HTMLImageElement | null = null;
let lockBoard = false;

let backImage = "../images/card.png";
let gameStarted = false;

// 🔥 HARD
let difficulty = "Hard";

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

/* ================= HARD PICS ================= */

var pics: string[] = [
    "https://africawildlifesafari.com/wp-content/uploads/2024/03/Zebra-1-768x576.png",
    "https://a-z-animals.com/media/horse-3.jpg",
    "https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fe24bfbd855cda99e303975f2bd2a1bf43079b320-800x600.jpg&w=1080&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1CuF5ByhjpYZMllwvBG75hNLw58TW7Dp6Q&s",
    "https://th-thumbnailer.cdn-si-edu.com/R9oIE9yGcTQQ0f9uOBnarjfmUuw=/1026x684/filters:no_upscale():focal(1542x1697:1543x1698)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d0/06/d00620a0-8dc9-4be8-a3c1-cd075845b348/42-53008611.jpg",
    "https://cdn.creatureandcoagency.com/uploads/2017/05/rhino-facts-4.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBcxWjnB4y6XHWjlE-_aM_og3XjEq6bls2g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyEdcdIcB3U0WRTPTeh0l36nzRvU4VD5meg&s",
    "https://opensanctuary.org/wp-content/uploads/2020/04/The-Open-Sanctuary-Project-Fun-Facts-Sheep.png",
    "https://upload.wikimedia.org/wikipedia/commons/d/dc/The_Lion_Of_Gir_Forest.jpg"
];

/* ================= INDEXES ================= */

let indexes = new Array(pics.length * 2).fill(-1);

for (let i = 0; i < indexes.length;) {
    let place = Math.floor(Math.random() * indexes.length);

    if (indexes[place] == -1) {
        indexes[place] = Math.floor(i / 2);
        i++;
    }
}

cardsLeft = indexes.length;

/* ================= GAME ================= */

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

                setTimeout(function () {

                    firstCard!.classList.remove("openCard");
                    cardImg.classList.remove("openCard");

                    firstCard!.classList.add("matchedCard");
                    cardImg.classList.add("matchedCard");

                    firstCard = null;
                    cardsopen = 0;
                    lockBoard = false;

                    parsCount++;
                    parsDiv.innerText = parsCount.toString();

                    cardsLeft -= 2;

                    if (cardsLeft === 0) {
                        handleWin();
                    }

                }, 350);

            } else {

                setTimeout(function () {

                    firstCard!.src = backImage;
                    cardImg.src = backImage;

                    firstCard!.classList.remove("openCard");
                    cardImg.classList.remove("openCard");

                    firstCard = null;
                    cardsopen = 0;
                    lockBoard = false;

                }, 700);
            }
        }
    };

    allImagesDiv.append(cardImg);
}

/* ================= WIN ================= */

async function handleWin() {

    if (timer != null) {
        clearInterval(timer);
        timer = null;
    }

    youwon.innerText = "YOU WON IN " + seconds + " SECONDS! 🔥";
    youwon.style.visibility = "visible";

    token = localStorage.getItem("userToken");

    console.log("Sending win request...");

    if (token != null) {
        try {
            await send<boolean>(
                "userWon",
                seconds,
                difficulty,
                token
            );

            console.log("Saved HARD result to DB");
        }
        catch (err) {
            console.log("DB error:", err);
        }
    }
    else {
        console.log("No token found");
    }
}

/* ================= BACK ================= */

backButton.onclick = function () {
    window.location.href = "index.html";
};