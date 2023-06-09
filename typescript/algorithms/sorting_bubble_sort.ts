namespace SortingBubbleSort {
  function bubbleSort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j + 1 < arr.length - i; j++) {
        if (arr[j] > arr[j + 1]) {
          const value = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = value;
        }
      }
    }
  }

  let arr: number[] = [];
  console.log('For []:');
  bubbleSort(arr);
  console.log(arr);

  arr = [6];
  console.log('For [6]:');
  bubbleSort(arr);
  console.log(arr);

  arr = [9, 7, 3];
  console.log('For [9, 7, 3]:');
  bubbleSort(arr);
  console.log(arr);

  arr = [9, 7, 3, 11, 1, 5];
  console.log('For [9, 7, 3, 11, 1, 5]:');
  bubbleSort(arr);
  console.log(arr);
}
