import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string, targetRow: number): string | number {
  const rows = splitInput(input);
  const impossiblePositions = new Set<number>();

  for (const row of rows) {
    const { sx, sy, bx, by } = row;
    const xDiff = Math.abs(sx - bx);
    const yDiff = Math.abs(sy - by);
    const distance = xDiff + yDiff;

    for (let newX = sx - distance; newX <= sx + distance; newX++) {
      const newDistance = Math.abs(sx - newX) + Math.abs(sy - targetRow);
      if (newDistance <= distance && (newX != bx || targetRow != by) && (newX != sx || targetRow != sy))
        impossiblePositions.add(newX);
    }
  }

  return impossiblePositions.size;
}

export function part2(input: string, validArea: number): string | number {
  const rows = splitInput(input);
  const impossiblePositions = new Array<{ from: number; to: number }[]>(validArea + 1);

  for (const row of rows) {
    const { sx, sy, bx, by } = row;
    const xDiff = Math.abs(sx - bx);
    const yDiff = Math.abs(sy - by);
    const distance = xDiff + yDiff;

    let width = 0;
    for (let y = sy - distance; y <= sy + distance; y++) {
      if (y >= 0 && y <= validArea) {
        if (!impossiblePositions[y]) impossiblePositions[y] = [];

        let modify = impossiblePositions[y].find((p) => sx - width <= p.from && sx + width >= p.to);
        if (modify) {
          modify.from = sx - width;
          modify.to = sx + width;
        } else {
          let modify = impossiblePositions[y].find((p) => sx - width > p.from && sx + width <= p.to);
          if (!modify) {
            impossiblePositions[y].push({ from: sx - width, to: sx + width });
          }
        }
      }

      if (y >= sy) {
        width--;
      } else {
        width++;
      }
    }
  }

  for (let y = 0; y <= validArea; y++) {
    if (impossiblePositions[y]) {
      impossiblePositions[y].sort((a, b) => (a.from === b.from ? a.to - b.to : a.from - b.from));

      if (impossiblePositions[y][0].from > 0) {
        return y;
      } else if (impossiblePositions[y][impossiblePositions[y].length - 1].to < validArea) {
        return validArea * 4000000 + y;
      }

      for (let i = 1; i < impossiblePositions[y].length - 1; i++) {
        if (impossiblePositions[y][i].from > impossiblePositions[y][i - 1].to + 1) {
          return (impossiblePositions[y][i].from - 1) * 4000000 + y;
        }
      }
    }
  }

  return 0;
}

function splitInput(input: string): { sx: number; sy: number; bx: number; by: number }[] {
  const rows = input.split(/\r?\n/).map((r) =>
    r
      .replace('Sensor at ', '')
      .replace(' closest beacon is at ', '')
      .split(/[:,]/)
      .map((x) => x.replace(/[xy]=/, ''))
      .map(Number)
  );

  return rows.map((r) => ({ sx: r[0], sy: r[1], bx: r[2], by: r[3] }));
}
