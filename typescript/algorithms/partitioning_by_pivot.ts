namespace PartitioningByPivot {
  /**
   * Performs list partitioning or weak sorting by pivot value.
   *
   * @param {T} pivot - partition value.
   * @param {T[]} list - list of vales.
   * @param {number} start - start index of subarray that needs to be partitioned.
   * @param {number} end - end index of subarray that needs to be partitioned.
   * @returns {number} Partition index m such as list[i] <= pivot < list[m] <= list[j] for i < m < j.
   */
  function partition<T>(
    pivot: T,
    list: T[],
    start: number,
    end: number,
  ): number {
    let m = start;

    for (let i = start; i < end; i++) {
      if (list[i] <= pivot) {
        [list[m], list[i]] = [list[i], list[m]];
        m = m + 1;
      }
    }

    return m;
  }

  console.log(':: Partitioning By Pivot Test ::');
  console.log('');

  let p: number;
  let pivot: number | undefined = undefined;
  let arr: number[] = [];

  pivot = 1;
  arr = [2, 1, 2, 2, 1, 1];
  console.log(`Input array: [${arr}]`);
  console.log(`Partition by ${pivot}:`);
  p = partition(pivot, arr, 0, arr.length);
  console.log(`Partitioned array: [${arr}]`);
  console.log(`Pivot index: ${p}`);
  console.log('');

  pivot = 0;
  arr = [1, 0, 0, 2, 2, 0, 1, 0];
  console.log(`Input array: [${arr}]`);
  console.log(`Partition by ${pivot}:`);
  p = partition(pivot, arr, 0, arr.length);
  console.log(`Partitioned array: [${arr}]`);
  console.log(`Pivot index: ${p}`);
  console.log('');
}
