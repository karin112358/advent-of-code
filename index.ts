import { logError } from './functions/log';

const { exec, spawn } = require('node:child_process');

try {
  const command = spawn(`ts-node ./${process.argv[2]}/index.ts`, {
    shell: true,
  });

  // errors
  command.stderr.on('data', (error: any) => {
    logError(error);
  });

  // show output
  command.stdout.on('data', (output: any) => {
    console.log(output.toString());
  });
} catch (error: any) {
  console.error(error);
}
