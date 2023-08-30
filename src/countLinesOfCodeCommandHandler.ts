import { ExcludePathNotExistsError } from './errors/excludePathNotExistsError';
import { InputPathNotExistsError } from './errors/inputPathNotExistsError';
import { FileSystemService } from './fileSystem/fileSystemService';
import { Schema } from './validator/schema';
import { SchemaType } from './validator/schemaType';
import { Validator } from './validator/validator';

export const executePayloadSchema = Schema.object({
  inputPath: Schema.nonEmptyString(),
  excludePaths: Schema.array(Schema.nonEmptyString()),
});

export type CreateAddressCommandHandlerPayload = SchemaType<typeof executePayloadSchema>;

export class CountLinesOfCodeCommandHandler {
  public constructor(private readonly fileSystemService: FileSystemService) {}

  public async execute(payload: CreateAddressCommandHandlerPayload): Promise<void> {
    const { inputPath, excludePaths } = Validator.validate(executePayloadSchema, payload);

    if (!this.fileSystemService.checkIfPathExists({ path: inputPath })) {
      throw new InputPathNotExistsError({ path: inputPath });
    }

    excludePaths.map((excludePath) => {
      if (!this.fileSystemService.checkIfPathExists({ path: excludePath })) {
        throw new ExcludePathNotExistsError({ path: excludePath });
      }
    });

    let files: string[];

    if (this.fileSystemService.checkIfPathIsDirectory({ path: inputPath })) {
      files = await this.fileSystemService.getAllFilesFromDirectory({ directoryPath: inputPath });
    } else {
      files = [inputPath];
    }
  }
}
