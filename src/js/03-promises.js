// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }


import { Notify } from 'notiflix';

const refs = {
  body: document.querySelector('body'),
  form: document.querySelector('form.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
}


refs.form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


function onPromiseCreate(e) {
  e.preventDefault();

  let valueDelay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    let promiseDelay = valueDelay + step * i;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

// !-------------------------------------------------------------------------------------------------
// // Import library
// import Notiflix from 'notiflix';

// // Get form element
// const formRef = document.querySelector('.form');

// // Set event listener submit on form
// formRef.addEventListener('submit', onSubmitForm);

// // Submit form
// function onSubmitForm(event) {
//   event.preventDefault();

//   let delay = Number(formRef.delay.value);

//   for (let i = 1; i <= formRef.amount.value; i += 1) {
//     createPromise(i, delay)
//       .then(({ position, delay }) => {
//         Notiflix.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notiflix.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     delay += Number(formRef.step.value);
//   }
// }

// // Create promise
// function createPromise(position, delay) {
//   const obj = { position, delay };
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         // Fulfill
//         resolve(obj);
//       } else {
//         // Reject
//         reject(obj);
//       }
//     }, delay);
//   });
// }