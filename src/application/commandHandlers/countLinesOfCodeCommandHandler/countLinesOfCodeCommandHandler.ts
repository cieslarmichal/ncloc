import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface CreateAddressCommandHandlerPayload {
  inputPath: string;
  excludePaths: string[];
}

export interface CreateAddressCommandHandlerResult {
  programmingLanguagesToNumberOfLines: Map<ProgrammingLanguage, number>;
}

export interface CountLinesOfCodeCommandHandler {
  execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult>;
}
