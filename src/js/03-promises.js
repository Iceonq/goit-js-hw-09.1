import Notiflix from 'notiflix';

const delayInput = document.querySelector('[name = delay]');
const stepInput = document.querySelector('[name = step]');
const amountInput = document.querySelector('[name = amount]');
const promiseButton = document.querySelector('button');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

promiseButton.addEventListener('click', e => {
  e.preventDefault();
  for (let i = 0; i <= amountInput.value; i++) {
    setTimeout(() => {
      createPromise(i + 1, delayInput.value + i * stepInput.value);
    }, delayInput.value + i * stepInput.value);
  }
});
