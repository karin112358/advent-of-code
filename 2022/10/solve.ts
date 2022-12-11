import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  const rows = splitInput(input);
  let x = 1;
  let cycle = 0;
  let result = 0;

  for (const row of rows) {
    if (row.cmd === 'addx') {
      cycle++;
      if (cycle % 40 === 20) result += cycle * x;
      cycle++;
      if (cycle % 40 === 20) result += cycle * x;
      x += row.value;
    } else if (row.cmd === 'noop') {
      cycle++;
      if (cycle % 40 === 20) result += cycle * x;
    }
  }

  return result;
}

export function part2(input: string): string | number {
  const rows = splitInput(input);
  let x = 1;
  let cycle = 0;
  let result: string[] = [];

  for (const row of rows) {
    if (cycle % 40 === 0) {
      result.push('');
    }

    result[result.length - 1] = addPixel(cycle, x, result[result.length - 1]);

    if (row.cmd === 'addx') {
      cycle++;

      if (cycle % 40 === 0) {
        result.push('');
      }

      result[result.length - 1] = addPixel(cycle, x, result[result.length - 1]);

      cycle++;
      x += row.value;
    } else if (row.cmd === 'noop') {
      cycle++;
    }
  }

  console.log('');
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }

  return 0;
}

function addPixel(cycle: number, x: number, row: string) {
  if (Math.floor(cycle % 40) === x || Math.floor(cycle % 40) === x - 1 || Math.floor(cycle % 40) === x + 1) {
    return row + '#';
  } else {
    return row + '.';
  }
}

function splitInput(input: string): { cmd: string; value: number }[] {
  return input
    .split(/\r?\n/)
    .map((i) => i.split(' '))
    .map((i) => {
      if (i.length === 2) {
        return { cmd: i[0], value: parseInt(i[1]) };
      } else {
        return { cmd: i[0], value: 0 };
      }
    });
}
