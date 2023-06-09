namespace Queue {
  type QueueItem<T> = {
    value: T;
    next?: QueueItem<T>;
  };

  class Queue<T> {
    private head?: QueueItem<T>;
    private tail?: QueueItem<T>;

    constructor() {
      this.head = this.tail = undefined;
    }

    public enqueue(value: T): void {
      const item: QueueItem<T> = { value };

      if (!this.tail) {
        this.tail = this.head = item;
        return;
      }

      this.tail.next = item;
      this.tail = item;
    }

    public dequeue(): T | undefined {
      if (!this.head) {
        return undefined;
      }

      const item = this.head;

      if (this.tail === this.head) {
        this.head = this.tail = undefined;
        return item.value;
      }

      this.head = item.next;
      item.next = undefined;

      return item.value;
    }

    public peek(): T | undefined {
      return this.head?.value;
    }

    public print(): string {
      let queue = `(${this.head?.value})`;
      let next = this.head?.next;

      while (next) {
        queue = `${queue} -> (${next.value})`;
        next = next.next;
      }

      return queue;
    }
  }

  const queue1 = new Queue<number>();
  console.log(`Queue 1: ${queue1?.print()}`);

  const queue2 = new Queue<number>();
  queue2.enqueue(5);
  queue2.enqueue(1);
  queue2.enqueue(77);
  console.log(`Queue 2: ${queue2.print()}`);

  const queue3 = new Queue<number>();
  queue3.enqueue(7);
  queue3.enqueue(2);
  queue3.enqueue(4);
  console.log(`Queue 3: ${queue3.print()}`);
  console.log(`Queue 3, dequeue: ${queue3.dequeue()}`);
  console.log(`Queue 3: ${queue3.print()}`);
  console.log(`Queue 3, dequeue: ${queue3.dequeue()}`);
  console.log(`Queue 3, dequeue: ${queue3.dequeue()}`);
  console.log(`Queue 3, dequeue: ${queue3.dequeue()}`);
  console.log(`Queue 3: ${queue3.print()}`);
}
