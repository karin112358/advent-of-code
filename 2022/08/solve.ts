import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  const trees = splitInput(input);
  let result = 0;

  for (let r = 1; r < trees.length - 1; r++) {
    for (let c = 1; c < trees[r].length - 1; c++) {
      let counted = false;

      let visible = true;
      for (let r1 = 0; r1 < r && visible && !counted; r1++) {
        visible = !(trees[r1][c] >= trees[r][c]);
      }

      if (visible && !counted) {
        counted = true;
        result++;
      }

      visible = true;
      for (let r1 = r + 1; r1 < trees.length && visible && !counted; r1++) {
        visible = !(trees[r1][c] >= trees[r][c]);
      }
      if (visible && !counted) {
        counted = true;
        result++;
      }

      visible = true;
      for (let c1 = 0; c1 < c && visible && !counted; c1++) {
        visible = !(trees[r][c1] >= trees[r][c]);
      }
      if (visible && !counted) {
        counted = true;
        result++;
      }

      visible = true;
      for (let c1 = c + 1; c1 < trees[r].length && visible && !counted; c1++) {
        visible = !(trees[r][c1] >= trees[r][c]);
      }
      if (visible && !counted) {
        counted = true;
        result++;
      }
    }
  }

  result += trees.length * 2 + (trees[0].length - 2) * 2;
  return result;
}

export function part2(input: string): string | number {
  const trees = splitInput(input);
  let result = 0;

  for (let r = 1; r < trees.length - 1; r++) {
    for (let c = 1; c < trees[r].length - 1; c++) {
      let score = 1;

      let visibleCount = 0;
      let visible = true;
      for (let r1 = r - 1; r1 >= 0 && visible; r1--) {
        visibleCount++;
        visible = !(trees[r1][c] >= trees[r][c]);
      }

      if (visibleCount > 0) {
        score *= visibleCount;
      }

      visibleCount = 0;
      visible = true;
      for (let r1 = r + 1; r1 < trees.length && visible; r1++) {
        visibleCount++;
        visible = !(trees[r1][c] >= trees[r][c]);
      }

      if (visibleCount > 0) {
        score *= visibleCount;
      }

      visibleCount = 0;
      visible = true;
      for (let c1 = c - 1; c1 >= 0 && visible; c1--) {
        visibleCount++;
        visible = !(trees[r][c1] >= trees[r][c]);
      }

      if (visibleCount > 0) {
        score *= visibleCount;
      }

      visibleCount = 0;
      visible = true;
      for (let c1 = c + 1; c1 < trees[r].length && visible; c1++) {
        visibleCount++;
        visible = !(trees[r][c1] >= trees[r][c]);
      }

      if (visibleCount > 0) {
        score *= visibleCount;
      }

      if (score > result) {
        result = score;
      }
    }
  }

  return result;
}

function splitInput(input: string): number[][] {
  return input.split(/\r?\n/).map((r) => r.split('').map((t) => parseInt(t)));
}
