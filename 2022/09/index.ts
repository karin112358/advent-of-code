import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
import { part1, part2 } from './solve';

try {
  const input = readFileSync('./2022/09/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 09 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}