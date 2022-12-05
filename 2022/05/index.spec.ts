import { part1 } from '.';
import { part2 } from '.';

describe('Day 2022/05', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1)).toEqual('CMZ');
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1)).toEqual(42);
    });
  });
});

const input1 = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;