import { ProgrammingLanguageService } from '../../services/programmingLanguageService/programmingLanguageService.js';
import {
  FindSupportedProgrammingLanguagesQueryHandler,
  FindSupportedProgrammingLanguagesQueryHandlerResult,
} from './findSupportedProgrammingLanguagesQueryHandler.js';

export class FindSupportedProgrammingLanguagesQueryHandlerImpl
  implements FindSupportedProgrammingLanguagesQueryHandler
{
  public constructor(private readonly programmingLanguageService: ProgrammingLanguageService) {}

  public execute(): FindSupportedProgrammingLanguagesQueryHandlerResult {
    const programmingLanguages = this.programmingLanguageService.findAllProgrammingLanguages();

    return { programmingLanguages };
  }
}
