import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  return getPosition(input, 4);
}

export function part2(input: string): string | number {
  return getPosition(input, 14);
}

function getPosition(input: string, repeatLength: number): number {
  const sequence = splitInput(input);
  let result = -1;

  for (let i = repeatLength - 1; i < sequence.length && result === -1; i++) {
    const set = [...new Set(sequence.slice(i - repeatLength + 1, i + 1))];

    if (set.length == repeatLength) {
      result = i + 1;
    }
  }

  return result;
}

function splitInput(input: string): string {
  return input;
}