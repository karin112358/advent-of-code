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
  });
});

const input1 = { value: `30373
25512
65332
33549
35390`, result1: 21, result2: 8 };
