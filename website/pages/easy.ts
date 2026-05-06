import { get } from "componentUtilities";

var stopperDiv = get("div", "stopperDiv");
var stopperButton = get("button", "stopperButton");

var seconds = 0;

stopperButton.onclick = function () {
    setInterval(
        function () {
            seconds++;
            stopperDiv.innerText = String(seconds);
        },
        1000
    );
};


