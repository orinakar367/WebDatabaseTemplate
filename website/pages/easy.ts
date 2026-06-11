import { create, get } from "componentUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");
let allImagesDiv = get("div", "allimages");

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

// var cards: any[]=
// [    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
//     ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s"
// ]





var pics: string[] = [
    "https://africawildlifesafari.com/wp-content/uploads/2024/03/Zebra-1-768x576.png"
    , "https://a-z-animals.com/media/horse-3.jpg"
    , "https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fe24bfbd855cda99e303975f2bd2a1bf43079b320-800x600.jpg&w=1080&q=80"
    , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1CuF5ByhjpYZMllwvBG75hNLw58TW7Dp6Q&s"
    , "https://th-thumbnailer.cdn-si-edu.com/R9oIE9yGcTQQ0f9uOBnarjfmUuw=/1026x684/filters:no_upscale():focal(1542x1697:1543x1698)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d0/06/d00620a0-8dc9-4be8-a3c1-cd075845b348/42-53008611.jpg"

]

let indexes = new Array(pics.length * 2).fill(-1);

for (let  i = 0; i < indexes.length;) {
    let place = Math.floor(Math.random() * 10);

    if (indexes[place] == -1) {
        indexes[place] = Math.floor(i / 2);
        i++;
    }
}



// for (let i = 0; i < indexes.length; i++) {
//     cards[i] = pics[indexes[i]];
// }

// for(var j=0 ;j< pics.length; j++ ){
//         pics[indexes[j]]=pics[j]
// }

for(let i = 0; i <indexes.length; i++) {
    let cardImg = create("img", { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlXY0YRlBOQZUyNw3Rz49lQSWrIVPkmmTcPg&s", className: "cardImg" });
    cardImg.onclick = function () {
        cardImg.src = pics[indexes[i]];git config --global user.name _
    };

    allImagesDiv.append(cardImg);
}
