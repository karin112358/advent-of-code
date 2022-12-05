import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  const rows = splitInput(input);
  let sum = 0;

  for (const row of rows) {
    if ((row[0] >= row[2] && row[1] <= row[3]) || (row[2] >= row[0] && row[3] <= row[1])) {
      sum++;
    }
  }

  return sum;
}

export function part2(input: string): string | number {
  const rows = splitInput(input);
  let sum = 0;

  for (const row of rows) {
    if (!((row[1] < row[2] || row[0] > row[3]) && (row[2] < row[0] || row[3] > row[1]))) {
      sum++;
    }
  }

  return sum;
}

function splitInput(input: string): number[][] {
  return input
    .split(/\r?\n/)
    .map((i) => i.split(/[,-]/g))
    .map((i) => i.map((j) => parseInt(j)));
}

try {
  const input = readFileSync('./2022/04/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 04 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
