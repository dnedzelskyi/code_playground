function binary_search(arr, target) {
  if (!arr.length) {
    return false;
  }

  let lo = 0;
  let hi = arr.length;

  while (lo <= hi) {
    const index = Math.floor((lo + hi) / 2);
    const value = arr[index];

    if (value === target) {
      return true;
    } else if (value < target) {
      lo = index + 1;
    } else {
      hi = index - 1;
    }
  }

  return false;
}

console.log(`For input ([], 1) : ${binary_search([], 1)}`);
console.log(`For input ([2, 7, 10, 11], 6) : ${binary_search([2, 7, 10, 11], 6)}`);
console.log(`For input ([6], 6) : ${binary_search([6], 6)}`);
console.log(`For input ([5, 12, 15], 15) : ${binary_search([5, 12, 15], 15)}`);
console.log(`For input ([2, 7, 10, 11], 2) : ${binary_search([2, 7, 10, 11], 2)}`);
console.log(`For input ([5, 9, 21, 33, 45, 61], 9) : ${binary_search([5, 9, 21, 33, 45, 61], 9)}`);
