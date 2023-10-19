namespace SwapsToAlignArraySums {
  /*
    Given:
      Numeric arrays A and B.  
    Task:
      Check if there exists such an elements from A and B that will lead to Sum(A) = Sum(B) after their swap.
      Return such pairs.
    Examples:
      #1
      Array A : [2, 5, 1]
      Array B : [4, 2, 4]
      Result: [[2, 1]]
  */

  function findSwaps(arr1: number[], arr2: number[]): number[][] {
    // Calculate sums and declare lookup set.
    const [sum1, sum2, lookup] = [
      arr1.reduce((p, c) => c + p, 0),
      arr2.reduce((p, c) => c + p, 0),
      new Set(arr1),
    ];
    let res: number[][] = [];

    // From B[j] - A[i] = (S2 - S1) / 2.
    // If odd then return right away.
    if ((sum2 - sum1) % 2 !== 0) {
      return [];
    }

    // Iterate through B and check if A contains appropriate A[i] = B[j] - d.
    const d = (sum2 - sum1) / 2;
    for (let k = 0; k < arr2.length; k++) {
      lookup.has(arr2[k] - d) && res.push([arr2[k] - d, arr2[k]]);
    }

    return res;
  }

  console.log(`:: Swaps To Align Array Sums Test ::`);
  console.log();

  let arr1: number[];
  let arr2: number[];

  arr1 = [2, 5, 1];
  arr2 = [4, 2, 4];
  console.log(`Array 1:`);
  console.log(arr1);
  console.log(`Array 2:`);
  console.log(arr2);
  console.log(`Result:`);
  console.log(findSwaps(arr1, arr2));
  console.log();

  arr1 = [2, 11, 1, 0, 3];
  arr2 = [5, 10, 0];
  console.log(`Array 1:`);
  console.log(arr1);
  console.log(`Array 2:`);
  console.log(arr2);
  console.log(`Result:`);
  console.log(findSwaps(arr1, arr2));
  console.log();
}
