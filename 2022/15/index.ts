import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
import { part1, part2 } from './solve';

try {
  const input = readFileSync('./2022/15/input.txt', 'utf-8');

  logHighlight('*** Day 15 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', part1(input, 2000000));
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', part2(input, 4000000));
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}