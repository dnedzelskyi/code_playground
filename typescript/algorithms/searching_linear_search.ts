namespace SearchingLinearSearch {
  function linearSearch(arr: number[], value: number): boolean {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
        return true;
      }
    }

    return false;
  }

  console.log(`Search for 1 in []: ${linearSearch([], 1)}`);
  console.log(`Search for 3 in [5, 11, 0]: ${linearSearch([5, 11, 0], 3)}`);
  console.log(`Search for 6 in [3, 1, 9, 6, 10, 0]: ${linearSearch([3, 1, 9, 6, 10, 0], 6)}`);
}
