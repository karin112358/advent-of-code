import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/04', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual(2);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(4);
    });
  });
});

const input1 = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;