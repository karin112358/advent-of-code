import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/02', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual(15);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(12);
    });
  });
});

const input1 = `A Y
B X
C Z`;