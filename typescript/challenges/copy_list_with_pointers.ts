namespace CopyListWithPointers {
  /*
  Given:
    Singly-linked list of numbers with a random pointers on some parts of itself.
    ListNode {
      val: number,
      next: ListNode | null,
      rand: ListNode | null,
    }
    A1 -> A2 -> A3 -> ... -> An such as Ai.rand = Ak.
  Task:
    Create a deep copy for current list.
  Examples:
    5 -> 3 -> 1 -> -7
      5.rand -> 1 -> -7
      3.rand -> null
      1.rand -> 3 -> 1 -> -7
      -7.rand -> 5 -> 3 -> 1 -> -7
  */

  type ListNode<T> = {
    val: T;
    next: ListNode<T> | null;
    rand: ListNode<T> | null;
  };

  function printList<T>(node: ListNode<T> | null) {
    let strBuilder: string[] = [];
    strBuilder.push(`${node?.val ?? null}`);
    while (node) {
      strBuilder.push(`${node?.next?.val ?? null}`);
      node = node.next;
    }

    console.log(strBuilder.join(' -> '));
  }

  // Approach #1 |
  /*
    1. Create new list and copy values and rand.
    2. Store association for each node to new node in dictionary.
    2. Iterate through new list and update rand using dictionary.
  */
  function copyList<T>(head: ListNode<T>): ListNode<T> {
    const oldNewMap = new Map<ListNode<T> | null, ListNode<T> | null>();
    const copyHead: ListNode<T> = {
      val: head.val,
      next: null,
      rand: head.rand,
    };

    // Create shallow copy.
    let node: ListNode<T> | null = copyHead;
    while (head.next) {
      head = head.next;
      let newNode: ListNode<T> = { val: head.val, next: null, rand: head.rand };
      oldNewMap.set(head, newNode);
      node.next = newNode;
      node = newNode;
    }

    // Update rand references.
    node = copyHead;
    while (node) {
      if (oldNewMap.has(node.rand)) {
        node.rand = oldNewMap.get(node.rand)!;
      }
      node = node.next;
    }

    return copyHead;
  }

  console.log(`:: Copy List With Pointers ::`);
  console.log();

  let node: ListNode<number> | null;
  const tail: ListNode<number> = { val: -7, next: null, rand: null };
  const node2: ListNode<number> = { val: 1, next: tail, rand: null };
  const node1: ListNode<number> = { val: 3, next: node2, rand: null };
  const head: ListNode<number> = { val: 5, next: node1, rand: node2 };

  node1.rand = null;
  node2.rand = node1;
  tail.rand = head;

  console.log(`Original List:`);
  printList(head);
  console.log(`Print original list rand values for each node:`);
  node = head;
  while (node) {
    console.log(`For node ${node.val}:`);
    printList(node.rand);
    node = node.next;
  }
  console.log();

  console.log(`Copied List:`);
  const listCopy = copyList(head);
  printList(copyList(head));

  console.log(`Print copied list rand values for each node.`);
  node = listCopy;
  while (node) {
    console.log(`For node ${node.val}:`);
    printList(node.rand);
    node = node.next;
  }
  console.log();
}
