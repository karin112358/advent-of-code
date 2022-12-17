import { logError, logHighlight, logSuccess } from '../../functions/log';

export function part1(input: string): string | number {
  let jetIndex = 0;
  const tower: string[] = [];
  const rocks: string[][] = [];

  rocks.push(['..####.']);
  rocks.push(['...#...', '..###..', '...#...']);
  rocks.push(['....#..', '....#..', '..###..']);
  rocks.push(['..#....', '..#....', '..#....', '..#....']);
  rocks.push(['..##...', '..##...']);

  for (let i = 0; i < 2022; i++) {
    let rock = rocks[i % rocks.length].slice();
    let pos = tower.length + 3;
    let canFall = true;

    while (canFall) {
      // jet
      rock = applyJet(tower, rock, input[jetIndex % input.length], pos);

      // fall
      canFall = canMoveDown(tower, rock, pos);

      // add to tower
      if (!canFall) {
        addToTower(tower, rock, pos);
      }

      pos--;
      jetIndex++;
    }
  }

  return tower.length;
}

export function part2(input: string): string | number {
  let jetIndex = 0;
  const tower: string[] = [];
  const rocks: string[][] = [];
  const added: number[] = [];

  rocks.push(['..####.']);
  rocks.push(['...#...', '..###..', '...#...']);
  rocks.push(['....#..', '....#..', '..###..']);
  rocks.push(['..#....', '..#....', '..#....', '..#....']);
  rocks.push(['..##...', '..##...']);

  let prevTowerLength = 0;
  let maxRocks = 1000000000000;
  let repeatHeight = 0;
  let repeatLength = 0;
  let minRepeatLength = 100;

  for (let i = 0; i < maxRocks; i++) {
    let rock = rocks[i % rocks.length].slice();
    let pos = tower.length + 3;
    let canFall = true;

    while (canFall) {
      // jet
      rock = applyJet(tower, rock, input[jetIndex % input.length], pos);

      // fall
      canFall = canMoveDown(tower, rock, pos);

      // add to tower
      if (!canFall) {
        addToTower(tower, rock, pos);
      }

      pos--;
      jetIndex++;
    }

    added.push(tower.length - prevTowerLength);
    prevTowerLength = tower.length;

    // find repeating pattern
    if (added.length > 10000 && !repeatHeight) {
      for (let length = minRepeatLength; length <= added.length / 2; length++) {
        const last = added.slice(added.length - length);
        const prev = added.slice(added.length - length - length, added.length - length);

        if (last.map((x) => x.toString()).join(',') === prev.map((x) => x.toString()).join(',')) {
          const height = last.reduce((prev, curr) => prev + curr, 0);
          repeatHeight = height;
          repeatLength = last.length;
          maxRocks = i + ((maxRocks - i) % repeatLength);
        }
      }
    }
  }

  return tower.length + repeatHeight * ((1000000000000 - maxRocks) / repeatLength);
}

function addToTower(tower: string[], rock: string[], pos: number) {
  for (let i = 0; i < rock.length; i++) {
    const towerPos = pos + (rock.length - 1 - i);

    if (!tower[towerPos]) {
      tower[towerPos] = rock[i];
    } else {
      let newRow = '';
      for (let j = 0; j < tower[0].length; j++) {
        if (rock[i][j] === '#') {
          newRow += '#';
        } else {
          newRow += tower[towerPos][j];
        }
      }
      tower[towerPos] = newRow;
    }
  }
}

function canMoveDown(tower: string[], rock: string[], pos: number): boolean {
  let canMove = pos > 0;

  for (let i = 0; i < rock.length && canMove; i++) {
    const towerRow = tower[pos - 1 + (rock.length - 1 - i)];
    if (towerRow) {
      for (let j = 0; j < tower[0].length; j++) {
        if (rock[i][j] === '#' && towerRow[j] === '#') {
          canMove = false;
        }
      }
    }
  }

  return canMove;
}

function applyJet(tower: string[], rock: string[], jet: string, pos: number): string[] {
  let canMove = true;
  for (let i = 0; i < rock.length && canMove; i++) {
    if (jet === '>') {
      if (rock[i].endsWith('#')) {
        canMove = false;
      }
    } else if (jet === '<') {
      if (rock[i].startsWith('#')) {
        canMove = false;
      }
    }

    // check tower
    const towerRow = tower[pos + (rock.length - 1 - i)];
    if (towerRow) {
      if (jet === '>') {
        for (let j = 1; j < tower[0].length; j++) {
          if (rock[i][j - 1] === '#' && towerRow[j] === '#') {
            canMove = false;
          }
        }
      } else {
        for (let j = 0; j < tower[0].length - 1; j++) {
          if (rock[i][j + 1] === '#' && towerRow[j] === '#') {
            canMove = false;
          }
        }
      }
    }
  }

  if (canMove) {
    for (let i = 0; i < rock.length; i++) {
      if (jet === '>') {
        rock[i] = '.' + rock[i].substring(0, rock[i].length - 1);
      } else if (jet === '<') {
        rock[i] = rock[i].substring(1) + '.';
      }
    }
  }

  return rock;
}
