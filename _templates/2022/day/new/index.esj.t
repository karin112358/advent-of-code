---
to: 2022/<%= name %>/index.ts
---
import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  return 'NOT IMPLEMENTED';
}

export function part2(input: string): string | number {
  return 'NOT IMPLEMENTED';
}

function splitInput(input: string): string[] {
  return input.split(/\r?\n/);
}

try {
  const input = readFileSync('./2022/<%= name %>/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day <%= name %> ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}