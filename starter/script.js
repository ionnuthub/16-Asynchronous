'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*

//First AJAX call

/// Sequence of AJAX Call

// Function with own functionality

const renderCountry = function (data, className = '') {
  //Building card component

  const html = `
  <article class="country ${className}"> 
   <img class="country__img" src="${data.flag}" />
   <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
     <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>${(
       +data.population / 1000000
     ).toFixed(1)}</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
   </div>
   </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

/// Based on the borders we get the neighor country
const getCountryAndNeighbour = function (country) {
  ///AJAX Call Country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText); // this is the response from request

    //We convert the response JSON data in to an object
    const [data] = JSON.parse(this.responseText);
    // We use destructuring to get the obj out of the array
    console.log(data);

    /// Render Country 1
    renderCountry(data);

    /// Get Neighbour Country (2)
    const [neigbour] = data.borders;

    if (!neigbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neigbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      if (!neigbour) return;

      renderCountry(data2, 'neighbour');
    });
  });
};
getCountryAndNeighbour('romania');

// Its coming with the code from borders, not with the name of the country.
// We are calling the secomnd ajax call in the callback function of the first one.

setTimeout(() => {
  console.log('1 Second passed');
  setTimeout(() => {
    console.log('2 Seconds passed');

    setTimeout(() => {
      console.log('3 Seconds passed');
    });
  });
});

*/

/// ❗Promises

// const renderCountry = function (data, className = '') {
//   //Building card component

//   const html = `
//   <article class="country ${className}">
//    <img class="country__img" src="${data.flag}" />
//    <div class="country__data">
//      <h3 class="country__name">${data.name}</h3>
//      <h4 class="country__region">${data.region}</h4>
//      <p class="country__row"><span>👫</span>${(
//        +data.population / 1000000
//      ).toFixed(1)}</p>
//      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//    </div>
//    </article>`;
// countriesContainer.insertAdjacentHTML('beforeend', html);
// countriesContainer.style.opacity = 1;
// };

// const request = fetch(`https://restcountries.com/v2/name/romania`);
// console.log(request); // The fetch function immediattely return a promise

/// ❗Consuming Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('romania');

// If we have a value
// fetch() return a promise and we handle that promise using then() method.
// To read the data from the response we call json()
// In then() method we want to pass a callback function that we want to be executed as soon the result it is available. The fucntion will receive one argument once it's called by JS.
// That argument it's the result value of the fulfilled promise. We call it response . because this it is the response of an AJAX call in this case.
// In order to read the data from the body we need to call the json() method on the response. json() method it is available on all response objects of the fetch method.
// The json() it is also an async function, which means it will also return a new promise.
// We need to return the promise.
// we need to handle that promise. The way to do it we have to call then() method again on it

//❗ Using Arrow Function because it's implicitly return

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };

// getCountryData('romania');

///❗ Chaining Promises

//Renedring the neighbouring country of the initial country
// We chain together two sequential AJAX calls.
// The second AJAX call depends on the data from the first call. So they need to be done in sequence.
// As soon we get the data, then we need to get the neighbour country and do the Ajax call for that one as well
// we fetch the url and we get the promise
// we have to return the new promise to be able to chain the then() method on the result of previous then() method
// then() method always return a promise no matter if we actually return anything or not. But if we do return a value, that value will become the fulfilment value of the return promise.
// The fulfill value of the next then() method it will be the fullfilled value of the previous promise.
// And we handle the success value of that promise

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response =>
//   response.json()
//     )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //Country 2.
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🔧🔧🔧`);
//       renderError(`Something went wrong🔧🔧🔧 ${err.message}. Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('mbutu');
// });
/// Always Return the promise then handle it outside. like this

