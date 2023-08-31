namespace PartitioningByMultipleConditions {
  /**
   * Performs list partitioning or weak sorting by multiple conditions.
   *
   * @param {((val: T) => boolean)[]} conditions - partition conditions.
   * @param {T[]} list - list of vales.
   * @param {number} start - start index of subarray.
   * @param {number} end - end index of subarray.
   * @returns {number[]} Partition indexes for each conditions.
   */
  function partition<T>(
    conditions: ((val: T) => boolean)[],
    list: T[],
    start: number,
    end: number,
  ): number[] {
    if (!conditions.length) {
      return [];
    }

    // Create pointers for each condition.
    const pointers = new Array(conditions.length).fill(start);

    // Loop through all condition.
    for (let i = 0; i < conditions.length; i++) {
      // Start from where the last pointer stopped.
      const jStart = i > 0 ? pointers[i - 1] : start;
      pointers[i] = jStart;

      // Sort list according to condition.
      for (let j = jStart; j < end; j++) {
        const value = list[j];
        if (conditions[i](value)) {
          [list[j], list[pointers[i]]] = [list[pointers[i]], list[j]];
          pointers[i] = pointers[i] + 1;
        }
      }
    }

    // Return indexes for each partition.
    return pointers;
  }

  console.log(':: Partitioning By Multiple Conditions Test ::');
  console.log('');

  let conditions: ((val: number) => boolean)[] = [];
  let arr: number[] = [];
  let indexes: number[] = [];

  arr = [2, 0, 2, 1, 1, 0];
  conditions = [
    (val) => val <= 0,
    (val) => 0 < val && val <= 1,
    (val) => 1 < val && val <= 2,
  ];
  console.log(`Input array: [${arr}]`);
  console.log(`Partition by 0, 1, and 2:`);
  indexes = partition(conditions, arr, 0, arr.length);
  console.log(`Partitioned array: [${arr}]`);
  console.log(`Pivot index: ${indexes}`);
  console.log('');

  arr = [2, 0, 2, 0, 3, 1, 1, 0, 3, 2];
  conditions = [
    (val) => val >= 3,
    (val) => 3 > val && val >= 2,
    (val) => 2 > val && val >= 1,
    (val) => 1 > val && val >= 0,
  ];
  console.log(`Input array: [${arr}]`);
  console.log(`Partition by 3, 2, 1, and 0:`);
  indexes = partition(conditions, arr, 0, arr.length);
  console.log(`Partitioned array: [${arr}]`);
  console.log(`Pivot index: ${indexes}`);
  console.log('');
}
