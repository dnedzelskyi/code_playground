# Given an array of integers nums and an integer target,
# return all pairs (i, j) of indices such that nums[i] + nums[j] = target.
# Treat (i, j) = (j, i)

def two_sum(nums: list, target: int) -> list:
  lookup, result = dict(), []
  
  for i, a in enumerate(nums):
    b = target - a
    if b in lookup:
      for j in lookup[b]:
        result.append((i, j))
    if a not in lookup:
      lookup[a] = []  
    lookup[a].append(i)

  return result

def main():
  nums = [2, 3, 0, 0, 5, 3, 4, 1, 0]
  print(f"Input array: {nums}")
  print("Result:", two_sum(nums, 3))

if __name__ == "__main__":
  main()