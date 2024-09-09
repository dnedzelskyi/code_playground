import heapq

class MedianTracker:
  def __init__(self):
    # left_q - max queue, right_q - min queue.
    self.left_q = []
    self.right_q = []

  def add(self, val: int):
    # Add new value and balance heaps.
    heapq.heappush(self.left_q, -val)
    heapq.heappush(self.right_q, -heapq.heappop(self.left_q))
    if len(self.left_q) < len(self.right_q):
      heapq.heappush(self.left_q, -heapq.heappop(self.right_q))
  
  def get_median(self) -> float:
    if (len(self.left_q) == len(self.right_q)):
      return (self.right_q[0] - self.left_q[0]) / 2.0
    
    return -self.left_q[0]

def main():
  tracker = MedianTracker()

  print(":: Median of dynamic sequence ::")
  print()

  tracker.add(-5)
  print(f"Sequence: [-5]")
  print(f"Median: {tracker.get_median()}\n")

  tracker.add(1)
  print(f"Sequence: [-5, 1]")
  print(f"Median: {tracker.get_median()}\n")

  tracker.add(6)
  print(f"Sequence: [-5, 1, 6]")
  print(f"Median: {tracker.get_median()}\n")

  tracker.add(11)
  print(f"Sequence: [-5, 1, 6, 11]")
  print(f"Median: {tracker.get_median()}\n")

if __name__ == "__main__":
  main()