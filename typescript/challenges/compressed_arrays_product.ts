namespace CompressedArraysProduct {
  /*
  Given:
    Two compressed arrays of length n and m such as:
    [[V1, R1], [V2, R2], ..., [Vn, Rn]] - corresponds to decompressed array:
    [
      V1, V1, ... , V1,     // R1 times
      V2, V2, ... , V2,   // R2 times
      ... ,
      Vn, Vn, ... , Vn    // Rn times
    ]
    Min Integer < Vi < Max Integer,
    Ri > 0
    ∑Rn = ∑Rm - number of elements in decompressed arrays are the same.
  Task:
    Implement function that will construct compressed array with product of elements
    from given arrays that a placed at the same positions in decompressed representation.
  Examples:
    #1
    Array 1: 
      [[1, 3], [3, 2], [5, 4]] => [1, 1, 1, 3, 3, 5, 5, 5, 5]
    Array 2:
      [[2, 4], [1, 5]] => [2, 2, 2, 2, 1, 1, 1, 1, 1]
    Result: 
      [ (1 * 2), (1 * 2), (1 * 2), (3 * 2), (3 * 1), (5 * 1), (5 * 1), (5 * 1), (5 * 1)] 
      => [2, 2, 2, 6, 3, 5, 5, 5, 5] 
      => [[2, 3], [6, 1], [3, 1], [5, 4]]
    #2
      Array 1:
        [[2, 3]] => [2, 2, 2]
      Array 2:
        [[1, 2], [2, 1]] => [1, 1, 2]
      Result:
        [[2 , 2], [4, 1]]
  */

  /*
    Approach #1 | Time: O(max(n, m))
    1. Create two variables val1 and val2 for holding current compressed values and set it to first elements of the given arrays.
    2. Iterate through arrays with to pointers i and j.
    2. Calculate product and read leftovers for values.
    3. Increment i,j and assign values to valOne, valTwo is needed.
  */
  function calculateProduct(arr1: number[][], arr2: number[][]): number[][] {
    // Declare function for calculating product and leftovers.
    const multiply = (
      val1: number[],
      val2: number[],
    ): {
      product: number[];
      leftOver1: number[] | null;
      leftOver2: number[] | null;
    } => {
      const count = Math.min(val1[1], val2[1]);
      const product = [val1[0] * val2[0], count];

      let leftOver: { leftOver1: number[] | null; leftOver2: number[] | null } =
        { leftOver1: null, leftOver2: null };

      if (val1[1] > val2[1]) {
        leftOver.leftOver1 = [val1[0], val1[1] - count];
      }

      if (val1[1] < val2[1]) {
        leftOver.leftOver2 = [val2[0], val2[1] - count];
      }

      return { product, ...leftOver };
    };

    let [i, j] = [0, 0];
    let [val1, val2] = [arr1[i], arr2[j]];
    let result: number[][] = [];
    while (i < arr1.length && j < arr2.length) {
      const { product, leftOver1, leftOver2 } = multiply(val1, val2);

      result.push(product);

      if (leftOver1) {
        val1 = leftOver1;
      } else {
        i++;
        val1 = i < arr1.length ? arr1[i] : val1;
      }

      if (leftOver2) {
        val2 = leftOver2;
      } else {
        j++;
        val2 = j < arr2.length ? arr2[j] : val2;
      }
    }

    return result;
  }

  console.log(`:: Compressed Arrays Product Problem ::`);
  console.log();

  let arr1: number[][];
  let arr2: number[][];

  console.log(`--- Approach #1 ---`);
  console.log();

  arr1 = [
    [1, 3],
    [3, 2],
    [5, 4],
  ];
  arr2 = [
    [2, 4],
    [1, 5],
  ];
  console.log(`Array 1:`);
  console.log(arr1);
  console.log(`Array 2:`);
  console.log(arr2);
  console.log(`Product Array 1 x Array 2 will be:`);
  console.log(calculateProduct(arr1, arr2));
  console.log();

  arr1 = [[2, 3]];
  arr2 = [
    [1, 2],
    [2, 1],
  ];
  console.log(`Array 1:`);
  console.log(arr1);
  console.log(`Array 2:`);
  console.log(arr2);
  console.log(`Product Array 1 x Array 2 will be:`);
  console.log(calculateProduct(arr1, arr2));
  console.log();
}
