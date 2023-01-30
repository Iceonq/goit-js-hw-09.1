import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let dateToday = new Date();
let selectedDate = new Date();
const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= dateToday.getTime()) {
      window.alert('Please choose a date in the future');
      dataStart.setAttribute('disabled', '');
    } else {
      dataStart.setAttribute('enabled', '');
      selectedDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

const addLeadingZero = value => {
  return value.padStart(2, '0');
};

function convertMs(ms) {
  dateToday = new Date();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.innerHTML = days;
  dataMinutes.innerHTML = addLeadingZero(String(minutes));
  dataHours.innerHTML = addLeadingZero(String(hours));
  dataSeconds.innerHTML = addLeadingZero(String(seconds));
}

dataStart.addEventListener('click', () => {
  const timer = setInterval(() => {
    let timeDifference = selectedDate.getTime() - dateToday.getTime();
    if (timeDifference > 0) {
      convertMs(timeDifference);
      dataStart.setAttribute('disabled', '');
    } else {
      clearInterval(timer);
      Notiflix.Notify.success('Time has ended!');
      dataStart.setAttribute('enabled', '');
    }
  }, 1000);
});
