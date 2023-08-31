import { BaseError } from './baseError';

interface Context {
  readonly path: string;
}

export class ExcludePathNotExistsError extends BaseError<Context> {
  public constructor(context: Context) {
    super('ExcludePathNotExistsError', 'Exclude path does not exist.', context);
  }
}
