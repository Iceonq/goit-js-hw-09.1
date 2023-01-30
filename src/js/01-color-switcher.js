function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector(`[data-stop]`);
const documentBackground = document.querySelector('body');
let timer;

stopButton.setAttribute('disabled', '');
startButton.addEventListener('click', () => {
  startButton.setAttribute('disabled', '');
  stopButton.removeAttribute('disabled', '');
  timer = setInterval(() => {
    colorRandomized = getRandomHexColor();
    documentBackground.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
});
//
stopButton.addEventListener('click', () => {
  clearInterval(timer);
  startButton.removeAttribute('disabled', '');
  stopButton.setAttribute('disabled', '');
});
