import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  const { grid, maxRow } = splitInput(input);
  let unitsOfSand = 0;
  let currentPos = { x: 500, y: 0 };

  while (currentPos.y <= maxRow) {
    // move sand unit
    if (!grid.has(`${currentPos.x},${currentPos.y + 1}`)) {
      currentPos.y++;
    } else if (!grid.has(`${currentPos.x - 1},${currentPos.y + 1}`)) {
      currentPos.x--;
      currentPos.y++;
    } else if (!grid.has(`${currentPos.x + 1},${currentPos.y + 1}`)) {
      currentPos.x++;
      currentPos.y++;
    } else {
      grid.add(`${currentPos.x},${currentPos.y}`);
      unitsOfSand++;
      currentPos = { x: 500, y: 0 };
    }
  }

  return unitsOfSand;
}

export function part2(input: string): string | number {
  const { grid, maxRow } = splitInput(input);
  let unitsOfSand = 0;
  let currentPos = { x: 500, y: 0 };

  while (currentPos.y <= maxRow + 2) {
    // move sand unit
    if (currentPos.y < maxRow + 1 && !grid.has(`${currentPos.x},${currentPos.y + 1}`)) {
      currentPos.y++;
    } else if (currentPos.y < maxRow + 1 && !grid.has(`${currentPos.x - 1},${currentPos.y + 1}`)) {
      currentPos.x--;
      currentPos.y++;
    } else if (currentPos.y < maxRow + 1 && !grid.has(`${currentPos.x + 1},${currentPos.y + 1}`)) {
      currentPos.x++;
      currentPos.y++;
    } else {
      grid.add(`${currentPos.x},${currentPos.y}`);
      unitsOfSand++;

      if (currentPos.x === 500 && currentPos.y === 0) {
        break;
      }

      currentPos = { x: 500, y: 0 };
    }
  }

  return unitsOfSand;
}

function splitInput(input: string): { grid: Set<string>; maxRow: number } {
  const grid = new Set<string>();
  let maxRow = 0;

  const rows = input.split(/\r?\n/);
  for (const row of rows) {
    const points = row.split(' -> ').map((p) => ({ x: parseInt(p.split(',')[0]), y: parseInt(p.split(',')[1]) }));
    let point = points[0];

    grid.add(`${point.x},${point.y}`);
    if (point.y > maxRow) {
      maxRow = point.y;
    }

    for (let i = 1; i < points.length; i++) {
      while (point.x !== points[i].x || point.y !== points[i].y) {
        point.x = point.x < points[i].x ? point.x + 1 : point.x > points[i].x ? point.x - 1 : point.x;
        point.y = point.y < points[i].y ? point.y + 1 : point.y > points[i].y ? point.y - 1 : point.y;

        grid.add(`${point.x},${point.y}`);
        if (point.y > maxRow) {
          maxRow = point.y;
        }
      }

      point = points[i];
    }
  }

  return { grid, maxRow };
}
