import { create, get } from "componentUtilities";
import { send } from "clientUtilities";

type LeaderboardEntry = {
    username: string;
    timeInSeconds: number;
    difficulty: string;
};

let leaderboardBody = get("div", "leaderboardBody");
let backButton = get("button", "backButton");

let difficulty: "Easy" | "Medium" | "Hard" = "Easy";

loadLeaderboard();

/* ================= LOAD ================= */

async function loadLeaderboard() {

    leaderboardBody.innerHTML = "";

    const leaderboard = await send<LeaderboardEntry[]>(
        "getLeaderboard",
        difficulty
    );

    for (let i = 0; i < leaderboard.length; i++) {

        let row = create("div", {
            className: "leaderboardRow"
        });

        let name = create("div", {
            className: "cell"
        });
        name.innerText = leaderboard[i].username;

        let time = create("div", {
            className: "cell"
        });
        time.innerText = formatTime(leaderboard[i].timeInSeconds);

        row.append(name);
        row.append(time);

        leaderboardBody.append(row);
    }
}

/* ================= FORMAT ================= */

function formatTime(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let remaining = seconds % 60;

    return `${minutes}:${remaining < 10 ? "0" : ""}${remaining}`;
}

/* ================= DIFFICULTY SWITCH ================= */

(window as any).setDifficulty = function (mode: "Easy" | "Medium" | "Hard") {
    difficulty = mode;
    loadLeaderboard();
};

/* ================= BACK ================= */

backButton.onclick = function () {
    window.location.href = "index.html";
};