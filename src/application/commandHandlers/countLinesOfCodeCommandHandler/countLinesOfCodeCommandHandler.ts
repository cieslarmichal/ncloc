import { ProgrammingLanguageName } from '../../programmingLanguageName.js';

export interface ProgrammingLanguageFilesInfo {
  readonly numberOfFiles: number;
  readonly numberOfLines: number;
}

export interface CreateAddressCommandHandlerPayload {
  readonly inputPath: string;
  readonly excludePaths?: string[];
}

export interface CreateAddressCommandHandlerResult {
  readonly programmingLanguageNamesToFilesInfo: Map<ProgrammingLanguageName, ProgrammingLanguageFilesInfo>;
}

export interface CountLinesOfCodeCommandHandler {
  execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult>;
}
