import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/01', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual(24000);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(45000);
    });
  });
});

const input1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;