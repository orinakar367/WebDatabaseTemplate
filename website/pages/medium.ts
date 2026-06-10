import { create, get } from "componentUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");
let images1to2Div = get("div", "images1-2");
let images3to4Div = get("div", "images3-4");
let images5to6Div = get("div", "images5-6");
let images7to8Div = get("div", "images7-8");
let images9to10Div = get("div", "images9-10");

let gameStarted = false;

let seconds = 0;

stopperButton.onclick = function () {
    if (!gameStarted) {
        setInterval(function () {
            seconds++;
            stopperDiv.innerText = `${seconds}`;
        }, 1000);

        gameStarted = true;
    }
};
