import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileSystemServiceImpl } from '../libs/fileSystem/fileSystemServiceImpl.js';
import { ProgrammingLanguageMapperImpl } from './mappers/programmingLanguageMapper/programmingLanguageMapperImpl.js';
import { CountLinesOfCodeCommandHandlerImpl } from './commandHandlers/countLinesOfCodeCommandHandler/countLinesOfCodeCommandHandlerImpl.js';

export class Application {
  public start(): void {
    yargs(hideBin(process.argv))
      .command(
        '$0',
        'Count lines of code in given file/directory.',
        () => {},
        async (argv) => {
          const inputPath = argv['i'] as string;

          const excludePaths = argv['e'] as string[];

          const fileSystemService = new FileSystemServiceImpl();

          const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

          const commandHandler = new CountLinesOfCodeCommandHandlerImpl(fileSystemService, programmingLanguageMapper);

          await commandHandler.execute({ inputPath, excludePaths });
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
