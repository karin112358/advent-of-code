import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  const depths = splitInput(input);

  let increase = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) increase++;
  }

  return increase;
}

export function part2(input: string): string | number {
  const depths = splitInput(input);

  let increase = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) increase++;
  }

  return increase;
}

function splitInput(input: string): number[] {
  return input.split(/\r?\n/).map((i) => parseInt(i));
}

try {
  const input = readFileSync('./2022/template/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Template ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
