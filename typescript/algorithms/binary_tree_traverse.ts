namespace BinaryTreeTraverse {
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

  function traverseBinaryTreeNode<T>(
    node: BinaryTreeNode<T> | undefined,
    route: T[],
    orderType: TraverseBinaryTreeOrderType,
  ): void {
    if (!node) {
      return;
    }

    switch (orderType) {
      case TraverseBinaryTreeOrderType.PreOrder:
        route.push(node.value);
        traverseBinaryTreeNode(node.left, route, orderType);
        traverseBinaryTreeNode(node.right, route, orderType);
        break;
      case TraverseBinaryTreeOrderType.InOrder:
        traverseBinaryTreeNode(node.left, route, orderType);
        route.push(node.value);
        traverseBinaryTreeNode(node.right, route, orderType);
        break;
      case TraverseBinaryTreeOrderType.PostOrder:
      default:
        traverseBinaryTreeNode(node.left, route, orderType);
        traverseBinaryTreeNode(node.right, route, orderType);
        route.push(node.value);
        break;
    }
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

  let preOrderRoute: number[] = [];
  traverseBinaryTreeNode(binaryTree, preOrderRoute, TraverseBinaryTreeOrderType.PreOrder);
  console.log(`Pre Order case: ${preOrderRoute}`);

  let inOrderRoute: number[] = [];
  traverseBinaryTreeNode(binaryTree, inOrderRoute, TraverseBinaryTreeOrderType.InOrder);
  console.log(`In Order case: ${inOrderRoute}`);

  let postOrderRoute: number[] = [];
  traverseBinaryTreeNode(binaryTree, postOrderRoute, TraverseBinaryTreeOrderType.PostOrder);
  console.log(`Post Order case: ${postOrderRoute}`);
}
