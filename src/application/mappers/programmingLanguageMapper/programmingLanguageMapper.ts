import { ProgrammingLanguage } from '../../programmingLanguage.js';

export interface MapFromFileExtensionPayload {
  fileExtension: string;
}

export interface ProgrammingLanguageMapper {
  mapFromFileExtension(payload: MapFromFileExtensionPayload): ProgrammingLanguage;
}
