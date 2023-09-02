import { ProgrammingLanguage } from '../programmingLanguage.js';
import { ProgrammingLanguageName } from '../programmingLanguageName.js';
import {
  FindProgrammingLanguageByFileExtensionPayload,
  ProgrammingLanguageService,
} from './programmingLanguageService.js';

export class ProgrammingLanguageServiceImpl implements ProgrammingLanguageService {
  private readonly programmingLanguages: ProgrammingLanguage[] = [
    { programmingLanguageName: ProgrammingLanguageName.cpp, fileExtensions: ['.h', '.hpp', '.cpp', '.cc', '.hh'] },
    { programmingLanguageName: ProgrammingLanguageName.csharp, fileExtensions: ['.cs'] },
    { programmingLanguageName: ProgrammingLanguageName.python, fileExtensions: ['.py'] },
    { programmingLanguageName: ProgrammingLanguageName.java, fileExtensions: ['.java'] },
    { programmingLanguageName: ProgrammingLanguageName.go, fileExtensions: ['.go'] },
    { programmingLanguageName: ProgrammingLanguageName.javascript, fileExtensions: ['.js'] },
    { programmingLanguageName: ProgrammingLanguageName.typescript, fileExtensions: ['.ts'] },
    { programmingLanguageName: ProgrammingLanguageName.php, fileExtensions: ['.php'] },
    { programmingLanguageName: ProgrammingLanguageName.rust, fileExtensions: ['.rs'] },
    { programmingLanguageName: ProgrammingLanguageName.ruby, fileExtensions: ['.rb'] },
    { programmingLanguageName: ProgrammingLanguageName.kotlin, fileExtensions: ['.kt', '.kts'] },
    { programmingLanguageName: ProgrammingLanguageName.swift, fileExtensions: ['.swift'] },
    { programmingLanguageName: ProgrammingLanguageName.r, fileExtensions: ['.r'] },
    { programmingLanguageName: ProgrammingLanguageName.scala, fileExtensions: ['.scala'] },
    { programmingLanguageName: ProgrammingLanguageName.perl, fileExtensions: ['.pl'] },
  ];

  private readonly fileExtensionToProgrammingLanguageMapping = new Map<string, ProgrammingLanguage>();

  public constructor() {
    this.programmingLanguages.map((programmingLanguage) =>
      programmingLanguage.fileExtensions.map((fileExtension) =>
        this.fileExtensionToProgrammingLanguageMapping.set(fileExtension, programmingLanguage),
      ),
    );
  }

  public findProgrammingLanguageByFileExtension(
    payload: FindProgrammingLanguageByFileExtensionPayload,
  ): ProgrammingLanguage | null {
    const { fileExtension } = payload;

    const programmingLanguage = this.fileExtensionToProgrammingLanguageMapping.get(fileExtension);

    if (!programmingLanguage) {
      return null;
    }

    return programmingLanguage;
  }

  public findAllProgrammingLanguages(): ProgrammingLanguage[] {
    return this.programmingLanguages;
  }
}
