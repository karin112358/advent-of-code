import { logError, logHighlight, logSuccess } from '../../functions/log';

interface File {
  name: string;
  size: number;
}

interface Directory {
  name: string;
  files: File[];
  directories: Directory[];
  parent: Directory | null;
}

export function part1(input: string): string | number {
  const { directories } = getTree(input);

  let result = 0;

  for (let dir of directories) {
    const dirSize = getSize(dir);
    if (dirSize <= 100000) {
      result += dirSize;
    }
  }

  return result;
}

export function part2(input: string): string | number {
  const { directories, root } = getTree(input);

  let result = 0;
  let dirSizes: number[] = [];

  for (let dir of directories) {
    const dirSize = getSize(dir);
    dirSizes.push(dirSize);

    if (dirSize <= 100000) {
      result += dirSize;
    }
  }

  const rootSize = getSize(root);
  dirSizes = dirSizes.filter((d) => d >= 30000000 - (70000000 - rootSize)).sort((a, b) => a - b);

  return dirSizes[0];
}

function getTree(input: string): { directories: Directory[]; root: Directory } {
  const rows = splitInput(input);
  const root = <Directory>{ name: '/', files: [], directories: [], parent: null };
  const directories: Directory[] = [];
  let currentDir = root;

  for (const row of rows) {
    if (row.indexOf('$ cd') === 0) {
      const dir = row.replace('$ cd ', '');
      if (dir === '/') {
        currentDir = root;
      } else if (dir === '..') {
        currentDir = <Directory>currentDir.parent;
      } else {
        currentDir = currentDir.directories.find((d) => d.name === dir)!;
      }
    } else if (row.indexOf('dir') === 0) {
      const dir = row.replace('dir ', '');

      if (!currentDir.directories.find((d) => d.name === dir)) {
        const newDir = { name: dir, files: [], directories: [], parent: currentDir };
        currentDir.directories.push(newDir);
        directories.push(newDir);
      }
    } else if (row.indexOf('$ ls') === 0) {
      // do nothing
    } else {
      // add file
      const file = row.split(' ');
      currentDir.files.push({ name: file[1], size: parseInt(file[0]) });
    }
  }

  return { directories, root };
}

function getSize(dir: Directory): number {
  let dirSize = dir.files.reduce((prev, curr) => prev + curr.size, 0);

  for (let subDir of dir.directories) {
    dirSize += getSize(subDir);
  }

  return dirSize;
}

function splitInput(input: string): string[] {
  return input.split(/\r?\n/);
}
