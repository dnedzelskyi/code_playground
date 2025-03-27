namespace QuickSelect {
  function partition<T>(arr: T[], l: number, r: number, p: number): number {
    let pivotValue = arr[p];
    [arr[p], arr[r], p] = [arr[r], arr[p], l];

    for (let i = l; i < r; i++) {
      if (arr[i] < pivotValue) {
        [arr[p], arr[i]] = [arr[i], arr[p]];
        p++;
      }
    }

    [arr[p], arr[r]] = [arr[r], arr[p]];
    return p;
  }

  function quickSelect<T>(
    arr: T[],
    k: number,
    l: number = 0,
    r: number = arr.length - 1,
  ): T {
    // Base case.
    if (l === r) {
      return arr[l];
    }

    // Choose pivot
    let p = partition(arr, l, r, Math.floor(l + (r - l) / 2));

    // Get k-th smallest
    if (p === k) {
      return arr[k];
    } else if (k < p) {
      return quickSelect(arr, k, l, p - 1);
    } else {
      return quickSelect(arr, k, p + 1, r);
    }
  }

  console.log(':: QuickSelect Test ::');
  console.log('');

  let arr = [-5, 2, 0, 2, -10, 7, 4, -1, 3, 2, 1];

  console.log(`Input array: [${arr}]`);

  console.log(`Quick select 4-th smallest: ${quickSelect(arr, 3)}`);
  console.log(`Quick select 6-th smallest: ${quickSelect(arr, 5)}`);
  console.log(`Quick select 11-th smallest: ${quickSelect(arr, 10)}`);
}
