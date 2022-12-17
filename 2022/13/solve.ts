import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  const pairs = splitInput(input);
  let result = 0;
  let index = 1;

  for (let pair of pairs) {
    if (check(JSON.parse(pair[0]), JSON.parse(pair[1])) < 0) {
      result += index;
    }

    index++;
  }

  return result;
}

export function part2(input: string): string | number {
  const pairs = splitInput(input);
  const items: any[] = [];

  for (let pair of pairs) {
    items.push(JSON.parse(pair[0]));
    items.push(JSON.parse(pair[1]));
  }

  items.push(JSON.parse('[[2]]'));
  items.push(JSON.parse('[[6]]'));

  items.sort((a, b) => check(a, b));

  const item1 = items.findIndex((i) => i.length === 1 && i[0].length === 1 && i[0][0] === 2) + 1;
  const item2 = items.findIndex((i) => i.length === 1 && i[0].length === 1 && i[0][0] === 6) + 1;

  return item1 * item2;
}

function check(inputA: any[], inputB: any[]): number {
  let result = -1;

  if (typeof inputA === 'number' && typeof inputB === 'number') {
    result = inputA < inputB ? -1 : inputA > inputB ? 1 : 0;
  } else if (inputA.length === 0 && inputB.length === 0) {
    result = 0;
  } else if (inputA.length === 0) {
    result = -1;
  } else if (inputB.length === 0) {
    result = 1;
  } else {
    let valA = inputA;
    let valB = inputB;

    if (typeof inputA === 'number') {
      valA = [inputA];
    }
    if (typeof inputB === 'number') {
      valB = [inputB];
    }

    result = 0;
    for (let i = 0; i < valA.length && result === 0; i++) {
      if (i > valB.length - 1) {
        result = 1;
      } else {
        result = check(valA[i], valB[i]);
      }
    }

    if (result === 0 && valA.length < valB.length) {
      result = -1;
    }
  }

  return result;
}

function splitInput(input: string): string[][] {
  return input.split(/\r?\n\r?\n/).map((p) => p.split(/\r?\n/));
}
