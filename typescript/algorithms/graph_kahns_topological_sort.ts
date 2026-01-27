namespace KahnsTopologicalSort {
  function sort<V>(graph: ReadonlyMap<V, readonly V[]>): V[] {
    let inDegree = new Map<V, number>();

    // Fill in degree map.
    for (let [v, children] of graph) {
      !inDegree.has(v) && inDegree.set(v, 0);
      children.forEach((c) => inDegree.set(c, (inDegree.get(c) ?? 0) + 1));
    }

    let [queue, result] = [new Array<V>(), new Array<V>()];
    // Init queue and start building result.
    inDegree.forEach((v, k) => v === 0 && queue.push(k));
    while (queue.length > 0) {
      // Add nodes with 0 in degree.
      result.push(queue.pop()!);

      // Update in degree and add 0 nodes if any.
      for (let v of graph.get(result.at(-1)!) ?? []) {
        inDegree.set(v, inDegree.get(v)! - 1);
        inDegree.get(v) === 0 && queue.unshift(v);
      }
    }

    // Cycle detected.
    if (result.length !== inDegree.size) {
      throw new Error('Graph is not a DAG');
    }

    return result;
  }

  console.log(`:: Kahn's Topological Sort Test ::`);
  console.log('');

  let graph = new Map([
    [0, [1, 2, 3]],
    [1, [10]],
    [2, [4]],
    [3, [5, 6]],
    [4, [7, 8]],
    [9, [10]],
    [10, [11, 12]],
  ]);

  console.log(`Input graph:`);
  console.log(graph);
  console.log(`Topological sort: [${sort(graph)}]`);
}
