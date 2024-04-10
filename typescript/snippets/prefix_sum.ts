/**
 * Calculating prefix sum.
 */

/**
 * Indicates if PrefixSum[i] includes A[i].
 */
enum ScanType {
  Exclusive = 0,
  Inclusive = 1,
}

/**
 * Calculates prefix sum for sequence of numbers.
 *
 * @param {number[]} arr - Input array.
 * @param {ScanType} [scanType = ScanType.Exclusive] - Exclusive or Inclusive type. Defaults to ScanType.Exclusive.
 * @returns {number[]} Prefix sum array.
 */
function calculatePrefixSum(
  arr: number[],
  scanType: ScanType = ScanType.Exclusive,
): number[] {
  if (arr.length === 0) {
    return [];
  }

  let res = new Array<number>(arr.length + 1).fill(0);
  for (let i = 1; i < res.length; i++) {
    res[i] = res[i - 1] + arr[i - 1];
  }

  if (scanType === ScanType.Inclusive) {
    res.shift();
  }

  return res;
}

console.log(':: Prefix Sum Test ::');
console.log();

let arr = [1, 1, 0, 0, 1, 1];
let prefixSum: number[];

console.log(`Input array:`);
console.log(arr);
console.log();

console.log(`Exclusive prefix sum array:`);
prefixSum = calculatePrefixSum(arr);
console.log(prefixSum);
console.log();

console.log(`Sum between indexes [0, 2):`, prefixSum[2] - prefixSum[0]);
console.log(`Sum between indexes [1, 6):`, prefixSum[6] - prefixSum[1]);
console.log();

console.log(`Inclusive prefix sum array:`);
prefixSum = calculatePrefixSum(arr, ScanType.Inclusive);
console.log(prefixSum);
console.log();

console.log(`Sum between indexes (0, 2]:`, prefixSum[2] - prefixSum[0]);
console.log(`Sum between indexes (1, 5]:`, prefixSum[5] - prefixSum[1]);
console.log();
