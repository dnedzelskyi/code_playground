/**
 * Snippet to turn function with callback into Promise.
 *
 */

/**
 * Utility function for turning function with a callback into a Promise.
 *
 * @param {(callback: (err, val) => void, ...args) => void} fn - Function with callback.
 * @param {...*} [args] - Additional args.
 * @returns {Promise} Promisified version of fn call.
 */
function promisify(fn, ...args) {
  return new Promise((resolve, reject) => {
    const callback = (err, val) => {
      if (err) {
        reject(err);
      } else {
        resolve(val);
      }
    };
    fn(callback, ...args);
  });
}

console.log(':: Promisify snippet Test ::');
console.log('');

const successFnWithCallback = (callback) => {
  setTimeout(() => callback(null, 'Task has been completed.'), 3000);
};
const failFnWithCallback = (callback) => {
  setTimeout(() => callback(new Error('Error. Oh snap !!!')), 3000);
};

console.log(`#1 Promisify successFnWithCallback ...`);
promisify(successFnWithCallback)
  .then((val) => console.log(`#1 ${val}`))
  .catch((err) => console.log(`#1 ${err}`));

console.log(`#2 Promisify failFnWithCallback ...`);
promisify(failFnWithCallback)
  .then((val) => console.log(`#2 ${val}`))
  .catch((err) => console.log(`#2 ${err}`));
