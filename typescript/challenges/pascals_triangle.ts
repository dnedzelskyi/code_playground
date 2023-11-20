namespace PascalsTriangle {
  /*
    Given:
      Row number as n.
    Task:
      Calculate n-th row of Pascal's Triangle.
    Examples:
              1
            1   1
          1   2   1
        1   3   3   1
      1   4   6   4   1
      .................

      #1
      Input : 2
      Answer: [1, 1];
      
      #2
      Schedule : 6
      Answer: [1, 5, 10, 10, 5, 1]
  */

  enum CalcType {
    Recursive,
    Iterative,
  }

  function calcPascalsTriangleRow(
    row: number,
    calcType: CalcType = CalcType.Iterative,
  ): number[] {
    if (row < 1) {
      const msg = `Invalid argument row = ${row}.`;
      throw new Error(msg);
    }

    const result = new Array(row);

    for (let column = 0; column < row; column++) {
      result[column] =
        calcType === CalcType.Recursive
          ? calcPTValueRecursive(row, column + 1)
          : calcPTValueIterative(row, column + 1);
    }

    return result;
  }

  // Solution #1. Recursive approach.
  function calcPTValueRecursive(row: number, column: number): number {
    return column === 1 || row === column
      ? 1
      : calcPTValueRecursive(row - 1, column - 1) +
          calcPTValueRecursive(row - 1, column);
  }

  // Solution #2. Iterative approach.
  function calcPTValueIterative(row: number, column: number): number {
    let value = 1;

    for (let i = 1; i <= column - 1; i++) {
      value *= row - i;
      value /= i;
    }

    return value;
  }

  console.log(`:: Pascal's Triangle ::`);
  console.log();

  console.log(`> Recursive Approach.`);
  console.log();

  let rowNumber = 10;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Recursive));
  console.log();

  rowNumber = 1;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Recursive));
  console.log();

  rowNumber = 6;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Recursive));
  console.log();

  console.log(`> Iterative Approach.`);
  console.log();

  rowNumber = 10;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Iterative));
  console.log();

  rowNumber = 1;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Iterative));
  console.log();

  rowNumber = 20;
  console.log(`Pascal's Triangle ${rowNumber} row:`);
  console.log(calcPascalsTriangleRow(rowNumber, CalcType.Iterative));
  console.log();
}
