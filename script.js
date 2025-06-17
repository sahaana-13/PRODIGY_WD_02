let startTime = 0;
let interval;
let running = false;
let elapsed = 0;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

startBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    interval = setInterval(updateTime, 10);
    running = true;
    startBtn.textContent = 'Pause';
    lapBtn.disabled = false;
  } else {
    clearInterval(interval);
    elapsed = Date.now() - startTime;
    running = false;
    startBtn.textContent = 'Start';
    lapBtn.disabled = true;
  }
});

lapBtn.addEventListener('click', () => {
  if (!running) return;
  lapCounter++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCounter}: ${formatTime(elapsed)}`;
  lapList.appendChild(li);
  lapList.scrollTop = lapList.scrollHeight;
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  running = false;
  elapsed = 0;
  lapCounter = 0;
  display.textContent = '00:00:00.000';
  lapList.innerHTML = '';
  startBtn.textContent = 'Start';
  lapBtn.disabled = true;
});

function updateTime() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

function formatTime(ms) {
  let milliseconds = ms % 1000;
  let seconds = Math.floor(ms / 1000) % 60;
  let minutes = Math.floor(ms / 60000) % 60;
  let hours = Math.floor(ms / 3600000);

  return (
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.` +
    `${milliseconds.toString().padStart(3, '0')}`
  );
}

function pad(unit) {
  return unit < 10 ? '0' + unit : unit;
}

// 🌙 Day/Night Theme Toggle
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleThemeBtn.textContent = 
    document.body.classList.contains('dark-mode') ? '☀️ Day Mode' : '🌙 Night Mode';
});
