import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command(
    '$0',
    'Count lines of code in given file/directory.',
    () => {},
    (argv) => {
      const input = argv['i'] as string;

      const exclude = argv['e'] as string;

      console.log();
    },
  )
  .option('i', { alias: 'input', describe: 'Directory/file to count lines in', type: 'string', demandOption: true })
  .option('e', {
    alias: 'exclude',
    describe: 'Directories/files to be excluded from counting',
    type: 'array',
    demandOption: false,
  })
  .help(true).argv;
