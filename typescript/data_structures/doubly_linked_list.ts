namespace DoublyLinkedList {
  type DoublyLinkedListNode<T> = {
    value: T;
    next?: DoublyLinkedListNode<T>;
    prev?: DoublyLinkedListNode<T>;
  };

  class DoublyLinkedList<T> {
    private head?: DoublyLinkedListNode<T>;
    private tail?: DoublyLinkedListNode<T>;
    size: number;

    constructor() {
      this.head = this.tail = undefined;
      this.size = 0;
    }

    append(value: T): void {
      const newNode: DoublyLinkedListNode<T> = { value, prev: this.tail, next: undefined };

      this.size++;

      if (this.tail === undefined) {
        this.head = newNode;
        this.tail = newNode;
        return;
      }

      this.tail.next = newNode;
      this.tail = newNode;
    }

    prepend(value: T): void {
      const newNode: DoublyLinkedListNode<T> = { value, prev: undefined, next: this.head };

      this.size++;

      if (this.head === undefined) {
        this.head = newNode;
        this.tail = newNode;
        return;
      }

      this.head.prev = newNode;
      this.head = newNode;
    }

    insertAt(value: T, index: number): void {
      const node = this.getByIndex(index);
      const newNode: DoublyLinkedListNode<T> = { value, prev: node?.prev, next: node };

      if (node === this.head) {
        this.head = newNode;
      }

      if (node === this.tail) {
        this.tail = newNode;
      }

      if (node?.prev) {
        node.prev.next = newNode;
        node.prev = newNode;
      }

      this.size++;
    }

    removeAt(index: number): T | undefined {
      const node = this.getByIndex(index);

      if (!node) {
        return undefined;
      }

      if (node === this.head) {
        this.head = node?.next;
      }

      if (node === this.tail) {
        this.tail = node?.prev;
      }

      if (node?.prev) {
        node.prev.next = node?.next;
      }

      if (node?.next) {
        node.next.prev = node?.prev;
      }

      this.size--;

      return node?.value;
    }

    get(index: number): T | undefined {
      const node = this.getByIndex(index);

      return node?.value;
    }

    remove(value: T): T | undefined {
      const [node] = this.getByValue(value);

      if (!node) {
        return undefined;
      }

      if (node === this.head) {
        this.head = node?.next;
      }

      if (node === this.tail) {
        this.tail = node?.prev;
      }

      if (node.prev) {
        node.prev.next = node?.next;
      }

      if (node.next) {
        node.next.prev = node?.prev;
      }

      this.size--;

      return node?.value;
    }

    find(value: T): number | undefined {
      const [, index] = this.getByValue(value);

      return index;
    }

    print() {
      console.log(`List size: ${this.size}`);

      let node = this.head;
      let listAsString = 'Empty';
      while (node !== undefined) {
        listAsString =
          listAsString !== 'Empty' ? `${listAsString} <-> (${node?.value})` : `(${node?.value})`;
        node = node?.next;
      }
      console.log(`List: ${listAsString}`);
    }

    private getByIndex(index: number): DoublyLinkedListNode<T> | undefined {
      if (index < 0 || index >= this.size) {
        throw new Error('Out of boundaries exception');
      }

      let k = 0;
      let node = this.head;

      while (k < index) {
        node = node?.next;
        k++;
      }

      return node;
    }

    private getByValue(value: T): [DoublyLinkedListNode<T> | undefined, number | undefined] {
      let k = 0;
      let node = this.head;

      while (node?.value !== value && node !== undefined) {
        node = node?.next;
        k++;
      }

      return node?.value === value ? [node, k] : [undefined, undefined];
    }
  }

  const doublyLinkedList1 = new DoublyLinkedList<number>();

  doublyLinkedList1.print();

  doublyLinkedList1.append(4);
  doublyLinkedList1.append(7);
  doublyLinkedList1.append(15);

  doublyLinkedList1.print();

  doublyLinkedList1.prepend(10);
  doublyLinkedList1.prepend(6);
  doublyLinkedList1.prepend(2);

  doublyLinkedList1.print();

  doublyLinkedList1.insertAt(11, 0);
  doublyLinkedList1.insertAt(3, 3);
  doublyLinkedList1.insertAt(13, 7);

  doublyLinkedList1.print();

  doublyLinkedList1.removeAt(7);
  doublyLinkedList1.removeAt(3);
  doublyLinkedList1.removeAt(0);

  doublyLinkedList1.print();

  console.log(`getAt(0): ${doublyLinkedList1.get(0)}`);
  console.log(`getAt(3): ${doublyLinkedList1.get(3)}`);
  console.log(`getAt(5): ${doublyLinkedList1.get(5)}`);

  doublyLinkedList1.remove(15);
  doublyLinkedList1.remove(10);
  doublyLinkedList1.remove(2);

  doublyLinkedList1.print();

  console.log(`find(6): ${doublyLinkedList1.find(6)}`);
  console.log(`find(4): ${doublyLinkedList1.find(4)}`);
  console.log(`find(7): ${doublyLinkedList1.find(7)}`);

  doublyLinkedList1.removeAt(0);
  doublyLinkedList1.removeAt(0);
  doublyLinkedList1.removeAt(0);

  doublyLinkedList1.print();

  doublyLinkedList1.append(3);
  doublyLinkedList1.prepend(4);
  doublyLinkedList1.append(2);

  doublyLinkedList1.print();
}
