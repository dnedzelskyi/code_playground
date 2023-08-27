namespace GraphBreadthFirstSearch {
  type GraphNode<W = undefined> = W extends undefined
    ? { v: number }
    : { v: number; weight?: W };
  type Graph<W> = GraphNode<W>[][];

  // Graph's Breadth First Search to find all routes from one node to another.
  function bfs<W>(
    graph: Graph<W>,
    start: GraphNode<W>,
    target: GraphNode<W>,
  ): GraphNode[][] {
    const result: GraphNode<W>[][] = [];

    // Check if start and target nodes are valid.
    if (0 > start.v || start.v >= graph.length) {
      return result;
    }
    if (0 > target.v || target.v >= graph.length) {
      return result;
    }

    // Start BFS from start node.
    const queue: { route: GraphNode<W>[]; lookup: Set<number> }[] = [
      { route: [start], lookup: new Set<number>() },
    ];

    while (queue.length !== 0) {
      // Process next node.
      const { route, lookup } = queue.shift()!;
      const node = route[route.length - 1];

      // If we seen it before, just break.
      if (lookup.has(node.v)) {
        continue;
      }

      // If we found target, then store path and continue.
      if (node.v === target.v) {
        result.push(route);
        continue;
      }

      // Mark seen before.
      lookup.add(node.v);

      // Add route for each child to routesQueue.
      for (let child of graph[node.v]) {
        if (lookup.has(child.v)) {
          continue;
        }
        queue.push({ route: [...route, child], lookup: new Set(lookup) });
      }
    }

    return result;
  }

  console.log(':: BFS for Graph Test ::');
  console.log('');

  let path: GraphNode[][];
  /*
      ┌─┐     ┌─┐
 ┌───►│1│◄────┤3│◄──┐
 │    └┬┘     └─┘   │
┌┴┐    │           ┌┴┐
│0│    └──────┐ ┌─►│6│
└┬┘           ▼ │  └─┘
 │    ┌─┐     ┌─┤   ▲
 └───►│2├────►│4│   │
      └─┘     └┬┘   │
               │   ┌┴┐
               └──►│5│
                   └─┘
 */
  let graph: Graph<undefined> = [
    [{ v: 1 }, { v: 2 }],
    [{ v: 4 }],
    [{ v: 4 }],
    [{ v: 1 }],
    [{ v: 5 }, { v: 6 }],
    [{ v: 6 }],
    [{ v: 3 }],
  ];

  path = bfs(graph, { v: 0 }, { v: 3 });
  console.log(`BFS all routes from 0 to 3:`);
  console.log(path);
}
