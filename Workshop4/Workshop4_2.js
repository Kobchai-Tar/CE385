function fetchDataWithCallback(callback) {
  setTimeout(() => {
    callback('Data from callback');
  }, 2000);
}

console.log('Start Callback');

fetchDataWithCallback((data) => {
  console.log(data);
});

console.log('End Callback');


function fetchDataWithPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data from promise');
    }, 2000);
  });
}

console.log('Start Promise');

fetchDataWithPromise()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

console.log('End Promise');
