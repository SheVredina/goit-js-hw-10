import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  timerElement: document.querySelector('.timer'),
};

let selectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate <= Date.now()) {
      return Notiflix.Report.success('Please choose a date in the future');
    }
  },
};

refs.startBtn.addEventListener('click', () => {
  countDownTimer.start();
});

const countDownTimer = {
  start() {
    refs.startBtn.disabled = true;
    refs.inputEl.disabled = true;

    const startTime = new Date(selectedDate);

    let timer = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);
      updateClockface(time);
      if (deltaTime < 0) {
        clearInterval(timer);
        refs.timerElement.innerHTML = 'Час вийшов!';
      }
    }, 1000);
  },
};

flatpickr(refs.inputEl, options);

function convertMs(deltaTime) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(deltaTime / day));
  const hours = addLeadingZero(Math.floor((deltaTime % day) / hour));
  const minutes = addLeadingZero(
    Math.floor(((deltaTime % day) % hour) / minute)
  );
  const seconds = addLeadingZero(
    Math.floor((((deltaTime % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}
