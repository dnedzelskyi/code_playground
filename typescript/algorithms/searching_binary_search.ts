namespace SearchingBinarySearch {
  function binarySearch(arr: number[], target: number): boolean {
    if (!arr.length) {
      return false;
    }

    let lo = 0;
    let hi = arr.length - 1;

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

  console.log(`For input ([], 1) : ${binarySearch([], 1)}`);
  console.log(`For input ([2, 7, 10, 11], 6) : ${binarySearch([2, 7, 10, 11], 6)}`);
  console.log(`For input ([6], 6) : ${binarySearch([6], 6)}`);
  console.log(`For input ([5, 12, 15], 15) : ${binarySearch([5, 12, 15], 15)}`);
  console.log(`For input ([2, 7, 10, 11], 2) : ${binarySearch([2, 7, 10, 11], 2)}`);
  console.log(`For input ([5, 9, 21, 33, 45, 61], 9) : ${binarySearch([5, 9, 21, 33, 45, 61], 9)}`);
}
