import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  const { stacks, moves } = splitInput(input);

  for (const move of moves) {
    for (let i = 0; i < move[0]; i++) {
      const item = stacks.get(move[1])!.shift()!;
      stacks.get(move[2])!.unshift(item);
    }
  }

  let result = '';
  for (const entry of stacks.entries()) {
    result += entry[1][0];
  }

  return result;
}

export function part2(input: string): string | number {
  const { stacks, moves } = splitInput(input);

  for (const move of moves) {
    const temp: string[] = [];

    for (let i = 0; i < move[0]; i++) {
      temp.push(stacks.get(move[1])!.shift()!);
    }

    for (let i = temp.length - 1; i >= 0; i--) {
      stacks.get(move[2])!.unshift(temp[i]);
    }
  }

  let result = '';
  for (const entry of stacks.entries()) {
    result += entry[1][0];
  }

  return result;
}

function splitInput(input: string): { stacks: Map<number, string[]>; moves: number[][] } {
  const parts = input.split(/\r?\n\r?\n/);

  const stacks = new Map<number, string[]>();
  const rows = parts[0].split('\n');

  for (let row of rows.slice(0, rows.length - 1)) {
    for (let i = 1; i < row.length; i += 4) {
      const index = (i - 1) / 4 + 1;
      if (!stacks.has(index)) {
        stacks.set(index, []);
      }

      if (row[i] !== ' ') {
        stacks.get(index)!.push(row[i]);
      }
    }
  }

  return {
    stacks,
    moves: parts[1].split(/\r?\n/).map((p) =>
      p
        .replace(/[a-z]/g, '')
        .trim()
        .split('  ')
        .map((p) => parseInt(p))
    ),
  };
}

try {
  const input = readFileSync('./2022/05/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 05 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
