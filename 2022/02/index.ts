import { readFileSync } from 'fs';
import { logError, logHighlight, logSuccess } from '../../functions/log';
const log = console.log;

export function part1(input: string): string | number {
  const rounds = splitInput(input);

  let points = 0;

  for (const round of rounds) {
    const result = getResult(round[0], round[1]);
    if (result === 'win') {
      points += 6;
    } else if (result === 'draw') {
      points += 3;
    }

    if (round[1] === 'X') points += 1;
    if (round[1] === 'Y') points += 2;
    if (round[1] === 'Z') points += 3;
  }

  return points;
}

export function part2(input: string): string | number {
  const rounds = splitInput(input);

  let points = 0;

  for (const round of rounds) {
    let player2 = '';

    if (round[0] === 'A' && round[1] === 'X') player2 = 'Z';
    if (round[0] === 'A' && round[1] === 'Y') player2 = 'X';
    if (round[0] === 'A' && round[1] === 'Z') player2 = 'Y';
    if (round[0] === 'B' && round[1] === 'X') player2 = 'X';
    if (round[0] === 'B' && round[1] === 'Y') player2 = 'Y';
    if (round[0] === 'B' && round[1] === 'Z') player2 = 'Z';
    if (round[0] === 'C' && round[1] === 'X') player2 = 'Y';
    if (round[0] === 'C' && round[1] === 'Y') player2 = 'Z';
    if (round[0] === 'C' && round[1] === 'Z') player2 = 'X';

    const result = getResult(round[0], player2);


    if (result === 'win') {
      points += 6;
    } else if (result === 'draw') {
      points += 3;
    }

    if (player2 === 'X') points += 1;
    if (player2 === 'Y') points += 2;
    if (player2 === 'Z') points += 3;
  }

  return points;
}

function splitInput(input: string): string[][] {
  return input.split(/\r?\n/).map((i) => i.split(' '));
}

function getResult(player1: string, player2: string): 'win' | 'draw' | 'lost' {
  if (
    (player2 === 'X' && player1 === 'C') ||
    (player2 === 'Y' && player1 === 'A') ||
    (player2 === 'Z' && player1 === 'B')
  ) {
    return 'win';
  } else if (
    (player2 === 'X' && player1 === 'A') ||
    (player2 === 'Y' && player1 === 'B') ||
    (player2 === 'Z' && player1 === 'C')
  ) {
    return 'draw';
  }

  return 'lost';
}

try {
  const input = readFileSync('./2022/02/input.txt', 'utf-8');
  const solution1 = part1(input);
  const solution2 = part2(input);

  logHighlight('*** Day 02 ***');
  console.time('Duration part 1');
  logSuccess('Part 1:', solution1);
  console.timeEnd('Duration part 1');

  console.time('Duration part 2');
  logSuccess('Part 2:', solution2);
  console.timeEnd('Duration part 2');
} catch (e: any) {
  logError(e);
}
