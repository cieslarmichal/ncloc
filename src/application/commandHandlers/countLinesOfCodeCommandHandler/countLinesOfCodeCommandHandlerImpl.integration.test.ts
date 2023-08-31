import { describe, it, expect, beforeAll } from 'vitest';
import { FileSystemServiceImpl } from '../../../libs/fileSystem/fileSystemServiceImpl';
import { ProgrammingLanguageMapperImpl } from '../../mappers/programmingLanguageMapper/programmingLanguageMapperImpl';
import { CountLinesOfCodeCommandHandlerImpl } from './countLinesOfCodeCommandHandlerImpl';
import { ExcludePathNotExistsError } from '../../errors/excludePathNotExistsError';
import { InputPathNotExistsError } from '../../errors/inputPathNotExistsError';
import { join } from 'path';
import { ProgrammingLanguage } from '../../programmingLanguage';

describe('CountLinesOfCodeCommandHandlerImpl', () => {
  const fileSystemService = new FileSystemServiceImpl();

  const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

  const countLinesOfCodeCommandHandler = new CountLinesOfCodeCommandHandlerImpl(
    fileSystemService,
    programmingLanguageMapper,
  );

  const testDataDirectory = join(__dirname, '..', '..', '..', 'tests', 'data');

  beforeAll(() => {
    console.log({ testDataDirectory });
  });

  it('returns lines of code by programming languages without excluded paths', async () => {
    const { programmingLanguagesToNumberOfLines } = await countLinesOfCodeCommandHandler.execute({
      inputPath: testDataDirectory,
      excludePaths: [],
    });

    expect(programmingLanguagesToNumberOfLines.keys.length).toEqual(5);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.cpp)).toEqual(8);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.csharp)).toEqual(10);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.go)).toEqual(6);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.javascript)).toEqual(97);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.python)).toEqual(4);
  });

  it('returns lines of code by programming languages with excluded paths', async () => {
    const excludePath1 = join(testDataDirectory, 'cpp');

    const excludePath2 = join(testDataDirectory, 'csharp');

    const excludePaths: string[] = [excludePath1, excludePath2];

    const { programmingLanguagesToNumberOfLines } = await countLinesOfCodeCommandHandler.execute({
      inputPath: testDataDirectory,
      excludePaths,
    });

    expect(programmingLanguagesToNumberOfLines.keys.length).toEqual(3);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.go)).toEqual(6);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.javascript)).toEqual(97);
    expect(programmingLanguagesToNumberOfLines.get(ProgrammingLanguage.python)).toEqual(4);
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
