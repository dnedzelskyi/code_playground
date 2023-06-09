function search(arr, value) {
  let index = 0;

  while (index < arr.length) {
    if (arr[index] === value) {
      return true;
    }
    index++;
  }

  return false;
}

console.log(search([], 7));
