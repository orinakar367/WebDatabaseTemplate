import { create, get } from "componentUtilities";

var stopperDiv = get("div", "stopperDiv");
var stopperButton = get("button", "stopperButton");
var images1to5Div = get("div", "images1-5");

var seconds = 0;

for (let i = 0; i < 5; i++) {
    let cardImg = create("img", { className: "cardImg", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s" });
    cardImg.onclick = function () {
        cardImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/01_of_spades_A.svg/960px-01_of_spades_A.svg.png";
    }
    images1to5Div.append(cardImg);
}


stopperButton.onclick = function () {
    setInterval(
        function () {
            seconds++;
            stopperDiv.innerText = String(seconds);
        },
        1000
    );
};


