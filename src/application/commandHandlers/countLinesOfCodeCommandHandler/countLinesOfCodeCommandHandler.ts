import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface ProgrammingLanguageFilesInfo {
  readonly numberOfFiles: number;
  readonly numberOfLines: number;
}

export interface CreateAddressCommandHandlerPayload {
  readonly inputPath: string;
  readonly excludePaths?: string[];
}

export interface CreateAddressCommandHandlerResult {
  readonly programmingLanguageToFilesInfo: Map<ProgrammingLanguage, ProgrammingLanguageFilesInfo>;
}

export interface CountLinesOfCodeCommandHandler {
  execute(payload: CreateAddressCommandHandlerPayload): Promise<CreateAddressCommandHandlerResult>;
}
