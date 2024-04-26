/**
 * Snippet for turning array into max/max heap in-place.
 *
 */

/**
 * Converts an array of numbers into a binary heap using Floyd's approach (heapify-down).
 *
 * @param {number[]} numbers - Array of numbers.
 * @param {function(number, number): boolean} [orderConditionFn] - Order condition function for the heap. By default set to max-heap.
 */
function heapifyFloyd(
  numbers,
  orderConditionFn = (parent, child) => parent > child,
) {
  if (numbers.length === 0) {
    return;
  }

  function heapifyDown(numbers, i, orderConditionFn) {
    while (i < numbers.length) {
      let [m, l, r] = [i, 2 * i + 1, 2 * i + 2];

      if (l < numbers.length && !orderConditionFn(numbers[m], numbers[l])) {
        m = l;
      }
      if (r < numbers.length && !orderConditionFn(numbers[m], numbers[r])) {
        m = r;
      }

      if (i === m) {
        break;
      }

      [numbers[m], numbers[i]] = [numbers[i], numbers[m]];
      i = m;
    }
  }

  let i = Math.floor(numbers.length / 2 - 1);
  while (i >= 0) {
    heapifyDown(numbers, i, orderConditionFn);
    i--;
  }
}

/**
 * Converts an array of numbers into a binary heap using the Williams' method (heapify-up).
 *
 * @param {number[]} numbers - Array of numbers.
 * @param {function(number, number): boolean} [orderConditionFn] - Order condition function for the heap. By default set to max-heap.
 */
function heapifyWilliams(
  numbers,
  orderConditionFn = (parent, child) => parent > child,
) {
  if (numbers.length === 0) {
    return;
  }

  function heapifyUp(numbers, i, orderConditionFn) {
    let p = Math.floor((i - 1) / 2);
    while (p >= 0 && !orderConditionFn(numbers[p], numbers[i])) {
      [numbers[p], numbers[i]] = [numbers[i], numbers[p]];
      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  let i = 0;
  while (i < numbers.length) {
    heapifyUp(numbers, i, orderConditionFn);
    i++;
  }
}

console.log(':: Heapify array test ::');
console.log('');

let arr = [2, 5, 11, 22, 71, 8, 93, 64, 4, 0, -5, -10]; //[3, 1, 7, 11, 21, 60, 0];
console.log('Floyd approach:');
console.log(`Array:`, arr);
heapifyFloyd(arr);
console.log(`Max-Heap:`, arr);
console.log('');

arr = [0, 2, 3, 4, 5, 6];
console.log('Williams approach:');
console.log(`Array:`, arr);
heapifyWilliams(arr);
console.log(`Max-Heap:`, arr);
console.log('');
