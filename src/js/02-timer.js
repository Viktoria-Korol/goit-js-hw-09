

// Import library
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  timePickerInput: document.getElementById("datetime-picker"),
  buttonStart: document.querySelector("button[data-start]"),

  days: document.querySelector("span[data-days]"),
  hours: document.querySelector("span[data-hours]"),
  minutes: document.querySelector("span[data-minutes]"),
  seconds: document.querySelector("span[data-seconds]") ,
};


const isDisabled = true;
let chooseDate;

refs.buttonStart.disabled = isDisabled;

refs.buttonStart.addEventListener("click", clickOnStart);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.failure("Please choose a date in the future");

      refs.buttonStart.disabled = !isDisabled;
    }
    if (selectedDates[0] > Date.now()) {
      refs.buttonStart.disabled = !isDisabled;
      Notiflix.Notify.success("Success");
      chooseDate = selectedDates[0];
    }
 
  },
};

flatpickr(refs.timePickerInput, options);

refs.buttonStart.addEventListener("click", clickOnStart);

function clickOnStart() {
  refs.buttonStart.disabled = isDisabled;
  refs.timePickerInput.disabled = isDisabled;
     

  let timeDifference = chooseDate - Date.now();

  // console.log(timeDifference)
  
  renderTime(convertMs(timeDifference));

  const idInterval = setInterval(() => {
    timeDifference = chooseDate - Date.now();
    if (timeDifference < 0) {
      Notiflix.Report.warning("Time Over");
      clearInterval(idInterval);
      return;
    }
    renderTime(convertMs(timeDifference));
  }, 1000);
}


function renderTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

  return { days, hours, minutes, seconds };
}

console.log("qweeq"); 
