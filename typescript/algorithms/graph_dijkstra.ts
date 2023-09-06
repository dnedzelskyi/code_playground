namespace GraphDijkstra {
  class Dijkstra {
    public static findShortestPath(
      graph: number[][][],
      start: number,
      end: number,
    ): { distance: number; path: number[] } {
      const V = graph.length;
      const distances = new Array(V).fill(Infinity);
      const parent = new Array(V).fill(-1);
      const seen = new Set<number>();

      // Distance from start to start = 0.
      distances[start] = 0;

      for (let step = 1; step < V; step++) {
        const u = this.getVertexWithMinDistance(distances, seen);
        seen.add(u);

        if (distances[u] === Infinity) {
          continue;
        }

        for (let vw of graph[u]) {
          let [v, weight] = [vw[0], vw[1]];

          if (seen.has(v)) {
            continue;
          }

          if (distances[u] + weight < distances[v]) {
            distances[v] = distances[u] + weight;
            parent[v] = u;
          }
        }
      }

      // Reconstruct the path from start to end.
      const path: number[] = [];
      let vertex = end;
      while (vertex !== -1) {
        path.unshift(vertex);
        vertex = parent[vertex];
      }

      return { distance: distances[end], path };
    }

    private static getVertexWithMinDistance(
      distances: number[],
      seen: Set<number>,
    ): number {
      let min = Infinity;
      let minIndex = -1;

      for (let v = 0; v < distances.length; v++) {
        if (!seen.has(v) && distances[v] < min) {
          min = distances[v];
          minIndex = v;
        }
      }

      return minIndex;
    }
  }

  const graph: number[][][] = [
    [
      [1, 10],
      [2, 5],
    ],
    [
      [2, 2],
      [3, 1],
    ],
    [
      [1, 3],
      [3, 9],
      [4, 2],
    ],
    [[4, 4]],
    [
      [0, 7],
      [3, 6],
    ],
  ];

  console.log(Dijkstra.findShortestPath(graph, 0, 3));
}
