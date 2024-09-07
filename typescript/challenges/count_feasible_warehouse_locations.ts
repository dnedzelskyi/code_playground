/*
 Given:
  centers: number[] - delivery / drop-off centers locations.
  d - max available distance.
 Task:
  Count all location for warehouse
  such that sum of distances ridding back and forth
  for each center to warehouse <= d.
  S = 2 * ∑|x - c(i)| ≤ d
 Ex.
  -------C0------C1----C2-------
  -3 -2 -1 0 1 2 3 4 5 6 7 8 9

  centers = [-1, 3, 6]
  d = 14

  Answer:
    [3]
    S = 2 * ( (3 + 1) + (3 - 3) + (6 - 3)) = 14 ≤ d
 */

// Approach #1 Min and Max + Binary Search | time: O(n + 2 * log(C)) | space: O(1)
function countLocations(centers: number[], d: number): number {
  let [cMin, cMax] = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];

  // Find min and max locations.
  for (let l of centers) {
    [cMin, cMax] = [Math.min(cMin, l), Math.max(cMax, l)];
  }

  let mid = Math.floor((cMin + cMax) / 2);
  const verifySum = (x: number) =>
    2 * centers.reduce((prev, curr) => prev + Math.abs(x - curr), 0) <= d;

  // Use binary search to find left boundary.
  let [l, r, p] = [cMin - Math.floor(d / 2), mid, -1];
  while (l <= r) {
    p = Math.floor(l + (r - l) / 2);
    [l, r] = verifySum(p) ? [l, p - 1] : [p + 1, r];
  }
  let xMin = verifySum(l) ? l : 0;

  // Use binary search to find right boundary.
  [l, r, p] = [mid, cMax + Math.floor(d / 2), -1];
  while (l <= r) {
    p = Math.floor(l + (r - l) / 2);
    [l, r] = !verifySum(p) ? [l, p - 1] : [p + 1, r];
  }
  let xMax = verifySum(l) ? l : 0;

  return Math.abs(xMin - xMax);
}

console.log(`:: Count feasible warehouse locations. ::`);
console.log();

let [centers, d] = [[-1, 3, 6], 14];
console.log(`Centers: [${centers}], d: ${d}`);
console.log(`Warehouse location count: ${countLocations(centers, d)}`);
console.log();

[centers, d] = [[-4, 0, 2, 3], 22];
console.log(`Centers: [${centers}], d: ${d}`);
console.log(`Warehouse location count: ${countLocations(centers, d)}`);
console.log();

[centers, d] = [[-400, 10, -2, 4], 300];
console.log(`Centers: [${centers}], d: ${d}`);
console.log(`Warehouse location count: ${countLocations(centers, d)}`);
console.log();
