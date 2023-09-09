import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface FindProgrammingLanguageByFileExtensionPayload {
  readonly fileExtension: string;
}

export interface ProgrammingLanguageService {
  findProgrammingLanguageByFileExtension(
    payload: FindProgrammingLanguageByFileExtensionPayload,
  ): ProgrammingLanguage | null;
  findAllProgrammingLanguages(): ProgrammingLanguage[];
}
