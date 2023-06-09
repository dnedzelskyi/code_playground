namespace SortingQuickSort {
  function swap<T>(arr: T[], i: number, j: number): void {
    const value = arr[j];
    arr[j] = arr[i];
    arr[i] = value;
  }

  function partition<T>(arr: T[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        swap(arr, i, j);
      }
    }

    i++;
    swap(arr, i, right);

    return i;
  }

  function quickSort<T>(arr: T[], left: number = 0, right: number = arr.length - 1): void {
    if (arr.length <= 1 || left >= right) {
      return;
    }

    const pivotIndex = partition(arr, left, right);

    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }

  let arr: number[] = [];
  console.log(`For ${arr}:`);
  quickSort(arr);
  console.log(arr);

  arr = [6];
  console.log(`For ${arr}:`);
  quickSort(arr);
  console.log(arr);

  arr = [9, 7, 3];
  console.log(`For ${arr}:`);
  quickSort(arr);
  console.log(arr);

  arr = [3, 7, 1, 0, 7, 10, 2, 5];
  console.log(`For ${arr}:`);
  quickSort(arr);
  console.log(arr);
}
