let startTime: number = 10;
let time: number = startTime;
let interval: number | null = null;
let running: boolean = false;

const timerEl = document.getElementById("timer") as HTMLHeadingElement;
const btn = document.getElementById("btn") as HTMLButtonElement;

function updateDisplay(): void {
  timerEl.innerText = time.toString();
}

function toggleTimer(): void {
  if (!running) {
    running = true;
    btn.innerText = "איפוס";

    interval = window.setInterval(() => {
      time--;
      updateDisplay();

      if (time <= 0) {
        window.clearInterval(interval!);
        interval = null;
        running = false;
        time = startTime;
        timerEl.innerText = "נגמר הזמן!";
        btn.innerText = "הפעל";
      }
    }, 1000);

  } else {
    // איפוס
    if (interval !== null) {
      window.clearInterval(interval);
      interval = null;
    }

    running = false;
    time = startTime;
    updateDisplay();
    btn.innerText = "הפעל";
  }
}

// מחברים לכפתור
btn.addEventListener("click", toggleTimer);
