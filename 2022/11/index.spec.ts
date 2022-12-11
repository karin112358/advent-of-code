import { readFileSync } from 'fs';
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

const input1 = { value: readFileSync('./2022/11/testinput.txt', 'utf-8'), result1: 10605, result2: 2713310158 };
