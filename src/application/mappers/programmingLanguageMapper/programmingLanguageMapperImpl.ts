import { ProgrammingLanguageNotFound } from "../../errors/programmingLanguageNotFound";
import { ProgrammingLanguage } from "../../programmingLanguage";
import { ProgrammingLanguageMapper, MapFromFileExtensionPayload } from "./programmingLanguageMapper";

export class ProgrammingLanguageMapperImpl implements ProgrammingLanguageMapper {
  readonly fileExtensionToProgrammingLanguageMapping = new Map<string, ProgrammingLanguage>([
    [".h", ProgrammingLanguage.cpp],
    [".hpp", ProgrammingLanguage.cpp],
    [".cpp", ProgrammingLanguage.cpp],
    [".go", ProgrammingLanguage.go],
    [".java", ProgrammingLanguage.java],
    [".py", ProgrammingLanguage.python],
    [".cs", ProgrammingLanguage.csharp],
    [".js", ProgrammingLanguage.javascript],
    [".ts", ProgrammingLanguage.typescript],
  ]);

  public mapFromFileExtension(payload: MapFromFileExtensionPayload): ProgrammingLanguage {
    const {fileExtension} = payload;

    const programmingLanguage = this.fileExtensionToProgrammingLanguageMapping.get(fileExtension);

    if (!programmingLanguage) {
      throw new ProgrammingLanguageNotFound({fileExtension});
    }

    return programmingLanguage;
  }
}
