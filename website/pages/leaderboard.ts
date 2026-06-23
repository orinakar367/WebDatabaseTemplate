import { create, get } from "componentUtilities";
import { send } from "clientUtilities";

type LeaderboardEntry = {
    username: string;
    timeInSeconds: number;
    difficulty: string;
};

let leaderboardBody = get("div", "leaderboardBody");
let backButton = get("button", "backButton");

let easyButton = get("button", "easyButton");
let mediumButton = get("button", "mediumButton");
let hardButton = get("button", "hardButton");

let difficulty: "Easy" | "Medium" | "Hard" = "Easy";

loadLeaderboard();

async function loadLeaderboard() {
    leaderboardBody.innerHTML = "";

    let leaderboard = await send<LeaderboardEntry[]>(
        "getLeaderboard",
        difficulty
    );

    for (let i = 0; i < leaderboard.length; i++) {
        let row = create("div", {
            className: "leaderboardRow"
        });

        let placeCell = create("div", {
            className: "cell"
        });
        placeCell.innerText = (i + 1).toString();

        let usernameCell = create("div", {
            className: "cell"
        });
        usernameCell.innerText = leaderboard[i].username;

        let timeCell = create("div", {
            className: "cell"
        });
        timeCell.innerText = formatTime(leaderboard[i].timeInSeconds);

        let difficultyCell = create("div", {
            className: "cell"
        });
        difficultyCell.innerText = leaderboard[i].difficulty;

        row.append(placeCell);
        row.append(usernameCell);
        row.append(timeCell);
        row.append(difficultyCell);

        leaderboardBody.append(row);
    }

    console.log(difficulty);
}

function formatTime(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

easyButton.onclick = function () {
    difficulty = "Easy";
    loadLeaderboard();
};

mediumButton.onclick = function () {
    difficulty = "Medium";
    loadLeaderboard();
};

hardButton.onclick = function () {
    difficulty = "Hard";
    loadLeaderboard();
};

backButton.onclick = function () {
    window.location.href = "index.html";
};