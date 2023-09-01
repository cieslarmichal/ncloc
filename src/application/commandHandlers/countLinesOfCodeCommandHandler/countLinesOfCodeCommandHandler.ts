import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface ProgrammingLanguageFilesInfo {
  numberOfFiles: number;
  numberOfLines: number;
}

export interface CreateAddressCommandHandlerPayload {
  inputPath: string;
  excludePaths?: string[];
}

export interface CreateAddressCommandHandlerResult {
  programmingLanguageToFilesInfo: Map<ProgrammingLanguage, ProgrammingLanguageFilesInfo>;
}

export interface CountLinesOfCodeCommandHandler {
  execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult>;
}
