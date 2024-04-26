/**
 * Heap Sort.
 *
 * @param {number[]} numbers
 */
function heapSort(numbers) {
  // First turn array into max heap.
  heapify(numbers);

  // Swap top max with a tail reduce heap size
  // and heapify down new top to maintain heap property.
  let i = numbers.length - 1;
  while (i > 0) {
    [numbers[0], numbers[i]] = [numbers[i], numbers[0]];
    heapifyDown(numbers, 0, i);
    i--;
  }
}

/**
 * Converts an array of numbers into a binary heap.
 *
 * @param {number[]} numbers - Array of numbers.
 * @param {function(number, number): boolean} [orderConditionFn] - Order condition function for the heap. By default set to max-heap.
 */
function heapify(
  numbers,
  orderConditionFn = (parent, child) => parent > child,
) {
  const n = numbers?.length ?? 0;
  if (n === 0) {
    return;
  }

  let i = Math.floor((n - 2) / 2);
  while (i >= 0) {
    heapifyDown(numbers, i, n, orderConditionFn);
    i--;
  }
}

/**
 * Performs the heapify-down operation.
 * @param {number[]} numbers - Array of numbers.
 * @param {number} i - Index of the element to heapify-down.
 * @param {number} size - Heap size.
 * @param {function(number, number): boolean} [orderConditionFn] - Order condition function. By default set to max-heap.
 */
function heapifyDown(
  numbers,
  i,
  size,
  orderConditionFn = (parent, child) => parent > child,
) {
  while (i < size) {
    let [m, l, r] = [i, 2 * i + 1, 2 * i + 2];

    if (l < size && !orderConditionFn(numbers[m], numbers[l])) {
      m = l;
    }
    if (r < size && !orderConditionFn(numbers[m], numbers[r])) {
      m = r;
    }

    if (i === m) {
      break;
    }

    [numbers[m], numbers[i]] = [numbers[i], numbers[m]];
    i = m;
  }
}

console.log(':: Heap sort test ::');
console.log('');

let arr = [2, 5, 11, 22, 71, 8, 93, 64, 4, 0, -5, -10];
console.log(`Array before sort:`, arr);
heapSort(arr);
console.log(`Array after sort:`, arr);
console.log('');

arr = [6, 5, 4, 3, 2, 1];
console.log(`Array before sort:`, arr);
heapSort(arr);
console.log(`Array after sort:`, arr);
console.log('');
