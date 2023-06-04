const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
let timerId = null;

buttonStartEl.addEventListener('click', function () {
  timerId = setInterval(getRandomHexColor, 1000);
  buttonStartEl.disabled = true;
  buttonStopEl.disabled = false;

});

buttonStopEl.addEventListener('click', function () {
  clearInterval(timerId);
  buttonStopEl.disabled = true;
  buttonStartEl.disabled = false;

});

function getRandomHexColor() {
  anyColor = document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
  return anyColor;
}
