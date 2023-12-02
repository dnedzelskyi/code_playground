namespace ResultPattern {
  /**
   * Wrapper to represent the outcome of an operation.
   *
   * @typeparam T - Type of the value.
   * @typeparam E - Type of errors.
   */
  class Result<T, E = Error> {
    /**
     * Gets the value if the result is successful.
     * @returns Successful value or undefined.
     */
    get Value(): T | undefined {
      return this._value;
    }
    /**
     * Gets an array of errors in case of failure.
     * @returns Errors or an empty array.
     */
    get Errors(): E[] {
      return this._errors;
    }
    /**
     * Check if result was successful (no errors).
     * @returns True if success, false otherwise.
     */
    get isSuccess(): boolean {
      return this._errors.length === 0;
    }

    /**
     * Creates a successful result.
     * @param value - value.
     * @returns Successful result.
     */
    public static success<T, E>(value: T): Result<T, E> {
      return new Result<T, E>(value);
    }

    /**
     * Creates a failed result.
     * @param errors - Array of errors.
     * @returns Failed result.
     */
    public static failure<T, E>(errors: E[]): Result<T, E> {
      return new Result<T, E>(undefined, errors);
    }

    /**
     * Private constructor.
     * @param _value - Optional value.
     * @param _errors - Optional errors.
     */
    private constructor(private _value?: T, private _errors: E[] = []) {}
  }

  console.log(':: Result Pattern Test ::');
  console.log('');

  const validateInput = (value: string): Result<string> => {
    if (value.length === 0) {
      return Result.failure([new Error('Error. Input is empty.')]);
    }

    if (value.length > 10) {
      return Result.failure([
        new Error('Error. Max length of 10 characters exceeded.'),
      ]);
    }

    return Result.success(value);
  };

  let input = '';
  console.log(`Input: '${input}'`);
  console.log(`Result:`);
  console.log(validateInput(input));
  console.log(``);

  input = `I know it's going to cause some problem`;
  console.log(`Input: '${input}'`);
  console.log(`Result:`);
  console.log(validateInput(input));
  console.log(``);

  input = `Success!!!`;
  console.log(`Input: '${input}'`);
  console.log(`Result:`);
  console.log(validateInput(input));
  console.log(``);
}
