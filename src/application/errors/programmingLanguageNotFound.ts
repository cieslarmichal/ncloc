import { BaseError } from './baseError.js';

interface Context {
  readonly fileExtension: string;
}

export class ProgrammingLanguageNotFound extends BaseError<Context> {
  public constructor(context: Context) {
    super('ProgrammingLanguageNotFound', 'Programming language not found.', context);
  }
}
