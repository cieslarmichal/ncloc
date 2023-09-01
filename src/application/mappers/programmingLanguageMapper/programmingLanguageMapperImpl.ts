import { ProgrammingLanguageNotFound } from '../../errors/programmingLanguageNotFound.js';
import { ProgrammingLanguage } from '../../programmingLanguage.js';
import { ProgrammingLanguageMapper, MapFromFileExtensionPayload } from './programmingLanguageMapper.js';

export class ProgrammingLanguageMapperImpl implements ProgrammingLanguageMapper {
  private readonly fileExtensionToProgrammingLanguageMapping = new Map<string, ProgrammingLanguage>([
    ['.h', ProgrammingLanguage.cpp],
    ['.hpp', ProgrammingLanguage.cpp],
    ['.cpp', ProgrammingLanguage.cpp],
    ['.go', ProgrammingLanguage.go],
    ['.java', ProgrammingLanguage.java],
    ['.py', ProgrammingLanguage.python],
    ['.cs', ProgrammingLanguage.csharp],
    ['.js', ProgrammingLanguage.javascript],
    ['.ts', ProgrammingLanguage.typescript],
    ['.php', ProgrammingLanguage.php],
    ['.rs', ProgrammingLanguage.rust],
    ['.rb', ProgrammingLanguage.ruby],
  ]);

  public mapFromFileExtension(payload: MapFromFileExtensionPayload): ProgrammingLanguage {
    const { fileExtension } = payload;

    const programmingLanguage = this.fileExtensionToProgrammingLanguageMapping.get(fileExtension);

    if (!programmingLanguage) {
      throw new ProgrammingLanguageNotFound({ fileExtension });
    }

    return programmingLanguage;
  }
}
