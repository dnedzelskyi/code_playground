/**
 * Simple implementation of JS unit test runner.
 *
 */

/**
 * Utility object for running tests.
 */
const TestRunner = {
  _suite: [],

  /**
   * Method for adding new tests to the test suite.
   * @param {string} name Test name.
   * @param {Function} fn Test function.
   */
  test(name, fn) {
    this._suite.push({ name, fn });
  },

  /**
   * Method for executing all tests.
   * @async
   */
  async run() {
    // Create test jobs.
    const jobs = this._suite.map(
      (task) =>
        new Promise((resolve, reject) => {
          try {
            task.fn?.();
            resolve(`Test: ${task.name}`);
          } catch (e) {
            reject(`Test: ${task.name} | Expected: ${e.message}`);
          }
        }),
    );

    // Await until every job gets settled.
    const results = await Promise.allSettled(jobs);

    // Print and clean-up.
    this._print(results);
    this._suite = [];
  },

  _print(results) {
    const [succeeded, failed] = [
      results.filter((r) => r.status === 'fulfilled').map((r) => r.value),
      results.filter((r) => r.status === 'rejected').map((r) => r.reason),
    ];

    console.log(`Test Run Summary`, '\n');
    console.log(
      `Total: ${results.length} | Succeeded: ${succeeded.length} | Failed: ${failed.length}`,
      '\n',
    );
    console.log(`Succeeded:`);
    console.log(succeeded.join('\n'), '\n');
    console.log(`Failed:`);
    console.log(failed.join('\n'), '\n');
  },
};

// Auxiliary assertion function.
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log(':: Unit Test Runner Test ::');
console.log('');

TestRunner.test('Test #1', () => {
  assert(1 == 4, '1 is 4');
});

TestRunner.test('Test #2', () => {
  const obj = { id: 10 };

  assert(obj.id === 10, 'Obj id is 10');
});

TestRunner.test('Test #3', () => {
  const add = (a, b) => a + b;

  assert(add(2, 2) === 4, 'add(2, 2) = 4');
});

TestRunner.run();
