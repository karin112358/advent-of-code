import { logError, logHighlight, logSuccess } from '../../functions/log';

interface Monkey {
  name: string;
  items: number[];
  operation: { operator: string; value: string };
  test: number;
  ifTrue: number;
  ifFalse: number;
  inspections: number;
}

export function part1(input: string): string | number {
  const monkeys = splitInput(input);
  return run(monkeys, 20, (worry) => Math.floor(worry / 3));
}

export function part2(input: string): string | number {
  const monkeys = splitInput(input);
  const divisor = monkeys.map((m) => m.test).reduce((prev, curr) => prev * curr, 1);
  return run(monkeys, 10000, (worry) => worry % divisor);
}

function run(monkeys: Monkey[], rounds: number, updateWorries: (worry: number) => number): number {
  for (let i = 0; i < rounds; i++) {
    for (const monkey of monkeys) {
      for (const item of monkey.items) {
        let newItem = 0;

        let value = 0;
        if (monkey.operation.value === 'old') {
          value = item;
        } else {
          value = parseInt(monkey.operation.value);
        }

        if (monkey.operation.operator === '*') {
          newItem = item * value;
        } else if (monkey.operation.operator === '+') {
          newItem = item + value;
        }

        monkey.inspections++;
        newItem = updateWorries(newItem);

        if (newItem % monkey.test === 0) {
          monkeys[monkey.ifTrue].items.push(newItem);
        } else {
          monkeys[monkey.ifFalse].items.push(newItem);
        }
      }

      monkey.items = [];
    }
  }

  const inspections = monkeys.map((m) => m.inspections).sort((a, b) => b - a);
  return inspections[0] * inspections[1];
}

function splitInput(input: string): Monkey[] {
  const monkeyRows = input.split(/\r?\n\r?\n/);
  const monkeys: Monkey[] = [];

  for (const monkey of monkeyRows) {
    const lines = monkey.split(/\r?\n/);
    const operation = lines[2].replace('  Operation: new = old ', '').split(' ');

    monkeys.push({
      name: lines[0].split(' ')[1],
      items: lines[1]
        .split(': ')[1]
        .split(', ')
        .map((i) => parseInt(i)),
      operation: { operator: operation[0], value: operation[1] },
      test: parseInt(lines[3].replace('  Test: divisible by ', '')),
      ifTrue: parseInt(lines[4].replace('    If true: throw to monkey ', '')),
      ifFalse: parseInt(lines[5].replace('    If false: throw to monkey ', '')),
      inspections: 0,
    });
  }

  return monkeys;
}
