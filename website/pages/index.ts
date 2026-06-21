import { send } from "clientUtilities";
import { create } from "componentUtilities";
import { get } from "componentUtilities";


let itemInput = get("input", "itemInput") as HTMLInputElement;
let amountInput = get("input", "amountInput") as HTMLInputElement;
let addButton = get("button", "addButton");
let itemsUl = get("ul", "itemsUl");
let logoutBtn = get("button", "logoutBtn");

logoutBtn.onclick = async function() {
  localStorage.removeItem("userToken");
  location.href = "login.html";
}







let leaderboardButton = get("button", "leaderboardButton");

leaderboardButton.onclick = function () {
    window.location.href = "leaderboard.html";
};