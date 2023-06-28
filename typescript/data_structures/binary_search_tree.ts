namespace BinarySearchTree {
  type BinaryTreeNode<T> = {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
  };

  enum TraverseBinaryTreeOrderType {
    PreOrder,
    InOrder,
    PostOrder,
  }

  interface IBinarySearchTree<T> {
    size: number;
    insert(value: T): void;
    delete(value: T): void;
    search(value: T): boolean;
    traverse(order: TraverseBinaryTreeOrderType): T[];
    print(): void;
  }

  class BinarySearchTree<T> implements IBinarySearchTree<T> {
    root?: BinaryTreeNode<T>;
    size: number;

    constructor() {
      this.root = undefined;
      this.size = 0;
    }

    insert(value: T): void {
      const newNode: BinaryTreeNode<T> = { value };

      if (!this.root) {
        this.root = newNode;
        this.size++;
        return;
      }

      this.insertNode(newNode, this.root);
    }

    private insertNode(newNode: BinaryTreeNode<T>, parent?: BinaryTreeNode<T>): void {
      if (!parent || !newNode) {
        return;
      }

      if (parent.value <= newNode.value) {
        if (!parent.right) {
          parent.right = newNode;
          this.size++;
          return;
        }

        this.insertNode(newNode, parent.right);
      } else {
        if (!parent.left) {
          parent.left = newNode;
          this.size++;
          return;
        }

        this.insertNode(newNode, parent.left);
      }
    }

    delete(value: T): void {
      this.root = this.deleteNode(this.root, value);
    }

    private deleteNode(
      node: BinaryTreeNode<T> | undefined,
      value: T,
    ): BinaryTreeNode<T> | undefined {
      if (!node) {
        return undefined;
      }

      if (value < node.value) {
        node.left = this.deleteNode(node.left, value);
      } else if (value > node.value) {
        node.right = this.deleteNode(node.right, value);
      } else {
        // Node to deleted has been found

        // Case with one or no child
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }

        // Case with two children
        const successor = this.findMinNode(node.right);
        node.value = successor.value;
        node.right = this.deleteNode(node.right, successor.value);
      }

      return node;
    }

    private findMinNode(node: BinaryTreeNode<T>): BinaryTreeNode<T> {
      if (!node.left) {
        return node;
      }

      return this.findMinNode(node.left);
    }

    search(value: T): boolean {
      const node = this.searchNode(this.root, value);
      return !!node;
    }

    private searchNode<T>(
      node: BinaryTreeNode<T> | undefined,
      value: T,
    ): BinaryTreeNode<T> | undefined {
      if (!node || node.value === value) {
        return node;
      } else if (value > node.value) {
        return this.searchNode(node.right, value);
      } else {
        return this.searchNode(node.left, value);
      }
    }

    traverse(order: TraverseBinaryTreeOrderType): T[] {
      const values: T[] = [];

      this.traverseNode(this.root, values, order);

      return values;
    }

    private traverseNode(
      node: BinaryTreeNode<T> | undefined,
      values: T[],
      order: TraverseBinaryTreeOrderType = TraverseBinaryTreeOrderType.InOrder,
    ) {
      if (!node) {
        return;
      }

      switch (order) {
        case TraverseBinaryTreeOrderType.PreOrder:
          values.push(node.value);
          this.traverseNode(node.left, values, order);
          this.traverseNode(node.right, values, order);
          break;
        case TraverseBinaryTreeOrderType.InOrder:
        default:
          this.traverseNode(node.left, values, order);
          values.push(node.value);
          this.traverseNode(node.right, values, order);
          break;
        case TraverseBinaryTreeOrderType.PostOrder:
          this.traverseNode(node.left, values, order);
          this.traverseNode(node.right, values, order);
          values.push(node.value);
          break;
      }
    }

    print(): void {
      const depth = this.findDepth(this.root);
      console.log(`Tree size: ${this.size}`);
      console.log(`Tree depth: ${depth}`);

      if (!this.root) {
        console.log('Tree is empty.');
        return;
      }

      this.printNodes([this.root], depth, 1);
    }

    private printNodes(nodes: (BinaryTreeNode<T> | undefined)[], depth: number, level: number) {
      if (nodes.every((node) => node === undefined)) {
        return;
      }

      const nextNodes: (BinaryTreeNode<T> | undefined)[] = [];
      const gap = '   '.repeat(Math.pow(2, depth - level + 1) - 1);
      let treeLevel = '   '.repeat(Math.pow(2, depth - level) - 1);

      for (const node of nodes) {
        treeLevel += `[${node ? node?.value : '_'}]${gap}`;
        nextNodes.push(node?.left);
        nextNodes.push(node?.right);
      }

      console.log(treeLevel);
      level++;
      this.printNodes(nextNodes, depth, level);
    }

    private findDepth(node: BinaryTreeNode<T> | undefined): number {
      if (!node) {
        return 0;
      }

      const leftDepth = this.findDepth(node.left);
      const rightDepth = this.findDepth(node.right);

      return Math.max(leftDepth, rightDepth) + 1;
    }
  }

  console.log(':: Binary Search Tree Test ::');
  console.log('');

  console.log('Create new Tree.');
  const tree: IBinarySearchTree<number> = new BinarySearchTree<number>();
  tree.print();
  console.log('');

  console.log('Insert Items to the Tree.');
  tree.insert(12);
  tree.insert(3);
  tree.insert(40);
  tree.insert(7);
  tree.insert(15);
  tree.insert(77);
  tree.insert(5);
  tree.insert(68);
  tree.insert(105);
  tree.insert(225);
  tree.print();
  console.log('');

  console.log('Search through the Tree.');
  console.log(`Search for 225: ${tree.search(225)}`);
  console.log(`Search for 7: ${tree.search(7)}`);
  console.log(`Search for 11: ${tree.search(11)}`);
  console.log('');

  console.log('Traverse through the Tree.');
  console.log(`Tree traverse PreOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PreOrder)}`);
  console.log(`Tree traverse InOrder: ${tree.traverse(TraverseBinaryTreeOrderType.InOrder)}`);
  console.log(`Tree traverse PostOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PostOrder)}`);
  console.log('');

  console.log('Delete values from Tree.');
  console.log('Delete: 225');
  tree.delete(225);
  tree.print();
  console.log('Delete: 40');
  tree.delete(40);
  tree.print();
  console.log('Delete: 12');
  tree.delete(12);
  tree.print();
  console.log('');
}
