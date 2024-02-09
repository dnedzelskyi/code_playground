class Node:
  """Class to represent list nodes."""
  def __init__(self, value = None, next_node = None) -> None:
    self.value = value
    self.next_node = next_node

  def __str__(self) -> str:
    node, values = self, []
    
    while node:
      values.append(node.value)
      node = node.next_node
    
    return str(values)

def reverse(head: Node) -> Node:
  """
  Method for reversing linked list.

  Args:
    head: Head of linked list.

  Returns:
    Node: Pointer to the head of reversed list.
  """
  if head is None:
    raise TypeError("Head cannot be None.")
  
  prev, curr = None, head

  while curr:
    next_node = curr.next_node
    curr.next_node = prev
    prev = curr
    curr = next_node

  return prev

def main():
  head = Node(5, Node(-6, Node(4, Node(11, Node(-3)))))
  print(f"Original list: {head}")
  head = reverse(head)
  print(f"Reversed list: {head}")

if __name__ == "__main__":
  main()