/// ❗Handling Rejected Promises
// Hnadling the error it is also called catching the error
// A promise which an error happens is a rejected promise
// The only way in wich fetch promise rejects it's when the user loses his internet connection.
// There are 2 ways of handling rejections:
// 1. It is to pass a second callback function in to the then() method, which will be called when the promise was rejected. It will be called with an argument which it's the error itself
// 2. We can handle the error globally just in one central place. We can handleall the erros no matter were they appear in the chai right at the end of the chain by adding a catch() method with a callback function//
// because the callback function will also be called with the error object that occured.// The catch() will catch any error that occur in any place in this whole promise chain
// Errors basically propagate down the chain until they are caught, and if they are not cught we get the uncaought error
//.catch(err => alert(err));
// The error generated it is an obj JS
// We can style with console.error
// Usually in a real app with UI it's not enough to just log the error to the console// And we shuold also display a message for the user to see.
// we create a function what render the error message.
//We can create error in JS with a constructor for example just like a map or a set. Any error in JS created like this contains the message property.

// We have also finally() method. And then the callback function that we define here will always be called whatever happens with the promise. even if its fulffilled or rejected// The finally() method it's not all the time useful, just sometimes.// WE use this method for somethingh that always needs to happen no matter the result of the promise.
// An example of that is to hide a loading spinner like rotating circles wich they are every where in web app when we load some data
// This app show a spinner when as async operation starts and then hide it once the operation completes. That happen no matter if operation was succsefully or not

//❗Throwing error Manually
// With 404 error the fetch promise will still get fullfilled and there is no rejection and our catch handler cannot pick up on this error.
// Sience we add back the block to the function we have to return;
// We can use the ok property which it is set to false from the response , to reject the promise ourselves manually
// We can do that by creating a new error in the then() methods.
// If the response it is false (!response.ok) We create the new Error by using the constructor function and we pass in a message which is gone be the error message then we use the throw keyword which will immediatly terminate the current function. Just like return does it.
// the effect of creating and throwing an error in any of these then() methods is that the promise will immediately reject. The promise returned by the then() handler will be a rejected promise. And that rejection will then propagate all the way down to the catch handler, which we have set up
// Any error will cause any promise to reject
// Hnadling errors it is the only way in which we can actually display an error message on the screen for the user
// It's a bad practice to leave the rejected promises without handling them.
// when ever we want to create some error that we want to handle in the catch() all we need to do is to throw and create a new error

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'dfsfshd';

//       if (!neighbour) return;

//       //Country 2.
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🔧🔧🔧`);
//       renderError(`Something went wrong🔧🔧🔧 ${err.message}. Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('romania');
// });

// //❗ We can create ourself a helper function. This helper function will wrap up the fetch the error handling and the conversion to JSON.
// // In order to make the function generic we dont want to hard code the error message,but we want to pass the message in. And we add a default parameter. // We need to return all of them; like that the function will return a promise

// const getJSON = function (url, errorMsg = '') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v2/name/${country}`, `Country not found `)
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders?.[0];
//       console.log(neighbour);

//       // const neighbour = 'dflsad'; // to get the error

//       if (!neighbour) throw new Error(`No neighbour found `); // when we dont have neighbour

//       //Country 2.
//       return getJSON(
//         `https://restcountries.com/v2/alpha/${neighbour}`,
//         `Country not found`
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🔧🔧🔧`);
//       renderError(`Something  wrong🔧🔧🔧 ${err.message}. Try Again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('romania');
// });

// getCountryData('australia');

// When we dont have a neighbour. We have to throw a new error to catch that

// 🖍️Chalenge 1.
//Reverse geocoding

const renderCountry = function (data, className = '') {
  //Building card component

  const html = `
  <article class="country ${className}"> 
   <img class="country__img" src="${data.flag}" />
   <div class="country__data">
     <h3 class="country__name">${data.name}</h3>
     <h4 class="country__region">${data.region}</h4>
     <h5 class="country__city">${data.capital}</h5>
     <p class="country__row"><span>👫</span>${(
       +data.population / 1000000
     ).toFixed(1)}</p>
     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
   </div>
   </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with Geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.address.city}, ${data.address.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
    })
    .then(response => {
      if (!response.ok) throw new error(`Country not Found ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data[0]);
    })
    .catch(error => {
      console.error(`Something Wrong ${error.message} 💥`);
    });
};

btn.addEventListener('click', function (e) {
  e.preventDefault();
  whereAmI(52.508, 13.381);
  whereAmI(44.439663, 26.096306);
  whereAmI(9.0765, 7.3986);
});
//https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}
//fetch(`https://restcountries.com/v2/name/${country}`);
//${data.languages[0].name}
