import { ProgrammingLanguageName } from './programmingLanguageName.js';

export interface ProgrammingLanguage {
  readonly programmingLanguageName: ProgrammingLanguageName;
  readonly fileExtensions: string[];
}
