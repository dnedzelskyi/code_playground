namespace BinarySearchMinMax {
  type PredicateFunc<T> = (value: T) => boolean;

  /**
   * Binary search for solving min problems.
   *
   * @param {T[]} values - sorted values.
   * @param {PredicateFunc} predicate - function for evaluating conditions for the search.
   * @returns {number} Index of a smallest element the satisfies search conditions. -1 if it doesn't exist.
   * @template T type of provided values.
   */
  function binarySearchMin<T>(
    values: T[],
    predicate: PredicateFunc<T>,
  ): number {
    let [l, r, m] = [0, values.length - 1, -1];

    while (l <= r) {
      m = Math.floor(l + (r - l) / 2);
      [l, r] = predicate(values[m]) ? [l, m - 1] : [m + 1, r];
    }

    return predicate(values[l]) ? l : -1;
  }

  /**
   * Binary search for solving max problems.
   *
   * @param {T[]} values - sorted values.
   * @param {PredicateFunc} predicate - function for evaluating conditions for the search.
   * @returns {number} Index of a largest element the satisfies search conditions. -1 if it doesn't exist.
   * @template T type of provided values.
   */
  function binarySearchMax<T>(
    values: T[],
    predicate: PredicateFunc<T>,
  ): number {
    let [l, r, m] = [0, values.length - 1, -1];

    while (l <= r) {
      m = Math.floor(l + (r - l) / 2);
      [l, r] = predicate(values[m]) ? [m + 1, r] : [l, m - 1];
    }

    return predicate(values[r]) ? r : -1;
  }

  console.log(':: Binary Search for Min/Max problems ::');
  console.log('');

  let input: number[];
  let target: number;
  let index: number;

  console.log(`#1 Find left most insertion point for target.`);
  input = [2, 2, 4, 7, 7, 7, 10, 15, 22, 37, 37, 45, 50, 50];
  target = 7;
  console.log(`Input: ${input}, Length: ${input.length}`);
  console.log(`Target: ${target}`);
  index = binarySearchMin(input, (val) => val >= target);
  console.log(
    `Search index: ${index} / Search value: ${
      index > 0 ? input[index] : 'None'
    }`,
  );
  console.log('');

  console.log(`#2 Find index of min value that is > target.`);
  input = [2, 2, 4, 7, 7, 7, 10, 15, 22, 37, 37, 45, 50, 50];
  target = 7;
  console.log(`Input: ${input}, Length: ${input.length}`);
  console.log(`Target: ${target}`);
  index = binarySearchMin(input, (val) => val > target);
  console.log(
    `Search index: ${index} / Search value: ${
      index > 0 ? input[index] : 'None'
    }`,
  );
  console.log('');

  console.log(`#3 Find right most insertion point for target.`);
  input = [2, 2, 4, 7, 7, 7, 10, 15, 22, 37, 37, 45, 50, 50];
  target = 7;
  console.log(`Input: ${input}, Length: ${input.length}`);
  console.log(`Target: ${target}`);
  index = binarySearchMax(input, (val) => val <= target);
  console.log(
    `Search index: ${index} / Search value: ${
      index > 0 ? input[index] : 'None'
    }`,
  );
  console.log('');

  console.log(`#4 Find index of max value that is < target.`);
  input = [2, 2, 4, 7, 7, 7, 10, 15, 22, 37, 37, 45, 50, 50];
  target = 7;
  console.log(`Input: ${input}, Length: ${input.length}`);
  console.log(`Target: ${target}`);
  index = binarySearchMax(input, (val) => val < target);
  console.log(
    `Search index: ${index} / Search value: ${
      index > 0 ? input[index] : 'None'
    }`,
  );
  console.log('');
}
