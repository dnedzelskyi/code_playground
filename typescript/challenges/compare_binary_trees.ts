namespace CompareBinaryTrees {
  type BinaryTreeNode<T> = {
    value: T;
    left?: BinaryTreeNode<T>;
    right?: BinaryTreeNode<T>;
  };

  function compareTrees<T>(
    firstTreeNode?: BinaryTreeNode<T>,
    secondTreeNode?: BinaryTreeNode<T>,
  ): boolean {
    if (!firstTreeNode && !secondTreeNode) {
      return true;
    }

    if (!firstTreeNode || !secondTreeNode) {
      return false;
    }

    if (firstTreeNode.value !== secondTreeNode.value) {
      return false;
    }

    return (
      compareTrees(firstTreeNode.left, secondTreeNode.left) &&
      compareTrees(firstTreeNode.right, secondTreeNode.right)
    );
  }

  const binaryTree1: BinaryTreeNode<number> = {
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

  const binaryTree2: BinaryTreeNode<number> = {
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
        left: { value: 12 },
        right: { value: 1 },
      },
    },
  };

  console.log(`Tree 1 = Tree 1: ${compareTrees(binaryTree1, binaryTree1)}`);
  console.log(`Tree 1 = Tree 2: ${compareTrees(binaryTree1, binaryTree2)}`);
}
