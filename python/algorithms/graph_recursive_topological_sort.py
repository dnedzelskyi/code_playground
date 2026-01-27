class RecursiveTopologicalSort:
    @staticmethod
    def sort(graph: dict[int, list[int]]) -> list[int]:
        nodes, seen, path, result = set(graph), set(), set(), []
        # Include nodes that have no outgoing edges
        for v in graph.values():
            nodes.update(v)

        # Perform DFS
        for v in nodes:
            RecursiveTopologicalSort._sort(v, graph, seen, path, result)

        result.reverse()
        return result

    @staticmethod
    def _sort(
        v: int,
        graph: dict[int, list[int]],
        seen: set[int],
        path: set[int],
        result: list[int],
    ) -> None:
        if v in seen:
            return
        # Cycle detected
        if v in path:
            raise ValueError("Graph is not a DAG")

        # Traverse children
        path.add(v)
        for neighbor in graph.get(v, []):
            RecursiveTopologicalSort._sort(neighbor, graph, seen, path, result)
        path.remove(v)

        # Add to result and mark as seen
        seen.add(v)
        result.append(v)


def main():
    print(f"Recursive topological sort.")
    graph = {0: [1, 2, 3], 1: [10], 2: [4], 3: [5, 6], 4: [7, 8], 9: [10], 10: [11, 12]}
    print(f"Graph: {graph}")
    items = RecursiveTopologicalSort.sort(graph)
    print(f"Topological sort order: {items}")


if __name__ == "__main__":
    main()
