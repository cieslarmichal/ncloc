import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export class Application {
  public start() : void {
    yargs(hideBin(process.argv))
  .command(
    '$0',
    'Count lines of code in given file/directory.',
    () => {},
    (argv) => {
      const inputPath = argv['i'] as string;

      const excludePaths = argv['e'] as string[];

      commandHandler.execute({ inputPath, excludePaths });
    },
  )
  .option('i', {
    alias: 'input',
    describe: 'Directory/file path to count lines in',
    type: 'string',
    demandOption: true,
  })
  .option('e', {
    alias: 'exclude',
    describe: 'Directories/files paths to be excluded from counting',
    type: 'array',
    demandOption: false,
  })
  .help(true).argv;
  }
}
