import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { FileSystemServiceImpl } from '../libs/fileSystem/fileSystemServiceImpl.js';
import { ProgrammingLanguageMapperImpl } from './mappers/programmingLanguageMapper/programmingLanguageMapperImpl.js';
import { CountLinesOfCodeCommandHandlerImpl } from './commandHandlers/countLinesOfCodeCommandHandler/countLinesOfCodeCommandHandlerImpl.js';
import Table from 'cli-table';

export class Application {
  public start(): void {
    yargs(hideBin(process.argv))
      .command(
        '$0',
        'NCloc is a simple tool to count lines of code of many programming languages',
        () => {},
        async (argv) => {
          const inputPath = argv['i'] as string;

          const excludePaths = argv['e'] as string[];

          const fileSystemService = new FileSystemServiceImpl();

          const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

          const commandHandler = new CountLinesOfCodeCommandHandlerImpl(fileSystemService, programmingLanguageMapper);

          const { programmingLanguageToFilesInfo } = await commandHandler.execute({ inputPath, excludePaths });

          const result = new Table({
            head: ['Programming language', 'Files', 'Lines of code'],
            style: { head: ['green'] },
            colWidths: [23, 18, 18],
            chars: {
              top: '═',
              'top-mid': '╤',
              'top-left': '╔',
              'top-right': '╗',
              bottom: '═',
              'bottom-mid': '╧',
              'bottom-left': '╚',
              'bottom-right': '╝',
              left: '║',
              'left-mid': '╟',
              mid: '─',
              'mid-mid': '┼',
              right: '║',
              'right-mid': '╢',
              middle: '│',
            },
          });

          programmingLanguageToFilesInfo.forEach((filesInfo, programmingLanguage) => {
            result.push([programmingLanguage, String(filesInfo.numberOfFiles), String(filesInfo.numberOfLines)]);
          });

          console.log(result.toString());
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
