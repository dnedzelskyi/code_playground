// TODO: Refactor code so it may accept main parameters (like area, start, end ...) as an input.
namespace FindPathInMaze {
  type Point = {
    x: number;
    y: number;
  };

  const AREA: string[] = ['###E#', '#   #', '#   #', '#S###'];
  const START_POINT: Point = { x: 3, y: 1 };
  const END_POINT: Point = { x: 0, y: 3 };
  const DIRECTIONS: Point[] = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ];

  function move(position: Point, path: Point[], routes: Point[][]): boolean {
    const { x, y } = position;

    if (
      x < 0 ||
      x >= AREA.length ||
      y < 0 ||
      y >= AREA[0].length ||
      AREA[x][y] === '#' ||
      path.some((p) => p.x === position.x && p.y === position.y)
    ) {
      return false;
    }

    path.push(position);

    if (x === END_POINT.x && y === END_POINT.y) {
      return true;
    }

    for (let move_point of DIRECTIONS) {
      const next = { x: x + move_point.x, y: y + move_point.y };

      if (move(next, path, routes)) {
        const successPath = path.slice();
        routes.push(successPath);
      }

      if (path.length && path[path.length - 1] !== position) {
        path.pop();
      }
    }

    return false;
  }

  function findPath(): Point[][] {
    const routes: Point[][] = [];

    move(START_POINT, [], routes);

    return routes;
  }

  console.log(AREA);
  console.log('All routs: ');
  console.log(findPath());
}
