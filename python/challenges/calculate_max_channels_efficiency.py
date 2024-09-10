'''
Given:
  channels: number
    - number of available channels.
    - each channel should be used for sending at least one pocket
    - each channel can handle one pocket at a time
  packets: number[] - size of packets that needs to be send via channels
  efficiency(channel(i)) = median(packets sent via channel)

Task:
  Distribute packets so that the sum of channels efficiency would be maximal.
  Return max sum of channels efficiency.
'''

import heapq


class MedianTracker:
  def __init__(self):
    self.left_q = []
    self.right_q = []

  def add(self, value: int):
    heapq.heappush(self.left_q, -value)
    heapq.heappush(self.right_q, -heapq.heappop(self.left_q))

    if len(self.left_q) < len(self.right_q):
      heapq.heappush(self.left_q, -heapq.heappop(self.right_q))

  @property
  def median(self) -> float:
    if len(self.left_q) == len(self.right_q) == 0:
      return 0
    
    if len(self.left_q) == len(self.right_q):
      return (self.right_q[0] - self.left_q[0]) / 2
    
    return -self.left_q[0]

def calc_max_channels_efficiency(channels: int, packets: list[int]) -> float:
  # Sort packets.
  packets.sort(reverse=True);

  # Distribute packets.
  medians = [MedianTracker() for _ in range(channels)]
  for p in packets:
      j = 0
      while (j < channels - 1 and medians[j].median >= p):
        j += 1
      medians[j].add(p)

  # Calculate efficiency.
  efficiency = 0
  for tracker in medians:
    efficiency += tracker.median

  return efficiency

def main():
  print(":: Calculate max channels efficiency ::")
  print()

  channels, packets = 4, [2, 10, 11, 1, 7, 22, 3]
  print(f"Number of channels: {channels}, Packets: {packets}")
  print(f"Channels efficiency: {calc_max_channels_efficiency(channels, packets)}\n")

  channels, packets = 2, [5, 21, 10, 30]
  print(f"Number of channels: {channels}, Packets: {packets}")
  print(f"Channels efficiency: {calc_max_channels_efficiency(channels, packets)}\n")

  channels, packets = 3, [1, 50, 17, 244, 101]
  print(f"Number of channels: {channels}, Packets: {packets}")
  print(f"Channels efficiency: {calc_max_channels_efficiency(channels, packets)}\n")

if __name__ == "__main__":
  main()