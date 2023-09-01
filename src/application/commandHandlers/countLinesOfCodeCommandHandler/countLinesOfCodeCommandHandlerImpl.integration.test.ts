import { describe, it, expect } from 'vitest';
import { FileSystemServiceImpl } from '../../../libs/fileSystem/fileSystemServiceImpl.js';
import { ProgrammingLanguageMapperImpl } from '../../mappers/programmingLanguageMapper/programmingLanguageMapperImpl.js';
import { CountLinesOfCodeCommandHandlerImpl } from './countLinesOfCodeCommandHandlerImpl.js';
import { ExcludePathNotExistsError } from '../../errors/excludePathNotExistsError.js';
import { InputPathNotExistsError } from '../../errors/inputPathNotExistsError.js';
import { join } from 'path';
import { ProgrammingLanguage } from '../../programmingLanguage.js';

describe('CountLinesOfCodeCommandHandlerImpl', () => {
  const fileSystemService = new FileSystemServiceImpl();

  const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

  const countLinesOfCodeCommandHandler = new CountLinesOfCodeCommandHandlerImpl(
    fileSystemService,
    programmingLanguageMapper,
  );

  const testDataDirectory = join(__dirname, '..', '..', '..', 'tests', 'data');

  it('returns lines of code by programming languages without excluded paths', async () => {
    const { programmingLanguageToFilesInfo } = await countLinesOfCodeCommandHandler.execute({
      inputPath: testDataDirectory,
      excludePaths: [],
    });

    expect(programmingLanguageToFilesInfo.size).toEqual(6);
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.cpp)).toEqual({ numberOfFiles: 1, numberOfLines: 8 });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.csharp)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 10,
    });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.go)).toEqual({ numberOfFiles: 1, numberOfLines: 6 });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.javascript)).toEqual({
      numberOfFiles: 2,
      numberOfLines: 32,
    });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.python)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 4,
    });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.java)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 16,
    });
  });

  it('returns lines of code by programming languages with excluded paths', async () => {
    const excludePath1 = join(testDataDirectory, 'cpp');

    const excludePath2 = join(testDataDirectory, 'csharp');

    const excludePath3 = join(testDataDirectory, 'nested', 'javascript', 'example1.js');

    const excludePaths: string[] = [excludePath1, excludePath2, excludePath3];

    const { programmingLanguageToFilesInfo } = await countLinesOfCodeCommandHandler.execute({
      inputPath: testDataDirectory,
      excludePaths,
    });

    expect(programmingLanguageToFilesInfo.size).toEqual(4);
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.go)).toEqual({ numberOfFiles: 1, numberOfLines: 6 });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.javascript)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 12,
    });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.python)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 4,
    });
    expect(programmingLanguageToFilesInfo.get(ProgrammingLanguage.java)).toEqual({
      numberOfFiles: 1,
      numberOfLines: 16,
    });
  });

  it('throws if provided input path does not exist', async () => {
    const inputPath = 'invalid';

    try {
      await countLinesOfCodeCommandHandler.execute({ inputPath, excludePaths: [] });
    } catch (error) {
      expect(error).toBeInstanceOf(InputPathNotExistsError);

      return;
    }

    expect.fail();
  });

  it('throws if provided exclude path does not exist', async () => {
    const excludePaths: string[] = ['invalid'];

    try {
      await countLinesOfCodeCommandHandler.execute({ inputPath: testDataDirectory, excludePaths });
    } catch (error) {
      expect(error).toBeInstanceOf(ExcludePathNotExistsError);

      return;
    }

    expect.fail();
  });
});
