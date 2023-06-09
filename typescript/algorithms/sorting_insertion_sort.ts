namespace SortingInsertionSort {
  function insertionSort<T>(arr: T[]): void {
    for (let i = 1; i < arr.length; i++) {
      const pivot = arr[i];

      let j = i - 1;
      while (j >= 0 && arr[j] > pivot) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }

      arr[j + 1] = pivot;
    }
  }

  let arr: number[] = [];
  console.log(`For ${arr}:`);
  insertionSort(arr);
  console.log(arr);

  arr = [6];
  console.log(`For ${arr}:`);
  insertionSort(arr);
  console.log(arr);

  arr = [9, 7, 3];
  console.log(`For ${arr}:`);
  insertionSort(arr);
  console.log(arr);

  arr = [3, 7, 1, 0, 7, 10, 2, 5];
  console.log(`For ${arr}:`);
  insertionSort(arr);
  console.log(arr);
}
