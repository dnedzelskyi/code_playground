namespace BinaryHeap {
  enum HeapType {
    MinHeap,
    MaxHeap,
  }

  interface IBinaryHeap<T> {
    size: number;
    readonly type: HeapType;

    insert(value: T): void;
    delete(value: T): void;
    search(value: T): boolean;

    peek(): T | undefined;
    extract(): T | undefined;

    print(): void;
  }

  class BinaryHeap<T> implements IBinaryHeap<T> {
    type: HeapType;

    private tree: T[];
    private heapCondition: (valueOne?: T, valueTwo?: T) => boolean;

    get size() {
      return this.tree.length;
    }

    constructor(heapType: HeapType = HeapType.MinHeap) {
      this.tree = [];
      this.type = heapType;
      this.heapCondition =
        this.type === HeapType.MaxHeap
          ? (a, b) => (a ?? 0) >= (b ?? 0)
          : (a, b) => (a ?? 0) <= (b ?? 0);
    }

    insert(value: T): void {
      this.tree.push(value);
      this.heapifyUp(this.size - 1);
    }

    delete(value: T): void {
      const valueIndex = this.findIndex(value);
      if (valueIndex === undefined) {
        return;
      }

      this.deleteNode(valueIndex);
    }

    search(value: T): boolean {
      return this.findIndex(value) !== undefined;
    }

    peek(): T | undefined {
      return this.size ? this.tree[0] : undefined;
    }

    extract(): T | undefined {
      return this.size > 0 ? this.deleteNode(0) : undefined;
    }

    print(): void {
      console.log(`Heap Size: ${this.size}`);
      let start = 0;
      while (start < this.size) {
        let values: (T | undefined)[] = [];
        for (let i = start; i <= 2 * start && i < this.tree.length; i++) {
          values.push(this.tree[i]);
        }

        console.log(values);

        start = 2 * start + 1;
      }
    }

    private findIndex(value: T): number | undefined {
      for (let i = 0; i < this.size; i++) {
        if (this.tree[i] === value) {
          return i;
        }
      }

      return undefined;
    }

    private deleteNode(i: number): T {
      if (i >= this.size) {
        throw Error('Out of bound exception');
      }

      const value = this.tree[i];
      const lastIndex = this.size - 1;
      const lastValue = this.tree.pop();

      if (lastValue !== undefined && lastIndex !== i && this.size > 0) {
        this.tree[i] = lastValue;
        this.heapifyDown(i);
      }

      return value;
    }

    private heapifyDown(i: number): void {
      const leftIndex = this.leftNode(i);
      const rightIndex = this.rightNode(i);

      if (leftIndex >= this.size || rightIndex >= this.size) {
        return;
      }

      const leftValue = this.tree[leftIndex];
      const rightValue = this.tree[rightIndex];
      const value = this.tree[i];

      if (this.heapCondition(leftValue, rightValue) && this.heapCondition(leftValue, value)) {
        this.tree[i] = leftValue;
        this.tree[leftIndex] = value;
        this.heapifyDown(leftIndex);
      } else if (
        this.heapCondition(rightValue, leftValue) &&
        this.heapCondition(rightValue, value)
      ) {
        this.tree[i] = rightValue;
        this.tree[rightIndex] = value;
        this.heapifyDown(rightIndex);
      }
    }

    private heapifyUp(i: number): void {
      if (i === 0 || i >= this.size) {
        return;
      }

      const parentNodeIndex = this.parentNode(i);
      const parentValue = this.tree[parentNodeIndex];
      const value = this.tree[i];

      if (!this.heapCondition(parentValue, value)) {
        this.tree[parentNodeIndex] = value;
        this.tree[i] = parentValue;
        this.heapifyUp(parentNodeIndex);
      }
    }

    private parentNode(i: number): number {
      return Math.floor((i - 1) / 2);
    }

    private leftNode(i: number): number {
      return 2 * i + 1;
    }

    private rightNode(i: number): number {
      return 2 * i + 2;
    }
  }

  console.log(':: Binary Heap Test ::');
  console.log('');

  console.log(':: Create Min Heap. :: ');
  const heap: IBinaryHeap<number> = new BinaryHeap<number>(HeapType.MinHeap);
  heap.print();
  console.log('');

  console.log(':: Heap insert. ::');
  heap.insert(10);
  heap.insert(33);
  heap.insert(25);
  heap.insert(7);
  heap.insert(71);
  heap.insert(70);
  heap.insert(20);
  heap.print();
  console.log('');

  console.log(':: Heap search. ::');
  console.log(`Search 100: ${heap.search(100)}`);
  console.log(`Search 7: ${heap.search(7)}`);
  console.log(`Search 71: ${heap.search(71)}`);
  console.log('');

  console.log(':: Heap peek. ::');
  console.log(`Peek: ${heap.peek()}`);
  console.log('');

  console.log(':: Heap delete. ::');
  console.log('Delete 25.');
  heap.delete(25);
  heap.print();
  console.log('Delete 10.');
  heap.delete(10);
  heap.print();
  console.log('');

  console.log(':: Heap extract. ::');
  console.log(`Extract: ${heap.extract()}`);
  heap.print();
  console.log(`Extract: ${heap.extract()}`);
  heap.print();
  console.log('');
}
