import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileSystemServiceImpl } from '../libs/fileSystem/fileSystemServiceImpl.js';
import { ProgrammingLanguageMapperImpl } from './mappers/programmingLanguageMapper/programmingLanguageMapperImpl.js';
import { CountLinesOfCodeCommandHandlerImpl } from './commandHandlers/countLinesOfCodeCommandHandler/countLinesOfCodeCommandHandlerImpl.js';
import Table from 'cli-table';
import { BaseError } from './errors/baseError.js';

export class Application {
  public start(): void {
    yargs(hideBin(process.argv))
      .command(
        '$0',
        'Count lines of code in given file or directory.',
        () => {},
        async (argv) => {
          const inputPath = argv['i'] as string;

          const excludePaths = argv['e'] as string[];

          const fileSystemService = new FileSystemServiceImpl();

          const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

          const commandHandler = new CountLinesOfCodeCommandHandlerImpl(fileSystemService, programmingLanguageMapper);

          let programmingLanguageToFilesInfo;

          try {
            const result = await commandHandler.execute({ inputPath, excludePaths });

            programmingLanguageToFilesInfo = result.programmingLanguageToFilesInfo;
          } catch (error) {
            if (error instanceof BaseError) {
              console.error({ errorMessage: error.message, errorContext: error.context });
            } else {
              console.error({ error });
            }

            return;
          }

          const result = new Table({
            head: ['Programming language', 'Files', 'Lines of code'],
            style: { head: ['green'] },
            colWidths: [23, 18, 18],
          });

          programmingLanguageToFilesInfo.forEach((filesInfo, programmingLanguage) => {
            result.push([programmingLanguage, String(filesInfo.numberOfFiles), String(filesInfo.numberOfLines)]);
          });

          console.log(result.toString());
        },
      )
      .option('i', {
        alias: 'input',
        describe: 'Directory/file absolute path to count lines in',
        type: 'string',
        demandOption: true,
      })
      .option('e', {
        alias: 'exclude',
        describe: 'Directories/files absolute paths to be excluded from counting',
        type: 'array',
        demandOption: false,
      })
      .help(true).argv;
  }
}
