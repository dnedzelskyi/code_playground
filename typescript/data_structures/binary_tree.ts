namespace BinaryTree {
  enum TraverseBinaryTreeOrderType {
    PreOrder,
    InOrder,
    PostOrder,
  }

  type BinaryTreeNode<T> = {
    value: T;
    parent?: BinaryTreeNode<T>;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
  };

  interface IBinaryTree<T> {
    size: number;
    insert(value: T): void;
    delete(value: T): void;
    search(value: T): boolean;
    traverse(traverseOrder: TraverseBinaryTreeOrderType): T[];
    print(nodes?: BinaryTreeNode<T>[]): void;
  }

  class BinaryTree<T> implements IBinaryTree<T> {
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

      this.insertNode(newNode, [this.root]);
    }

    delete(value: T): void {
      if (!this.root) {
        return;
      }

      let nodes: BinaryTreeNode<T>[] = [this.root];
      let nodeToDelete: BinaryTreeNode<T> | undefined = undefined;
      let replacementNode: BinaryTreeNode<T> | undefined = undefined;

      // Find node to delete.
      while (nodes.length) {
        const node = nodes.shift();

        if (!node) {
          continue;
        }

        if (node.value === value) {
          nodeToDelete = node;
          break;
        }

        node.left && nodes.push(node.left);
        node.right && nodes.push(node.right);
      }

      if (!nodeToDelete) {
        return;
      }

      // Find last node in node to delete sub-tree.
      nodes = [nodeToDelete];
      while (nodes.length) {
        replacementNode = nodes.shift();

        if (!replacementNode) {
          continue;
        }

        replacementNode.left && nodes.push(replacementNode.left);
        replacementNode.right && nodes.push(replacementNode.right);
      }

      if (!replacementNode) {
        return;
      }

      // Delete and restructure the tree
      if (replacementNode.parent) {
        if (replacementNode.parent.right === replacementNode) {
          replacementNode.parent.right = undefined;
        } else {
          replacementNode.parent.left = undefined;
        }

        replacementNode.parent = undefined;
      }

      nodeToDelete.value = replacementNode.value;

      this.size--;
    }

    search(value: T): boolean {
      if (!this.root) {
        return false;
      }

      const nodes: BinaryTreeNode<T>[] = [this.root];

      while (nodes.length) {
        const node = nodes.shift();
        if (node && node.value === value) {
          return true;
        }

        node?.left && nodes.push(node.left);
        node?.right && nodes.push(node.right);
      }

      return false;
    }

    traverse(order: TraverseBinaryTreeOrderType = TraverseBinaryTreeOrderType.InOrder): T[] {
      const result: T[] = [];

      this.traverseNode(this.root, result, order);

      return result;
    }

    print(nodes: BinaryTreeNode<T>[] = this.root ? [this.root] : []): void {
      if (!nodes.length) {
        return;
      }

      const newNodes: BinaryTreeNode<T>[] = [];
      const values: T[] = [];
      for (const node of nodes) {
        values.push(node.value);
        node.left && newNodes.push(node.left);
        node.right && newNodes.push(node.right);
      }
      values.length && console.log(values);

      this.print(newNodes);
    }

    private insertNode(newNode: BinaryTreeNode<T>, nodes: BinaryTreeNode<T>[]): void {
      if (!nodes.length) {
        return;
      }

      const newNodes: BinaryTreeNode<T>[] = [];

      for (const node of nodes) {
        if (!node.left) {
          newNode.parent = node;
          node.left = newNode;
          this.size++;
          return;
        }
        newNodes.push(node.left);

        if (!node.right) {
          newNode.parent = node;
          node.right = newNode;
          this.size++;
          return;
        }
        newNodes.push(node.right);
      }

      this.insertNode(newNode, newNodes);
    }

    private traverseNode(
      node: BinaryTreeNode<T> | undefined,
      result: T[],
      order: TraverseBinaryTreeOrderType = TraverseBinaryTreeOrderType.InOrder,
    ): void {
      if (!node) {
        return;
      }

      switch (order) {
        case TraverseBinaryTreeOrderType.PreOrder:
          result.push(node.value);
          this.traverseNode(node.left, result, order);
          this.traverseNode(node.right, result, order);
          break;
        case TraverseBinaryTreeOrderType.InOrder:
          this.traverseNode(node.left, result, order);
          result.push(node.value);
          this.traverseNode(node.right, result, order);
          break;
        case TraverseBinaryTreeOrderType.PostOrder:
          this.traverseNode(node.left, result, order);
          this.traverseNode(node.right, result, order);
          result.push(node.value);
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
  console.log('');

  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Delete 2.`);
  tree.delete(2);
  console.log(`Tree size: ${tree.size}`);
  tree.print();
  console.log('');

  console.log(`Search for 0: ${tree.search(0)}`);
  console.log(`Search for 2: ${tree.search(2)}`);
  console.log('');

  console.log(`Tree traverse PreOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PreOrder)}`);
  console.log(`Tree traverse InOrder: ${tree.traverse(TraverseBinaryTreeOrderType.InOrder)}`);
  console.log(`Tree traverse PostOrder: ${tree.traverse(TraverseBinaryTreeOrderType.PostOrder)}`);
  console.log('');
}
