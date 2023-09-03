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

const request = fetch(`https://restcountries.com/v2/name/romania`);
console.log(request); // The fetch function immediattely return a promise

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

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      //Country 2.
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

/// Always Return the promise then handle it outside. like this

getCountryData('romania', 'neighbour');
