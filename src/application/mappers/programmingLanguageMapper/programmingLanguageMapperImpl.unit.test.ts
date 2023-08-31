import { describe, it, expect } from 'vitest';
import { ProgrammingLanguageMapperImpl } from './programmingLanguageMapperImpl';
import { ProgrammingLanguage } from '../../programmingLanguage';
import { ProgrammingLanguageNotFound } from '../../errors/programmingLanguageNotFound';


describe('ProgrammingLanguageMapperImpl', () => {
  const programmingLanguageMapper = new ProgrammingLanguageMapperImpl();

  it('maps file extension to C++ programming language', () => {
    const result1 = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.h'});
    const result2 = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.hpp'});
    const result3 = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.cpp'});

    expect(result1).toEqual(ProgrammingLanguage.cpp);
    expect(result2).toEqual(ProgrammingLanguage.cpp);
    expect(result3).toEqual(ProgrammingLanguage.cpp);
  });


  it('maps file extension to C# programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.cs'});

    expect(result).toEqual(ProgrammingLanguage.csharp);
  });

  it('maps file extension to Go programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.go'});

    expect(result).toEqual(ProgrammingLanguage.go);
  });

  it('maps file extension to Java programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.java'});

    expect(result).toEqual(ProgrammingLanguage.java);
  });

  it('maps file extension to Javascript programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.js'});

    expect(result).toEqual(ProgrammingLanguage.javascript);
  });

  it('maps file extension to Typescript programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.ts'});

    expect(result).toEqual(ProgrammingLanguage.typescript);
  });

  it('maps file extension to Python programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.py'});

    expect(result).toEqual(ProgrammingLanguage.python);
  });

  it('maps file extension to PHP programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.php'});

    expect(result).toEqual(ProgrammingLanguage.php);
  });

  it('maps file extension to Rust programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.rs'});

    expect(result).toEqual(ProgrammingLanguage.rust);
  });

  it('maps file extension to Ruby programming language', () => {
    const result = programmingLanguageMapper.mapFromFileExtension({fileExtension: '.rb'});

    expect(result).toEqual(ProgrammingLanguage.ruby);
  });

  it('throws an error when programming language mapping not found', () => {
    try {
      programmingLanguageMapper.mapFromFileExtension({fileExtension: '.px'});
    } catch (error) {
      expect(error).toBeInstanceOf(ProgrammingLanguageNotFound);

      return;
    }

    expect.fail();
  });
});
