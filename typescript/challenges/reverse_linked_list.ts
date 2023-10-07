namespace ReverseLinkedList {
  /*
    Given:
      Linked list.
    Task:
      Reverse linked list.
    Examples:
      #1
      Initial list : 7 -> 17
      Reversed list: 17 -> 7
      
      #2
      Initial list : 11 -> 5 -> 2 -> 24
      Reversed list: 24 -> 2 -> 5 -> 11
  */

  type ListNode = {
    value: number;
    next?: ListNode;
  };

  function reverseList(head?: ListNode): ListNode | undefined {
    let node: ListNode | undefined = undefined;

    while (head) {
      const next = head.next;
      head.next = node;
      node = head;
      head = next;
    }

    return node;
  }

  function printList(node?: ListNode) {
    const result: string[] = [];

    while (node !== undefined) {
      result.push(node.value.toString());
      node = node.next;
    }

    console.log(result.join(' -> '));
  }

  console.log(`:: Reverse Linked List Problem ::`);
  console.log();

  console.log(`Test #1`);
  let testList: ListNode | undefined = {
    value: 11,
    next: {
      value: 5,
      next: {
        value: 2,
        next: {
          value: 24,
        },
      },
    },
  };
  console.log(`Initial list:`);
  printList(testList);
  console.log(`Reversed list:`);
  let reversedTestList = reverseList(testList);
  printList(reversedTestList);
  console.log();

  console.log(`Test #2`);
  testList = undefined;
  console.log(`Initial list:`);
  printList(testList);
  console.log(`Reversed list:`);
  reversedTestList = reverseList(testList);
  printList(reversedTestList);
  console.log();

  console.log(`Test #3`);
  testList = { value: 3 };
  console.log(`Initial list:`);
  printList(testList);
  console.log(`Reversed list:`);
  reversedTestList = reverseList(testList);
  printList(reversedTestList);
  console.log();

  console.log(`Test #4`);
  testList = {
    value: 7,
    next: {
      value: 17,
    },
  };
  console.log(`Initial list:`);
  printList(testList);
  console.log(`Reversed list:`);
  reversedTestList = reverseList(testList);
  printList(reversedTestList);
  console.log();
}
