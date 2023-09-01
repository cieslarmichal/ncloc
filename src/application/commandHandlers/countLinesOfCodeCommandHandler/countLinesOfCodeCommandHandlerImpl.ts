import { extname } from 'path';
import { FileSystemService } from '../../../libs/fileSystem/fileSystemService.js';
import { ExcludePathNotExistsError } from '../../errors/excludePathNotExistsError.js';
import { InputPathNotExistsError } from '../../errors/inputPathNotExistsError.js';
import { ProgrammingLanguage } from '../../programmingLanguage.js';
import { ProgrammingLanguageMapper } from '../../mappers/programmingLanguageMapper/programmingLanguageMapper.js';
import {
  CountLinesOfCodeCommandHandler,
  CreateAddressCommandHandlerPayload,
  CreateAddressCommandHandlerResult,
  ProgrammingLanguageFilesInfo,
} from './countLinesOfCodeCommandHandler.js';

export interface ValidateIfPathsExistPayload {
  inputPath: string;
  excludePaths: string[];
}

export interface GetAllFilesPathsPayload {
  path: string;
}

export class CountLinesOfCodeCommandHandlerImpl implements CountLinesOfCodeCommandHandler {
  public constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly programmingLanguageMapper: ProgrammingLanguageMapper,
  ) {}

  public async execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult> {
    const { inputPath, excludePaths = [] } = payload;

    this.validateIfPathsExist({ inputPath, excludePaths });

    const allFilesPaths = await this.getAllFilesPaths({ path: inputPath });

    const filteredFilePaths = allFilesPaths.filter(
      (filePath) => excludePaths.find((excludePath) => filePath.includes(excludePath)) === undefined,
    );

    const fileExtensionsAndNumberOfLines: [string, number][] = await Promise.all(
      filteredFilePaths.map(async (filePath) => {
        const fileExtension = extname(filePath);

        const fileContent = await this.fileSystemService.readFile({ filePath });

        const fileContentLength = fileContent.split('\n').length;

        return [fileExtension, fileContentLength];
      }),
    );

    const programmingLanguageToFilesInfo = new Map<ProgrammingLanguage, ProgrammingLanguageFilesInfo>();

    fileExtensionsAndNumberOfLines.forEach(([fileExtension, numberOfLines]) => {
      const programmingLanguage = this.programmingLanguageMapper.mapFromFileExtension({ fileExtension });

      if (!programmingLanguage) {
        return;
      }

      const programmingLanguageFilesInfo = programmingLanguageToFilesInfo.get(programmingLanguage);

      const currentProgrammingLanguageFiles = programmingLanguageFilesInfo
        ? programmingLanguageFilesInfo.numberOfFiles
        : 0;

      const currentProgrammingLanguageLines = programmingLanguageFilesInfo
        ? programmingLanguageFilesInfo.numberOfLines
        : 0;

      programmingLanguageToFilesInfo.set(programmingLanguage, {
        numberOfFiles: currentProgrammingLanguageFiles + 1,
        numberOfLines: currentProgrammingLanguageLines + numberOfLines,
      });
    });

    return { programmingLanguageToFilesInfo };
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

    if (this.fileSystemService.checkIfPathIsDirectory({ path })) {
      filesPaths = await this.fileSystemService.getAllFilesFromDirectory({ directoryPath: path });
    } else {
      filesPaths = [path];
    }

    return filesPaths;
  }
}
