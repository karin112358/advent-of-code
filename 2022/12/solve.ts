import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  const rows = splitInput(input);

  // find start
  const pos = { x: -1, y: -1 };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const y = row.findIndex((i) => i === 'S');

    if (y !== -1) {
      pos.x = i;
      pos.y = y;
      break;
    }
  }

  return getShortestPath(rows, pos, 0);
}

export function part2(input: string): string | number {
  const rows = splitInput(input);
  const shortestPaths: Map<string, number> = new Map();

  // find all starts
  const starts = [];
  for (let x = 0; x < rows.length; x++) {
    const row = rows[x];

    for (let y = 0; y < row.length; y++) {
      if (row[y] === 'S' || row[y] === 0) {
        starts.push({ x, y });
      }
    }
  }

  let shortestPath = -1;
  for (const s of starts) {
    // if (!shortestPaths.has(s.x + ',' + s.y) || shortestPaths.get(s.x + ',' + s.y)! !== -1) {
    const pathLength = getShortestPath(rows, s, shortestPath, shortestPaths);

    if (pathLength > 0 && (pathLength < shortestPath || shortestPath === -1)) {
      shortestPath = pathLength;
    }
    //}
  }

  return shortestPath;
}

function getShortestPath(
  rows: (string | number)[][],
  pos: { x: number; y: number },
  previousShortest: number,
  shortestPaths?: Map<string, number>
): number {
  // find path
  const paths = [[pos]];
  const visited = new Set<string>();

  while (paths.length) {
    let path = paths.shift() as { x: number; y: number }[];
    visited.add(path[path.length - 1].x + ',' + path[path.length - 1].y);

    if (path.length >= previousShortest && previousShortest > 0) {
      continue;
    }

    const last = path[path.length - 1];

    const next = [
      { x: last.x - 1, y: last.y },
      { x: last.x + 1, y: last.y },
      { x: last.x, y: last.y - 1 },
      { x: last.x, y: last.y + 1 },
    ];

    for (const n of next) {
      if (n.x < 0 || n.x >= rows.length || n.y < 0 || n.y >= rows[0].length) {
        continue;
      }

      let lastHeight = rows[last.x][last.y];
      if (typeof lastHeight === 'string') {
        lastHeight = 0;
      }

      // check if end
      if (rows[n.x][n.y] === 'E' && lastHeight >= 25) {
        let length = path.length;

        if (shortestPaths) {
          // if path contains multiple start positions use latest
          // const startPoints = path.filter((p) => rows[p.x][p.y] === 0);

          // if (startPoints.length) {
          //   const index = path.indexOf(startPoints[startPoints.length - 1]);

          //   console.log(index, startPoints[startPoints.length - 1]), console.log(path);
          //   path = path.slice(index);

          //   console.log(path);
          // }

          for (let i = 0; i < path.length; i++) {
            const key = path[i].x + ',' + path[i].y;
            if (shortestPaths.has(key)) {
              if (length - i < shortestPaths.get(key)!) {
                shortestPaths.set(key, length - i);
              }
            } else {
              shortestPaths.set(key, length - i);
            }
          }

          // update all other visited positions
          // for (const visitedPos of visited) {
          //   if (!shortestPaths.has(visitedPos)) {
          //     shortestPaths.set(visitedPos, -1);
          //   }
          // }
        }

        //console.log(shortestPaths);

        return length;
      }

      const height = rows[n.x][n.y];

      if (typeof height === 'string') {
        continue;
      }

      if (path.some((p) => p.x === n.x && p.y === n.y)) {
        continue;
      }

      if (height > lastHeight + 1) {
        continue;
      }

      // find shorter path with same position
      const shorterPath = paths.find(
        (path1) =>
          path1.find((p) => p.x == n.x && p.y == n.y) && path1.findIndex((p) => p.x == n.x && p.y == n.y) <= path.length
      );
      if (shorterPath) {
        continue;
      }

      // find shorter path with same position
      if (shortestPaths) {
        const newKey = n.x + ',' + n.y;
        if (shortestPaths.has(newKey) && shortestPaths.get(newKey)! + path.length >= previousShortest) {
          continue;
        }
      }

      // TODO: remove paths with same position but longer path (takes longer)
      //paths = paths.filter(path1 => !path1.find((p) => p.x == n.x && p.y == n.y) || path1.findIndex((p) => p.x == n.x && p.y == n.y) > path.length);

      paths.push([...path, n]);
    }
  }

  return 0;
}

function getHeight(input: string): number {
  return input.charCodeAt(0) - 'a'.charCodeAt(0);
}

function splitInput(input: string): (string | number)[][] {
  return input.split(/\r?\n/).map((r) => r.split('').map((r) => (r === 'S' || r === 'E' ? r : getHeight(r))));
}
