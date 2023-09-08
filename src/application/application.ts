import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileSystemServiceImpl } from '../libs/fileSystem/fileSystemServiceImpl.js';
import { CountLinesOfCodeCommandHandlerImpl } from './commandHandlers/countLinesOfCodeCommandHandler/countLinesOfCodeCommandHandlerImpl.js';
import Table from 'cli-table';
import { BaseError } from './errors/baseError.js';
import { ProgrammingLanguageServiceImpl } from './services/programmingLanguageServiceImpl.js';
import { FindSupportedProgrammingLanguagesQueryHandlerImpl } from './queryHandlers/findSupportedProgrammingLanguagesQueryHandler/findSupportedProgrammingLanguagesQueryHandlerImpl.js';

export class Application {
  public start(): void {
    yargs(hideBin(process.argv))
      .command(
        'languages',
        'Show supported languages.',
        () => {},
        async () => {
          const programmingLanguageService = new ProgrammingLanguageServiceImpl();

          const queryHandler = new FindSupportedProgrammingLanguagesQueryHandlerImpl(programmingLanguageService);

          const { programmingLanguages } = queryHandler.execute();

          const result = new Table({
            head: ['Programming language', 'Extensions'],
            style: { head: ['green'] },
            colWidths: [23, 25],
          });

          programmingLanguages.map((programmingLanguage) => {
            result.push([programmingLanguage.programmingLanguageName, programmingLanguage.fileExtensions.join(' ')]);
          });

          console.log(result.toString());
        },
      )
      .command(
        '$0 <input>',
        'Count lines of code in given file or directory.',
        () => {},
        async (argv) => {
          const inputPath = argv['input'] as string;

          const excludePaths = argv['e'] as string[];

          const fileSystemService = new FileSystemServiceImpl();

          const programmingLanguageService = new ProgrammingLanguageServiceImpl();

          const commandHandler = new CountLinesOfCodeCommandHandlerImpl(fileSystemService, programmingLanguageService);

          let programmingLanguageNamesToFilesInfo;

          try {
            const result = await commandHandler.execute({ inputPath, excludePaths });

            programmingLanguageNamesToFilesInfo = result.programmingLanguageNamesToFilesInfo;
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

          programmingLanguageNamesToFilesInfo.forEach((filesInfo, programmingLanguageName) => {
            result.push([programmingLanguageName, String(filesInfo.numberOfFiles), String(filesInfo.numberOfLines)]);
          });

          console.log(result.toString());
        },
      )
      .positional('input', {
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
      .help().argv;
  }
}
