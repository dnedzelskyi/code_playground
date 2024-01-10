/**
 * Methods used to implement heap data structure.
 */
namespace Heapify {
  /**
   * A function type representing a priority order comparison function.
   *
   * @template T - Heap value type.
   *
   * @param {T} firstNodeValue - The value of the first node.
   * @param {T} secondNodeValue - The value of the second node.
   * @returns {boolean} Returns 'true' if firstNodeValue > secondNodeValue, otherwise 'false'.
   */
  type PriorityOrderFunction<T> = (
    firstNodeValue: T,
    secondNodeValue: T,
  ) => boolean;

  /**
   * Push node down until it will be placed in the right position in the heap according to the priority order.
   *
   * @template T - Heap value type.
   *
   * @param {T} i - Node index.
   * @param {T[]} heap - Array representation of the heap.
   * @param {PriorityOrderFunction} priorityOrder - Heap priority order function.
   */
  function heapifyDown<T>(
    i: number,
    heap: T[],
    priorityOrder: PriorityOrderFunction<T>,
  ) {
    const { length: size } = heap;

    if (i < 0 || i >= size) {
      throw Error(`Invalid argument exception.`);
    }

    let keepHeapify = size > 0;
    while (keepHeapify) {
      // Set left and right child node indexes.
      const [l, r] = [2 * i + 1, 2 * i + 2];

      // Choose a node that satisfies the heap priority order the most.
      let p = i;
      if (l < size && !priorityOrder(heap[p], heap[l])) {
        p = l;
      }
      if (r < size && !priorityOrder(heap[p], heap[r])) {
        p = r;
      }

      // Stop, once the initial node is placed in the right position.
      if (p === i) {
        keepHeapify = false;
        continue;
      }

      // Push node down and proceed heapify.
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }

  /**
   * Push node up until it will be placed in the right position in the heap according to the priority order.
   *
   * @template T - Heap value type.
   *
   * @param {T} i - Node index.
   * @param {T[]} heap - Array representation of the heap.
   * @param {PriorityOrderFunction} priorityOrder - Heap priority order function.
   */
  function heapifyUp<T>(
    i: number,
    heap: T[],
    priorityOrder: PriorityOrderFunction<T>,
  ) {
    if (i < 0 || i >= heap.length) {
      throw Error(`Invalid argument exception.`);
    }

    // Set initial parent node index.
    let p = Math.floor((i - 1) / 2);

    // Bubble node up while priority order won't be satisfied.
    while (i > 0 && !priorityOrder(heap[p], heap[i])) {
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
      p = Math.floor((i - 1) / 2);
    }
  }

  /**
   * Extracts top element from the heap.
   *
   * @template T - Heap value type.
   *
   * @param {T[]} heap - Array representation of the heap.
   * @param {PriorityOrderFunction} priorityOrder - Heap priority order function.
   * @returns {T}
   */
  function poll<T>(
    heap: T[],
    priorityOrder: PriorityOrderFunction<T>,
  ): T | undefined {
    // Return undefined when heap is empty.
    if (heap.length === 0) {
      return undefined;
    }

    // Take top node value, replace it with last node value and adjust heap priority order.
    const [firstNode, lastNode] = [heap[0], heap.pop()];
    if (firstNode !== lastNode) {
      heap[0] = lastNode!;
      heapifyDown(0, heap, priorityOrder);
    }

    return firstNode;
  }

  console.log(':: Heapify Test ::');
  console.log('');

  const numbers = [4, 11, -3, 5, -1, -1, 0, 7, 2];

  console.log(':: MinHeap test.');
  let minHeap = new Array<number>();
  const minPriorityOrder = (a: number, b: number) => a < b;
  console.log(`Initial number list: [${numbers}]`);
  for (let val of [4, 11, -3, 5, -1, -1, 0, 7, 2]) {
    minHeap.push(val);
    heapifyUp(minHeap.length - 1, minHeap, minPriorityOrder);
  }
  console.log(`minHeap: [${minHeap}]`);
  console.log(`Extract min element: ${poll(minHeap, minPriorityOrder)}`);
  console.log(`minHeap: [${minHeap}]`);
  console.log(`Extract min element: ${poll(minHeap, minPriorityOrder)}`);
  console.log(`minHeap: [${minHeap}]`);
  console.log();

  console.log(':: MaxHeap test.');
  let maxHeap = new Array<number>();
  const maxPriorityOrder = (a: number, b: number) => a > b;
  console.log(`Initial number list: [${numbers}]`);
  for (let val of [4, 11, -3, 5, -1, -1, 0, 7, 2]) {
    maxHeap.push(val);
    heapifyUp(maxHeap.length - 1, maxHeap, maxPriorityOrder);
  }
  console.log(`maxHeap: [${maxHeap}]`);
  console.log(`Extract max element: ${poll(maxHeap, maxPriorityOrder)}`);
  console.log(`maxHeap: [${maxHeap}]`);
  console.log(`Extract max element: ${poll(maxHeap, maxPriorityOrder)}`);
  console.log(`maxHeap: [${maxHeap}]`);
  console.log();
}
