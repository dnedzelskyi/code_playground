namespace BinaryTreeBreadthFirstSearch {
  type BinaryTreeNode<T> = {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
  };

  function bfs<T>(root: BinaryTreeNode<T>, value: T): boolean {
    if (!root) {
      return false;
    }

    const nodesQueue: BinaryTreeNode<T>[] = [root];

    while (nodesQueue.length) {
      const node = nodesQueue.shift();
      if (node?.value === value) {
        return true;
      }
      node?.left && nodesQueue.push(node.left);
      node?.right && nodesQueue.push(node.right);
    }

    return false;
  }

  const binaryTree: BinaryTreeNode<number> = {
    value: 37,
    left: {
      value: 5,
      left: {
        value: 21,
      },
      right: {
        value: 7,
      },
    },
    right: {
      value: 11,
      left: {
        value: 9,
      },
      right: {
        value: 4,
        left: { value: 1 },
        right: { value: 12 },
      },
    },
  };

  console.log(`BFS for 12: ${bfs(binaryTree, 12)}`);
  console.log(`BFS for 5: ${bfs(binaryTree, 5)}`);
  console.log(`BFS for 4: ${bfs(binaryTree, 4)}`);
  console.log(`BFS for 77: ${bfs(binaryTree, 77)}`);
}
