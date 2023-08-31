import { ProgrammingLanguage } from "../../programmingLanguage";

export interface MapFromFileExtensionPayload {
  fileExtension: string;
}

export interface ProgrammingLanguageMapper {
  mapFromFileExtension(payload: MapFromFileExtensionPayload): ProgrammingLanguage
}
