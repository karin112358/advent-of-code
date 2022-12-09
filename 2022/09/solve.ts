import { logError, logHighlight, logSuccess } from '../../functions/log';
type Position = { x: number; y: number };

export function part1(input: string): string | number {
  const rows = splitInput(input);
  const pos = new Set<string>();
  const head = { x: 0, y: 0 };
  const tail = { x: 0, y: 0 };

  for (const row of rows) {
    for (let i = 0; i < row.dist; i++) {
      moveHead(head, row.dir);
      moveKnot(head, tail);
      pos.add(`${tail.x},${tail.y}`);
    }
  }

  return pos.size;
}

export function part2(input: string): string | number {
  const rows = splitInput(input);
  const pos = new Set<string>();
  const head = { x: 0, y: 0 };
  const knots: Position[] = [];

  for (let i = 1; i <= 9; i++) {
    knots.push({ x: 0, y: 0 });
  }

  for (const row of rows) {
    for (let i = 0; i < row.dist; i++) {
      moveHead(head, row.dir);

      for (let i = 0; i < knots.length; i++) {
        moveKnot(i === 0 ? head : knots[i - 1], knots[i]);
      }

      pos.add(`${knots[8].x},${knots[8].y}`);
    }
  }

  return pos.size;
}

function moveHead(head: Position, dir: string) {
  switch (dir) {
    case 'L':
      head.x--;
      break;
    case 'R':
      head.x++;
      break;
    case 'U':
      head.y--;
      break;
    case 'D':
      head.y++;
      break;
  }
}

function moveKnot(head: Position, tail: Position) {
  if (Math.abs(tail.x - head.x) >= 2 && tail.y === head.y) {
    tail.x += Math.sign(head.x - tail.x);
  } else if (Math.abs(tail.y - head.y) >= 2 && tail.x === head.x) {
    tail.y += Math.sign(head.y - tail.y);
  } else if (Math.abs(tail.x - head.x) >= 2 && Math.abs(tail.y - head.y) >= 1) {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);
  } else if (Math.abs(tail.x - head.x) >= 1 && Math.abs(tail.y - head.y) >= 2) {
    tail.x += Math.sign(head.x - tail.x);
    tail.y += Math.sign(head.y - tail.y);
  }
}

function splitInput(input: string): { dir: string; dist: number }[] {
  return input
    .split(/\r?\n/)
    .map((r) => r.split(' '))
    .map((i) => ({ dir: i[0], dist: parseInt(i[1]) }));
}
