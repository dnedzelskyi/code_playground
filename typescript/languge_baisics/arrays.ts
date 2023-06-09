let emptyArray: String[] = [];

console.log(emptyArray);

let twoDimensionalArray1: number[][] = [
  [3, 5, 7],
  [1, 0, 5],
];

console.log(twoDimensionalArray1);

let twoDimensionalArray2: number[][] = Array(2).fill(Array(2));

console.log(twoDimensionalArray2);

twoDimensionalArray2[0].push(3, 4);

console.log(twoDimensionalArray2);
