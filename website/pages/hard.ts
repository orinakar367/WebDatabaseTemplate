import { get } from "componentUtilities";

let stopperDiv = get("div", "stopperDiv");
let stopperButton = get("button", "stopperButton");

let seconds = 0;

stopperButton.onclick = function () {
    setInterval(
        function () {
            seconds++;
            stopperDiv.innerText = String(seconds);
        },
        1000
    );
};
