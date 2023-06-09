namespace BinaryTreeBreadthFirstSearchRecursive {
  type BinaryTreeNode<T> = {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
  };

  function bfs<T>(nodes: BinaryTreeNode<T>[], value: T): boolean {
    if (!nodes.length) {
      return false;
    }

    const nextNodes: BinaryTreeNode<T>[] = [];
    for (const node of nodes) {
      if (node.value === value) {
        return true;
      }
      node.left && nextNodes.push(node.left);
      node.right && nextNodes.push(node.right);
    }

    return bfs(nextNodes, value);
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

  console.log(`BFS for 12: ${bfs([binaryTree], 12)}`);
  console.log(`BFS for 5: ${bfs([binaryTree], 5)}`);
  console.log(`BFS for 4: ${bfs([binaryTree], 4)}`);
  console.log(`BFS for 77: ${bfs([binaryTree], 77)}`);
}
