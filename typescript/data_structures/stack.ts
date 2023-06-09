namespace Stack {
  type StackItem<T> = {
    value: T;
    next?: StackItem<T>;
  };

  class Stack<T> {
    private top?: StackItem<T> = undefined;

    push(value: T): void {
      const item: StackItem<T> = { value, next: this.top };
      this.top = item;
    }

    pop(): T | undefined {
      const item = this.top;
      this.top = item?.next;

      return item?.value;
    }

    peek(): T | undefined {
      return this.top?.value;
    }
  }
}
