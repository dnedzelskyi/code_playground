import array


def search(arr: array, value: int) -> bool:
    for item in arr:
        if item == value:
            return True
    return False


if __name__ == "__main__":
    print(search(array.array('i', [3, 5, 6]), 5))
