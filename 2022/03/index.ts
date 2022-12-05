import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): number {
  const rucksacks = splitInput(input);
  let result = 0;

  for (let rucksack of rucksacks) {
    result += getPriority(
      getCommonItems(rucksack.substring(0, rucksack.length / 2), rucksack.substring(rucksack.length / 2))[0]
    );
  }

  return result;
}

export function part2(input: string): number {
  const rucksacks = splitInput(input);
  let result = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const regex1 = new RegExp('[' + rucksacks[i] + ']', 'g');
    const regex2 = new RegExp('[' + rucksacks[i + 1] + ']', 'g');

    const results1: string[] = [];
    const results2: string[] = [];

    let result1 = regex1.exec(rucksacks[i + 2]);
    while (result1) {
      results1.push(result1[0]);
      result1 = regex1.exec(rucksacks[i + 2]);
    }

    let result2 = regex2.exec(rucksacks[i + 2]);
    while (result2) {
      results2.push(result2[0]);
      result2 = regex2.exec(rucksacks[i + 2]);
    }

    const regex = new RegExp('[' + results1.join('') + ']', 'g');
    const matches = regex.exec(results2.join(''));

    if (matches) {
      result += getPriority(matches[0]);
    } else {
      logError('NO MATCH', results1.join(''), results2.join(''));
    }
  }

  return result;
}

function splitInput(input: string): string[] {
  return input.split(/\r?\n/);
}

function getPriority(letter: string): number {
  const charCode = letter[0].charCodeAt(0);
  return charCode > 90 ? charCode - 96 : charCode - 64 + 26;
}

function getCommonItems(compartment1: string, compartment2: string): string {
  const regex = new RegExp('[' + compartment1 + ']', 'g');
  let match = regex.exec(compartment2);
  let result = '';

  while (match) {
    result += match[0];
    match = regex.exec(compartment2);
  }

  return result;
}

try {
  const input = readFileSync('./2022/03/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 03 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
