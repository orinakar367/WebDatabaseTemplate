import { create, get } from "componentUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");
let allImagesDiv = get("div", "allimages");
let parsDiv = get("div", "pars");
 let backButton = get("button", "backButton");

let parsCount: number = 0;
var cardsopen=0;
let firstCard: HTMLImageElement | null = null;
let lockBoard= false;
let backImage = "../images/card.png";
let gameStarted = false;

let seconds = 0;
parsDiv.innerText = parsCount.toString();

stopperButton.onclick = function () {
    stopperButton.style.display = "none"; // ✔ מסתיר את הכפתור
    if (!gameStarted) {
        setInterval(function () {
    seconds++;

    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    stopperDiv.innerText = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}, 1000);
        
        gameStarted = true;
    }
};







var pics: string[] = [
    "https://africawildlifesafari.com/wp-content/uploads/2024/03/Zebra-1-768x576.png"
    , "https://a-z-animals.com/media/horse-3.jpg"
    , "https://www.borrowmydoggy.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F4ij0poqn%2Fproduction%2Fe24bfbd855cda99e303975f2bd2a1bf43079b320-800x600.jpg&w=1080&q=80"
    , "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX1CuF5ByhjpYZMllwvBG75hNLw58TW7Dp6Q&s"
    , "https://th-thumbnailer.cdn-si-edu.com/R9oIE9yGcTQQ0f9uOBnarjfmUuw=/1026x684/filters:no_upscale():focal(1542x1697:1543x1698)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/d0/06/d00620a0-8dc9-4be8-a3c1-cd075845b348/42-53008611.jpg"
    ,"https://freshwateraquatica.org/cdn/shop/products/lg_39507_Fantail_Goldfish_Red.jpg?v=1693570381"
    ,"https://cdn.creatureandcoagency.com/uploads/2017/05/rhino-facts-4.jpg"
    ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBcxWjnB4y6XHWjlE-_aM_og3XjEq6bls2g&s"
    ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyEdcdIcB3U0WRTPTeh0l36nzRvU4VD5meg&s"
    ,"https://opensanctuary.org/wp-content/uploads/2020/04/The-Open-Sanctuary-Project-Fun-Facts-Sheep.png"
    ,"https://storage.hidabroot.org/articles/71197_tumb_730X500.jpg"
    ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5myJfKa1lLIcAUhlUbMkcZXHjSn1lftUcVw&s"
    ,"https://upload.wikimedia.org/wikipedia/commons/d/dc/The_Lion_Of_Gir_Forest.jpg"
    ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgqHdkDipVFKACMx42usVWBC7bUefH4SJ-Nw&s"
    ,"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfsz2mcGmFprEuWuXrVv6VWlGLS0iDCXWBLw&s"


]

let indexes = new Array(pics.length * 2).fill(-1);

for (let  i = 0; i < indexes.length;) {
    let place = Math.floor(Math.random() * indexes.length);

    if (indexes[place] == -1) {
        indexes[place] = Math.floor(i / 2);
        i++;
    }
}


for(let i = 0; i <indexes.length; i++) {
let cardImg = create("img", {
    src: backImage,
    className: "cardImg"
});
    
//     let cardImg1 = null;
//     cardImg.onclick = function () {
//         cardImg.src = pics[indexes[i]];
//         cardsopen++;
//         if(cardsopen==2)
//         {
// 1              if(cardImg.src=)
//         }
//     };
cardImg.onclick = function () {
    if (!gameStarted) return; // 🔒 אי אפשר לשחק לפני שהטיימר מתחיל
    if (lockBoard) return;
    if (cardImg === firstCard) return;

    cardImg.src = pics[indexes[i]];
    cardImg.classList.add("openCard");

    cardImg.src = pics[indexes[i]];
    
    cardsopen++;

    if (cardsopen === 1) {
        firstCard = cardImg;
        return;
    }

    if (cardsopen === 2) {

        lockBoard = true;

        if (firstCard && firstCard.src === cardImg.src) {
            console.log("זוג!");

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
        }, 500);

        } 
        else {
    console.log("לא זוג!");

    let first = firstCard;
    let second = cardImg;

    setTimeout(function () {
        if (first != null) {
            first.src = backImage;
            first.style.width = "150px";
            first.classList.remove("openCard");
        }

        second.src = backImage;
        second.style.width = "150px";
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


 parsCount =0;

 backButton.onclick = function () {
    window.location.href = "index.html";
};