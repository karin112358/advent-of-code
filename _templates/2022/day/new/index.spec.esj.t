---
to: 2022/<%= name %>/index.spec.ts
---
import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/<%= name %>', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual(42);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(42);
    });
  });
});

const input1 = ``;