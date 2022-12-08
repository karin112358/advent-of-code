import { part1, part2 } from './solve';

describe('Day 2022/06', () => {
  describe('Part 1', () => {
    it('test 1', () => {
      expect(part1(input1.value)).toEqual(input1.result1);
      expect(part1(input2.value)).toEqual(input2.result1);
      expect(part1(input3.value)).toEqual(input3.result1);
      expect(part1(input4.value)).toEqual(input4.result1);
      expect(part1(input5.value)).toEqual(input5.result1);
    });
  });

  describe('Part 2', () => {
    it('test 1', () => {
      expect(part2(input1.value)).toEqual(input1.result2);
      expect(part2(input2.value)).toEqual(input2.result2);
      expect(part2(input3.value)).toEqual(input3.result2);
      expect(part2(input4.value)).toEqual(input4.result2);
      expect(part2(input5.value)).toEqual(input5.result2);
    });
  });
});

const input1 = { value: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, result1: 7, result2: 19 };
const input2 = { value: `bvwbjplbgvbhsrlpgdmjqwftvncz`, result1: 5, result2: 23 };
const input3 = { value: `nppdvjthqldpwncqszvftbrmjlhg`, result1: 6, result2: 23 };
const input4 = { value: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, result1: 10, result2: 29 };
const input5 = { value: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, result1: 11, result2: 26 };
