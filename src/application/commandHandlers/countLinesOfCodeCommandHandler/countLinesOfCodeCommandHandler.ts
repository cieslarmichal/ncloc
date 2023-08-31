import { extname } from 'path';
import { FileSystemService } from '../../../libs/fileSystem/fileSystemService';
import { ExcludePathNotExistsError } from '../../errors/excludePathNotExistsError';
import { InputPathNotExistsError } from '../../errors/inputPathNotExistsError';
import { ProgrammingLanguage } from '../../programmingLanguage';
import { ProgrammingLanguageMapper } from '../../mappers/programmingLanguageMapper/programmingLanguageMapper';

export interface CreateAddressCommandHandlerPayload {
  inputPath: string;
  excludePaths: string[];
}

export interface CreateAddressCommandHandlerResult {
  programmingLanguagesToNumberOfLines: Map<ProgrammingLanguage, number>;
}

export interface ValidateIfPathsExistPayload {
  inputPath: string;
  excludePaths: string[];
}

export interface GetAllFilesPathsPayload {
  path: string;
}

export interface SumNumberOfLinesByFileExtensionsPayload {
  filesPaths: string[];
}

export class CountLinesOfCodeCommandHandler {
  public constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly programmingLanguageMapper: ProgrammingLanguageMapper,
  ) {}

  public async execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult> {
    const { inputPath, excludePaths } = payload;

    this.validateIfPathsExist({ inputPath, excludePaths });

    const filesPaths = await this.getAllFilesPaths({ path: inputPath });

    const filteredFilePaths = filesPaths.filter((filePath) =>
      excludePaths.find((excludePath) => filePath.includes(excludePath)),
    );

    const fileExtensionsToNumberOfLinesMapping = await this.sumNumberOfLinesByFileExtensions({
      filesPaths: filteredFilePaths,
    });

    const programmingLanguageToNumberOfLinesMapping = new Map<ProgrammingLanguage, number>();

    fileExtensionsToNumberOfLinesMapping.forEach((numberOfLines, fileExtension) => {
      const programmingLanguage = this.programmingLanguageMapper.mapFromFileExtension({ fileExtension });

      const currentNumberOfLines = programmingLanguageToNumberOfLinesMapping.get(programmingLanguage) ?? 0;

      programmingLanguageToNumberOfLinesMapping.set(programmingLanguage, currentNumberOfLines + numberOfLines);
    });

    return { programmingLanguagesToNumberOfLines: programmingLanguageToNumberOfLinesMapping };
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

  private async sumNumberOfLinesByFileExtensions(
    payload: SumNumberOfLinesByFileExtensionsPayload,
  ): Promise<Map<string, number>> {
    const { filesPaths } = payload;

    const fileExtensionsToNumberOfLinesMapping = await Promise.all(
      filesPaths.map(async (filePath) => {
        const fileExtension = extname(filePath);

        const fileContent = await this.fileSystemService.readFile({ filePath });

        const numberOfLines = fileContent.split('\n').length;

        return { fileExtension, numberOfLines };
      }),
    );

    const fileExtensionsToNumberOfLinesSumMapping = new Map<string, number>();

    fileExtensionsToNumberOfLinesMapping.forEach(({ fileExtension, numberOfLines }) => {
      const currentNumberOfLines = fileExtensionsToNumberOfLinesSumMapping.get(fileExtension) ?? 0;

      fileExtensionsToNumberOfLinesSumMapping.set(fileExtension, currentNumberOfLines + numberOfLines);
    });

    return fileExtensionsToNumberOfLinesSumMapping;
  }
}
