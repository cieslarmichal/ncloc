import { ProgrammingLanguage } from "./application/programmingLanguage";
import { ProgrammingLanguageMapper, MapFromFileExtensionPayload } from "./programmingLanguageMapper";

export class ProgrammingLanguageMapperImpl implements ProgrammingLanguageMapper {
  public mapFromFileExtension(payload: MapFromFileExtensionPayload): ProgrammingLanguage {
    const {fileExtension} = payload;


  }
}
