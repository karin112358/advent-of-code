import { part1, part2 } from './solve';
const jestConsole = console;
beforeEach(() => (global.console = require('console')));
afterEach(() => (global.console = jestConsole));

describe('Day 2022/01', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1.value)).toEqual(input1.result1);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1.value)).toEqual(input1.result2);
    });

    it('test 2', () => {
      expect(part2(input2.value)).toEqual(input2.result2);
    });
  });
});

const input1 = { value: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`, result1: 13, result2: 1 };

const input2 = { value: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`, result1: undefined, result2: 36 };
