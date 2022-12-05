import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/03', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual(157);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(70);
    });
  });
});

const input1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;