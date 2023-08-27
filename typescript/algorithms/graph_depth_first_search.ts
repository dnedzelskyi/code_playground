namespace GraphDepthFirstSearch {
  type GraphNode<W = undefined> = W extends undefined
    ? { v: number }
    : { v: number; weight?: W };
  type Graph<W> = GraphNode<W>[][];

  // Graph's Depth First Search to find all routes from one node to another.
  function dfs<W>(
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

    // Do recursive dfs.
    search(graph, start, target, new Set<number>(), [start], result);

    return result;
  }

  // Recursive function for DFS.
  function search<W>(
    graph: Graph<W>,
    node: GraphNode<W>,
    target: GraphNode<W>,
    lookup: Set<number>,
    path: GraphNode[],
    routes: GraphNode[][],
  ) {
    // No need to check visited nodes again.
    if (lookup.has(node.v)) {
      return;
    }

    // Add path to routes if we found target.
    if (node.v == target.v) {
      routes.push([...path]);
      return;
    }

    // Mark node as visited.
    lookup.add(node.v);

    // Get next possible nodes to move.
    const children = graph[node.v];
    if (!children?.length) {
      return;
    }

    // Keep searching.
    for (let child of children) {
      search(graph, child, target, lookup, [...path, child], routes);
    }

    // Delete node from lookup after it's being processed.
    // For potential other routes that might lie through the node.
    lookup.delete(node.v);

    return;
  }

  console.log(':: DFS for Graph Test ::');
  console.log('');

  let routes: GraphNode[][];
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

  routes = dfs(graph, { v: 0 }, { v: 3 });
  console.log(`DFS all routes from 0 to 3:`);
  console.log(routes);
}
