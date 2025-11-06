from typing import List
from enum import Enum, auto


class GenOptions(Enum):
    RECURSIVE = auto()
    ITERATIVE = auto()


class SubsetGenerator:
    @staticmethod
    def produce_all_subsets(
        items: List, gen_option: GenOptions = GenOptions.RECURSIVE
    ) -> List[List]:
        match gen_option:
            case GenOptions.RECURSIVE:
                return SubsetGenerator._gen_recursive(0, [], items)
            case GenOptions.ITERATIVE:
                return SubsetGenerator._gen_iterative(items)

    @staticmethod
    def _gen_recursive(i: int, subset: List, items: List) -> List[List]:
        if i == len(items):
            return [subset.copy()]
        
        sets_without_item = SubsetGenerator._gen_recursive(i + 1, subset, items)
        subset.append(items[i])
        sets_with_item = SubsetGenerator._gen_recursive(i + 1, subset, items)
        subset.pop()

        return sets_without_item + sets_with_item

    @staticmethod
    def _gen_iterative(items: List) -> List[List]:
        result, n = [], len(items)
        for i in range(0, 1 << n):
            subset = []
            for j in range(0, n):
                if i & (1 << j):
                    subset.append(items[j])
            result.append(subset)

        return result


def main():
    all_sets = SubsetGenerator.produce_all_subsets(
        [0, 11, 100, -4, -2], GenOptions.RECURSIVE
    )
    print('All subsets (recursive): ', all_sets)
    all_sets = SubsetGenerator.produce_all_subsets(
        [0, 5, 6], GenOptions.ITERATIVE
    )
    print('All subsets (iterative): ', all_sets)


if __name__ == "__main__":
    main()