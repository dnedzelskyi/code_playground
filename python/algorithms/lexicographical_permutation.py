from enum import Enum


class Direction(Enum):
    NEXT = 1
    PREVIOUS = 2


def permutate(arr, direction: Direction = Direction.NEXT) -> bool:
    n, compare = len(arr), (
        (lambda a, b: a >= b) if direction == Direction.NEXT else (lambda a, b: a <= b)
    )

    # find pivot
    p = n - 1
    while p > 0 and compare(arr[p - 1], arr[p]):
        p -= 1
    if p == 0:
        return False
    p -= 1

    # find rightmost successor to pivot
    r = n - 1
    while compare(arr[p], arr[r]):
        r -= 1

    # swap pivot with successor
    arr[r], arr[p] = arr[p], arr[r]

    # reverse the suffix after pivot
    i, j = p + 1, n - 1
    while i < j:
        arr[i], arr[j] = arr[j], arr[i]
        i, j = i + 1, j - 1

    return True


def main():
    arr = [1, 2, 3, 4]
    print("Initial array:", arr)
    print("Next permutation:", permutate(arr), arr)
    print("Next permutation:", permutate(arr), arr)
    print("Next permutation:", permutate(arr), arr)
    print("Prev permutation:", permutate(arr, Direction.PREVIOUS), arr)

    arr = list("bacab")
    print("Initial array:", arr)
    print("Next permutation:", permutate(arr, Direction.PREVIOUS), arr)


if __name__ == "__main__":
    main()
