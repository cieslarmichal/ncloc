import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface FindSupportedProgrammingLanguagesQueryHandlerResult {
  readonly programmingLanguages: ProgrammingLanguage[];
}

export interface FindSupportedProgrammingLanguagesQueryHandler {
  execute(): FindSupportedProgrammingLanguagesQueryHandlerResult;
}
