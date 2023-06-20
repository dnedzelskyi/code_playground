namespace BinaryTreeUsingArray {
  enum TraverseBinaryTreeOrderType {
    PreOrder,
    InOrder,
    PostOrder,
  }

  interface IBinaryTree<T> {
    size: number;
    insert(value: T): void;
    delete(value: T): void;
    search(value: T): boolean;
    traverse(traverseOrder: TraverseBinaryTreeOrderType): T[];
    print(): void;
  }

  class BinaryTree<T> implements IBinaryTree<T> {
    size: number;
    private tree: (T | undefined)[];

    constructor() {
      this.tree = [];
      this.size = 0;
    }

    insert(value: T): void {
      // Insert value to the end if no gaps.
      if (this.tree.length === this.size) {
        this.tree.push(value);
        this.size++;
        return;
      }

      // Insert where first undefine occurs.
      for (let i = 0; i < this.tree.length; i++) {
        if (this.tree[i] === undefined) {
          this.tree[i] = value;
          this.size++;
          return;
        }
      }
    }

    delete(value: T): void {
      if (!this.tree.length) {
        return;
      }

      let deleteIndex: number | undefined = undefined;
      let replacementIndex: number | undefined = undefined;

      // Find index that needs to be deleted.
      for (let d = 0; d < this.tree.length; d++) {
        if (this.tree[d] === value) {
          deleteIndex = d;
          break;
        }
      }

      if (deleteIndex === undefined) {
        return;
      }

      // Find last node in node to delete sub-tree.
      let indexes = [deleteIndex];
      while (indexes.length) {
        replacementIndex = indexes.shift();

        if (replacementIndex === undefined) {
          continue;
        }

        let left = 2 * replacementIndex + 1;
        if (left < this.tree.length && this.tree[left] !== undefined) {
          indexes.push(left);
        }

        let right = 2 * replacementIndex + 2;
        if (right < this.tree.length && this.tree[right] !== undefined) {
          indexes.push(right);
        }
      }

      if (replacementIndex === undefined) {
        return;
      }

      // Delete and restructure the tree
      this.tree[deleteIndex] = this.tree[replacementIndex];
      if (replacementIndex === this.tree.length - 1) {
        this.tree.pop();
      } else {
        this.tree[replacementIndex] = undefined;
      }
      this.size--;
    }

    search(value: T): boolean {
      let start = 0;
      while (start < this.tree.length) {
        const end = 2 * start;

        for (let i = start; i <= end && i < this.tree.length; i++) {
          if (this.tree[i] === value) {
            return true;
          }
        }

        start = end + 1;
      }

      return false;
    }

    traverse(traverseOrder: TraverseBinaryTreeOrderType): T[] {
      const result: T[] = [];

      this.traverseNode(0, result, traverseOrder);

      return result;
    }

    print(): void {
      let start = 0;
      while (start < this.tree.length) {
        let values: (T | undefined)[] = [];
        for (let i = start; i <= 2 * start && i < this.tree.length; i++) {
          values.push(this.tree[i]);
        }

        console.log(values);

        start = 2 * start + 1;
      }
    }

    private traverseNode(
      nodeIndex: number,
      result: T[],
      order: TraverseBinaryTreeOrderType = TraverseBinaryTreeOrderType.InOrder,
    ): void {
      if (nodeIndex >= this.tree.length) {
        return;
      }

      const value = this.tree[nodeIndex];
      const left = 2 * nodeIndex + 1;
      const right = 2 * nodeIndex + 2;

      switch (order) {
        case TraverseBinaryTreeOrderType.PreOrder:
          value !== undefined && result.push(value);
          this.traverseNode(left, result, order);
          this.traverseNode(right, result, order);
          break;
        case TraverseBinaryTreeOrderType.InOrder:
          this.traverseNode(left, result, order);
          value !== undefined && result.push(value);
          this.traverseNode(right, result, order);
          break;
        case TraverseBinaryTreeOrderType.PostOrder:
          this.traverseNode(left, result, order);
          this.traverseNode(right, result, order);
          value !== undefined && result.push(value);
          break;
      }
    }
  }

  const tree: IBinaryTree<number> = new BinaryTree();

  tree.insert(5);
  tree.insert(10);
  tree.insert(3);
  tree.insert(0);
  tree.insert(1);
  tree.insert(2);
  tree.insert(3);
  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Delete 1.`);
  tree.delete(1);
  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Delete 10.`);
  tree.delete(10);
  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Insert 244.`);
  tree.insert(244);
  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Search for 0: ${tree.search(0)}`);
  console.log(`Search for 2: ${tree.search(2)}`);
  console.log(`Search for 7: ${tree.search(7)}`);
  console.log('');

  console.log(`Tree traverse PreOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PreOrder)}`);
  console.log(`Tree traverse InOrder: ${tree.traverse(TraverseBinaryTreeOrderType.InOrder)}`);
  console.log(`Tree traverse PostOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PostOrder)}`);
  console.log('');
}
