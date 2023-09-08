import { extname, resolve } from 'path';
import { FileSystemService } from '../../../libs/fileSystem/fileSystemService.js';
import { ExcludePathNotExistsError } from '../../errors/excludePathNotExistsError.js';
import { InputPathNotExistsError } from '../../errors/inputPathNotExistsError.js';
import {
  CountLinesOfCodeCommandHandler,
  CreateAddressCommandHandlerPayload,
  CreateAddressCommandHandlerResult,
  ProgrammingLanguageFilesInfo,
} from './countLinesOfCodeCommandHandler.js';
import { ProgrammingLanguageService } from '../../services/programmingLanguageService.js';
import { ProgrammingLanguageName } from '../../programmingLanguageName.js';

export interface ValidateIfPathsExistPayload {
  readonly inputPath: string;
  readonly excludePaths: string[];
}

export interface GetAllFilesPathsPayload {
  readonly path: string;
}

export class CountLinesOfCodeCommandHandlerImpl implements CountLinesOfCodeCommandHandler {
  public constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly programmingLanguageService: ProgrammingLanguageService,
  ) {}

  public async execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult> {
    const { inputPath, excludePaths = [] } = payload;

    this.validateIfPathsExist({ inputPath, excludePaths });

    const absoluteInputPath = resolve(inputPath);
    const absoluteExcludePaths = excludePaths.map((excludePath) => resolve(excludePath));

    const allFilesPaths = await this.getAllFilesPaths({ path: absoluteInputPath });

    const filteredFilePaths = allFilesPaths.filter(
      (filePath) => absoluteExcludePaths.find((excludePath) => filePath.includes(excludePath)) === undefined,
    );

    const fileExtensionsAndNumberOfLines: [string, number][] = await Promise.all(
      filteredFilePaths.map(async (filePath) => {
        const fileExtension = extname(filePath);

        const fileContent = await this.fileSystemService.readFile({ filePath });

        const fileContentLength = fileContent.split('\n').length;

        return [fileExtension, fileContentLength];
      }),
    );

    const programmingLanguageNamesToFilesInfo = new Map<ProgrammingLanguageName, ProgrammingLanguageFilesInfo>();

    fileExtensionsAndNumberOfLines.forEach(([fileExtension, numberOfLines]) => {
      const programmingLanguage = this.programmingLanguageService.findProgrammingLanguageByFileExtension({
        fileExtension,
      });

      if (!programmingLanguage) {
        return;
      }

      const { programmingLanguageName } = programmingLanguage;

      const programmingLanguageFilesInfo = programmingLanguageNamesToFilesInfo.get(programmingLanguageName);

      const currentProgrammingLanguageFiles = programmingLanguageFilesInfo
        ? programmingLanguageFilesInfo.numberOfFiles
        : 0;

      const currentProgrammingLanguageLines = programmingLanguageFilesInfo
        ? programmingLanguageFilesInfo.numberOfLines
        : 0;

      programmingLanguageNamesToFilesInfo.set(programmingLanguageName, {
        numberOfFiles: currentProgrammingLanguageFiles + 1,
        numberOfLines: currentProgrammingLanguageLines + numberOfLines,
      });
    });

    return { programmingLanguageNamesToFilesInfo };
  }

  private validateIfPathsExist(payload: ValidateIfPathsExistPayload): void {
    const { inputPath, excludePaths } = payload;

    if (!this.fileSystemService.checkIfPathExists({ path: inputPath })) {
      throw new InputPathNotExistsError({ path: inputPath });
    }

    excludePaths.map((excludePath) => {
      if (!this.fileSystemService.checkIfPathExists({ path: excludePath })) {
        throw new ExcludePathNotExistsError({ path: excludePath });
      }
    });
  }

  private async getAllFilesPaths(payload: GetAllFilesPathsPayload): Promise<string[]> {
    const { path } = payload;

    let filesPaths: string[];

    if (await this.fileSystemService.checkIfPathIsDirectory({ path })) {
      filesPaths = await this.fileSystemService.getAllFilesFromDirectory({ directoryPath: path });
    } else {
      filesPaths = [path];
    }

    return filesPaths;
  }
}
