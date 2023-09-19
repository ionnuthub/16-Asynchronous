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

const getJSON = function (url, errorMsg = '') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

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
     <h5 class="country__city">Capital: ${data.capital}</h5>
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

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with Geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.address.city}, ${data.address.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new error(`Country not Found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     })
//     .catch(error => {
//       console.error(`Something Wrong ${error.message} 💥`);
//     });
// };

// btn.addEventListener('click', function (e) {
//   e.preventDefault();
//   whereAmI(52.508, 13.381);
//   whereAmI(44.439663, 26.096306);
//   whereAmI(35.899437, 14.4891496);
// });
//https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}
//fetch(`https://restcountries.com/v2/name/${country}`);
//${data.languages[0].name}

//////////////////////////////////////////////////

///
///
/////////////

////////////////////////////////////////////////////
///❗The Event Loop Practice
// console.log('Test Start'); //Top Level code (code outsaide of any callback)// Executed first
// setTimeout(() => console.log('0 sec timer'), 0); // Callback code// Executed 4rt
// Promise.resolve('Resolved promise 1').then(response => console.log(response)); // MicroQueue// executed third
// console.log('Test end'); // Top level Code// Executed second
// Promise.resolve('Resolved promise 2').then(response => {
//   for (let i = 0; i < 1000000000; i++) {} // microtask of the promise
//   console.log(response);
// });
// The implication of the microtask has priority over regular callback it is that , if one of the micro tasks takes long time to run, the timer will actually be delayed and not run after the 0 seconds. It will run after microtask done with it's work.
// We can't do high precision things using Js timers. (when we are working with promises and timers in the same time).

//////////////////////////////////////////////////////////////////
///❗Building a Simple Promise (creating our own Promise)
//
// We create a new promise using the new Promise() constructor. Promises are kind a special Js object
// The Promise constructor takes one argument and that it is the executor function().
// As soon the Promise constructor runs it will automatically execute this executor function that we pass in and as executes this function it will do so by passing two other arguments  and those arguments are the resolve and reject functions.
// The executor function it is the function wich will contain the asynchronous behaviour that we are trying to handle with the promise. This executor function should produce a result value. The value wich will gone be the future value of the promise.

/// if the random number it is >= 0.5 i want to call the reslove() function. Which now come in to play. if(Math.random() >= 0.5 ) we say we win the lottery; Therefore it means a fullfilled promise and in order to set the promise as fulfilled we use the resolve() function. Bassically just calling the resolve() function will mark this promise as fullfilled promise (which we can say a resolved promise).
//Now in the resolve() function we pass the fullfiled value of the promise so that later can be consumed with then() method.
// We handle the resolve of the promise just like other resolved promise with then() method.
//What ever value we pass in to the resolve() function , is gone be the result result of the promise that it will be available in to then() handler.

// else we mark this promise as rejected, where we call the reject() function . Then in to the reject() function we pass in the error message that later we want to be able in the catch() handler;
// We have to make sure the promise ends up in one of this states

// lotteryPromise is going to be a promise object at this point and we can call the then() method. And the then() method needs a callback function that it's gone be called with the resolved value of the promise.
// Then we catch any errors with catch()
// setting the timer for async operation.
// In the reject() we create an obj new Error()
// Using the timer we encapsulate some asynchronous behaviour into this promise.
// In then() we handle the resolve and log it to the console.

///
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw in proccess 💸');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win the lottery 💰');
//     } else {
//       reject(new Error('You lost your Money'));
//     }
//   }, 2000);
// });

// ///Consuming the Promise
// lotteryPromise
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// Usually in practice we mostly consume promises. We built promises when we wrap old callback based functions into promises. This is a proccess called promisifying
// Promisifying = It's to convert callback based asynchronous behaviour to promise based.

// ❗Real world Example: Promisifying a simple callback based asynchronous behaviour function
///❗Pomisifying the set Timeout() function and create a wait function
// We create a function wait which take a parameter a number of seconds
// Inside of the function we create and return a new Promise, which encapsulate the async operation. That's also what fetch() function does
// In this case we don't need the reject() function because it's imposible for timer to fail, and we dont mark the promise as rejected.
//we set the setTimeout() and in the time out we set the callback function that we want to be called after a certain time which it's resolve in this case
// In this case we dont need to pass any resolved value into the resolve function() because it's not mandatory
// We consum the promise wait(3)
// Then we can handle that with then(). Here in then() our callback function ,we are not going to receive any resolved value. In the callback we could run any code that we wanted to be executed after the seconds we specified in the wait().
// in then() we have to return a new Promise.  // return wait() // And again we can handle that
//
//

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     console.log(' 1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(' 2 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     console.log(' 3 second passed');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed')) // creates a new promise that will wait for certain amount of seconds which pe pass as arguments, and after this seconds ,it will resolve.
//   .then(() => console.log('5 seconds passed')); // error we have to return the promise

// //❗ Creating a fulfilled or rejected promise immediately.
// // We use Promise.resolve() // Which resolve it's static method on the Promise constructor//in resolve() We can pass the resolved value. // Then we handle that with then()
// Promise.resolve('abc').then(x => console.log(x)); // this will resolve immediatelly
// Promise.reject(new Error('Problem!')).catch(x => console.error(x)); // here then() it's not necessary because there will be no resolved value// We can just catch it

////////////////////////////////////
////////////////////////////////////////
// ❗Promisifiyng The Geolocation API❗ Promisify a callback API, to a promise based API

//////
// Revizuing the navigator.geolocation.getCurrentPosition() function
// we create the navigator.geolocation.getCurrentPosition() function.The function accepts two callbacks where the first it's for the success and the second one it's for the error.
// The first callback function get access to the position object. We pass that as an argument to this function
// The second callback with the error in case that the user does not alllow the page to get access to the current location// we log the error to the console.
// When JS figure out the location we get that data back. This is the async behaviour
//
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.log(error)
// );

//❗ Promisifiyng❗  Promisify a callback API, to a promise based API
//// We create the new Promise
// We change what it's happening in the callbacks function
// When we have succes (position in this case) we want to resolve the promise, we want to mark it as fulffiled and we call the resolve() function and we pass in that position object. Because that is the fullfilled value that we want to get from this promise in case that is successful
// This is the all reason for using this function in the first place. It is to get acces to the current position
// The future value of the promise it is the obj with current position, which we need outside of the promise when we handle it
// we do the same for the error
//to  simplify:
// the getCurrentPosition() automatically calls the calllback functions: position => resolve(position), error => reject(error) and automatically passes in the position

// Now the resolve it is the callback function which will get called with the position
// we call the getPosition().then() and we handle the result with then

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   error => reject(error)

//     navigator.geolocation.getCurrentPosition(resolve, reject); // to simplify
//   });
// };
// /// The promise was marked as succsesfull by the resolve( function), therefore the callback was called in the then() handler
// getPosition().then(position => console.log(position));

////❗ Take it to next Level
// Sience we have the getPosition() function we don't need to pass in these coordinates (lat,lng)
// The function will tell us where we are based on the geolocation of our device.
// We destructure the coords object and we reassign the new value.
// next we chain the next promise
// const whereAmI = function () {
//   getPosition()
//     .then(position => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with Geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.address.city}, ${data.address.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.address.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new error(`Country not Found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       renderCountry(data[0]);
//     })
//     .catch(error => {
//       console.error(`Something Wrong ${error.message} 💥`);
//     });
// };

// btn.addEventListener('click', whereAmI);

// /////////////////////////////////////////////////////////////////
///////////////////////
/////////❗Coding Chalenge 2
//Creating a function which receives imgPath as an input. This function returns a promise which creates a new image.

// function createImage(imgPath) {
//   return new Promise((resolve, reject) => {
//     let img = document.createElement('img');
//     img.src = imgPath;

//     img.onload = () => {
//       document.querySelector('.images').appendChild(img);
//       resolve(img);
//     };

//     img.onerror = () => {
//       reject(new Error(`Failed to load image at path ${imgPath}`));
//     };
//   });
// }

// createImage('img/img-1.jpg')
//   .then(img => console.log('Image loaded', img))
//   .catch(err => console.error(err));

//////////////////////////////////////////////////////////////
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// let img;
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     img = document.createElement('img');
//     img.src = imgPath; /// Setting the src path it is an async operation;

//     img.addEventListener('load', function () {
//       document.querySelector('.images').appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error(`Failed to load the image path💥${imgPath}`));
//     });
//   });
// };

// createImage('img/img-1.jpg')
//   .then(response => {
//     console.log(`Image Loaded 🐸${response}`);
//     return wait(2);
//   })
//   .then(() => {
//     console.log('2 seconds Passed');

//     img.style.display = 'none';
//     createImage('img/img-2.jpg');
//     return wait(2);
//   })
//   .then(() => {
//     console.log(' 4 seconds passed');
//     img.style.display = 'none';
//     createImage('img/img-3.jpg');
//   })
//   .catch(error => console.error(error.message));

/////////////////////////////////////////////////////////
////❗❗❗❗
//  ❗Consuming Promises With ASYNC/AWAIT
// Async await it is about Consuming Promises. The way that we build them is not influenced in any way.
// We build the function adding async in front of the function. And this function now is an asynchronus function (a function that will keep running in the background while performing the code that's inside of it , then when this function it is done it automatically returns a promise )
// Inside of an async function we can have one or more await statements
// await and after we need a promise; so we can use the promise returned from the fetch(where we pass in the API) function. The fetch returned a promise and we can use the await keyword to bassically await for the result of this promise.
// await = it will stop the code execution until the promise it's fulfilled// (Until the data has been fetch in this case)
// Stoping execution in an async function is not a problem, because this function it's runningasynchronously in the background. and it is not blocking the main threat of execution (it's not blocking the callstack)
// As  soon this promise is resolved then the value of this whole await expression that we have here is going to be the resolved value of the promise. And we can store that in a variable
// asyc /await it is simply sintetic sugar over the then method in promises// Offcourse behind the scenes we are still using Promises// It is a different way of consuming them
// In this case we have to get the json() out of this response; which json() return a new promise// Previously we had to return this promise and then chain another then handler.
// Now we just use await and store the result in a variable. And all we have to do is to render it.

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // fetch(`https://restcountries.com/v2/name/${data.address.country}`).then((res) => console.log(res)); Same as await

// const whereAmI = async function () {
//   try {
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;

//     //Reverse Geocoding
//     const responseGeo = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
//     );
//     if (!responseGeo.ok) throw new Error('Problem getting Location Data');
//     const dataGeo = await responseGeo.json();
//     //console.log(dataGeo);
//     ///// Country Data
//     const response = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.address.country}`
//     ); // Storing the fulfilled promise value

//     if (!response.ok) throw new Error('Problem getting Country');
//     const data = await response.json(); // Storing the fulfilled promise value
//     //console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.address.town}`;
//   } catch (error) {
//     console.error(`${error}💥`);
//     renderError(`💥 ${error.message}`);

//     ///Reject promise returned from async function
//     throw error;
//   }
// };
// console.log('1 log');

//whereAmI();
// const city = whereAmI(); /// this it's not working
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(error => console.log(`2: ${error.message}`))
//   .finally(() => console.log)
//   .catch(error => console.log(`2: ${error.message}`))
//   .finally(() => console.log('Log 3'));

// (async function whereAmIAsync() {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (error) {
//     console.log(`2: ${error.message}`);
//   }
//   console.log(`Finish Getting Location`);
// })();
// async / await is acttually used a lot together with the more traditional then method of consuming promises.

//////////////////////////
////❗❗❗Error Handling with TRY...CATCH async/await
// With async/await we can't use the catch method that we used before because we can't really attach it anywhere
// We use try/catch statement. The try catch statement is actually used in regular JavaScript as well. It's been in the language sience the beginning.
// Any error has the message property. error.message

// try {
//   let y = 1;
//   const x = 3;
//   x = 4;
// } catch (error) {
//   alert(error.message);
// }

////❗Returning Values From ASYNC Functions
// An async function always return a promise
// If we wanted to return some data from this function. The returned value it will be : Promise{<pending>}
// The reason for that is at this point of the code from the returned string from our code JS has simply no way of knowing yet the string that we returned; Because the function it is still running but it is also not blocking the code out where const city = whereAmI(); At his point JS has no way of knowing what will be returned from this function. And all that the function returnes is a promise.
// Now the value that we returned from an async function, in our case the string , it will become the fulfilled value of the promise that is returned by the function.
// How we acctually get the data that we want it is by calling the function whereAmI().then(city => console.log(city)) because the WhereAmI() it is our promise and use the then() method to get the fulfilled value of the promise. In the then() handler the argument that will be passed into the callback function is going to be the resolve value of the promise
// If any error occurs in the try block the return  will never be reached because the code will immediately jump to the catch block.
// We will get undefined in the console. Even though it was an error in the async function the promise that it returnes is still fulfilled.
// If we want to catch that error we have to rethrow that error in the catch block in the async function.
// Rethrow the error means : throw the error again so that we can then propagate it down. An so with that,we will manually reject a promise that's returned from the async function.
// whereAmI().then(city => console.log(city)).catch(error=> console.log(`2: ${error.message}`));
// If we want to fix the log the 2 to be logged to before , we use finally()

// Here we are using the old way and the new way of working with promises all in the same code.
//whereAmI()
// .then(city => console.log(`2: ${city}`))
// .catch(error => console.log(`2: ${error.message}`))
// .finally(() => console.log)
// .catch(error => console.log(`2: ${error.message}`))
// .finally(() => console.log('Log 3'));

//There is a better way to convert this code in to an async/await as well. And we can do that because we can treat the promise here that has returned just like any other promise. And offcourse we are able to handle it using async/await
//we dont't really want a new complete function here and instead we can use an IIFE = Immediately Invoked Function Expressions
// This pattern here is one of the last remaining cases for IIFEs
//(async function () { })();
// //  ( async function whereAmIAsync() {
//     try {
//       const city = await whereAmI();
//       console.log(`2: ${city}`);
//   } catch (error) {
//       console.log(`2: ${error.message}`);
//   } finally {
//       console.log('Log 3');
//   }
// })()

/////❗Running Promises in Parallel
// When ever we have a sittuation where we have to do multiple async operations at the same time and operations that dont't depend on one another then we should always run them in parallel, Using Promise.all()

// Promise.all() combinator= it's a static method. This function takes an array of promises, and will return a new promise (returns an  array of promise). Which will then run all the promises in the array at the same time. To create the output as before we need to loop over this data and take out the data that we want.
// We want to return an array so we use map(). Because we want to return a new array with the capital cities'
// In this array of data,each element of data , we want to take the data[0] (the element at position 0), and on there we want the capital city.
// If one of the promise rejects then the whole Promise.all() actually rejects as well.
// We say that Promise.all() short circuits when one promise rejects. One rejected promise is enough for the entire thing to reject as well.

// This function will take in 3 countries and will log the capital cities of this 3 countries as an array.
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`); // The result of this it will be an array with 1 obj , and we use destructuring to take the first element there.
// const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`); // We create 3 variables for this 3 country
// const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`); // What we did here was to run all the AJAX calls one after another even though the result of the second one does not depend on the first one, and the result of the 3rd ones do not depends on any of the other ones.This does'nt make much sens. Way the first AJAX call to wat for the first one. //Instead of running this 3 promises in sequences we can run them in parallel, make them loading at the same time.
// console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     console.log(data.map(data => data[0].capital));
//   } catch (error) {
//     console.log(error);
//   }
// };
// get3Countries('romania', 'nigeria', 'haiti');
///Instead to run this 3 promises in sequences we can run them in paralel
// The Promise.all() return a new promise. A promise that's run all of the promises at the same time. And then we can handle that promise in the exact way as before
//To create the same output as before all we have to do is to loop over this data and take out the data that we want.
// We use map(), because we want to return a new array with all the capital cities.
// That's the Promise.all combinator, it's called a combinator function because it allow us to combine multiple promises.
// If we don't use async /await we get the code and handle it with then method

//////////////////❗❗ Promise Combinators : Race, AllSettled and Any

// Promise.race() = receives an array of promises and it also returns a promise. This promise returned by Promise.race() is settled as soon as one of the input promises settles.
// settled = means a value is available. But it doesn't matter if the promise got rejected or fullfilled

// In Promise.race() basically the first settled promise wins the race.

///// We create a quick IIFE so that we can use async await. With out creating a new function with the name.

(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/romania`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]); //We store it as response
  console.log(response[0]);
})();
// We define an array of promises. And basically this promises will race against each other, like in a real race.
// Now if the winning promise is then a fulfilled promise,then the fulfillment values of this whole race promise is gonna be the the fulfillment value of the winning promise.
// If we try it again the result can be different because then maybe another call is gonna be faster.
// In Promise.race we get just one result not an array of three.
// A promise that get rejected can also win the race.
// Promise.race short circuits whenever one of the promises gets settled.
// In real world Promise.race it is very useful to prevent against never ending promises or also very long running promises.

/////////////
// For example if the user has a very bad internet connection, then a fetch request in our application might take way too long to actually be useful. And we can create a special time out promise, which automatically rejects after a certain time has passed.

//Ex:
