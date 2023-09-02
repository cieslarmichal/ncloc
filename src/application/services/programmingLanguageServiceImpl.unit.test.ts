import { describe, it, expect } from 'vitest';
import { ProgrammingLanguageName } from '../programmingLanguageName.js';
import { ProgrammingLanguageServiceImpl } from './programmingLanguageServiceImpl.js';
import { ProgrammingLanguage } from '../programmingLanguage.js';

describe('ProgrammingLanguageServiceImpl', () => {
  const programmingLanguageServiceImpl = new ProgrammingLanguageServiceImpl();

  it('finds C++ programming language by file extension', () => {
    const result1 = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.h' });
    const result2 = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.hpp' });
    const result3 = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.cpp' });

    expect(result1).toEqual(ProgrammingLanguageName.cpp);
    expect(result2).toEqual(ProgrammingLanguageName.cpp);
    expect(result3).toEqual(ProgrammingLanguageName.cpp);
  });

  it('finds C# programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.cs' });

    expect(result).toEqual(ProgrammingLanguageName.csharp);
  });

  it('finds Go programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.go' });

    expect(result).toEqual(ProgrammingLanguageName.go);
  });

  it('finds Java programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.java' });

    expect(result).toEqual(ProgrammingLanguageName.java);
  });

  it('finds Javascript programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.js' });

    expect(result).toEqual(ProgrammingLanguageName.javascript);
  });

  it('finds Typescript programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.ts' });

    expect(result).toEqual(ProgrammingLanguageName.typescript);
  });

  it('finds Python programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.py' });

    expect(result).toEqual(ProgrammingLanguageName.python);
  });

  it('finds PHP programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.php' });

    expect(result).toEqual(ProgrammingLanguageName.php);
  });

  it('finds Rust programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.rs' });

    expect(result).toEqual(ProgrammingLanguageName.rust);
  });

  it('finds Ruby programming language by file extension', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.rb' });

    expect(result).toEqual(ProgrammingLanguageName.ruby);
  });

  it('returns null when programming language not found', () => {
    const result = programmingLanguageServiceImpl.findProgrammingLanguageByFileExtension({ fileExtension: '.px' });

    expect(result).toBeUndefined();
  });

  it('returns all programming languages', () => {
    const expectedProgrammingLanguages: ProgrammingLanguage[] = [
      { programmingLanguageName: ProgrammingLanguageName.cpp, fileExtensions: ['.h', '.hpp', '.cpp'] },
      { programmingLanguageName: ProgrammingLanguageName.csharp, fileExtensions: ['.cs'] },
      { programmingLanguageName: ProgrammingLanguageName.python, fileExtensions: ['.py'] },
      { programmingLanguageName: ProgrammingLanguageName.java, fileExtensions: ['.java'] },
      { programmingLanguageName: ProgrammingLanguageName.go, fileExtensions: ['.go'] },
      { programmingLanguageName: ProgrammingLanguageName.javascript, fileExtensions: ['.js'] },
      { programmingLanguageName: ProgrammingLanguageName.typescript, fileExtensions: ['.ts'] },
      { programmingLanguageName: ProgrammingLanguageName.php, fileExtensions: ['.php'] },
      { programmingLanguageName: ProgrammingLanguageName.rust, fileExtensions: ['.rs'] },
      { programmingLanguageName: ProgrammingLanguageName.ruby, fileExtensions: ['.rb'] },
    ];

    const result = programmingLanguageServiceImpl.findAllProgrammingLanguages();

    expect(result).toEqual(expectedProgrammingLanguages);
  });
});
