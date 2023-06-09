import array


def binary_search(arr: array, target: int) -> bool:
    if len(arr) == 0:
        return False

    lo = 0
    hi = len(arr)

    while (lo <= hi):
        index = (lo + hi) // 2
        value = arr[index]

        if value == target:
            return True
        elif value < target:
            lo = index + 1
        else:
            hi = index - 1

    return False


def main():
    print("For input ([], 1) : {}".format(
          binary_search(array.array("i", []), 1)))
    print("For input ([2, 7, 10, 11], 6) : {}".format(
        binary_search([2, 7, 10, 11], 6)))
    print("For input ([6], 6) : {}".format(binary_search([6], 6)))
    print("For input ([5, 12, 15], 15) : {}".format(
        binary_search([5, 12, 15], 15)))
    print("For input ([2, 7, 10, 11], 2) : {}".format(
        binary_search([2, 7, 10, 11], 2)))
    print("For input ([5, 9, 21, 33, 45, 61], 9) : {}".format(
        binary_search([5, 9, 21, 33, 45, 61], 9)))


if __name__ == "__main__":
    main()
