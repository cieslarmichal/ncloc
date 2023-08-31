import { BaseError } from './baseError';

interface Context {
  readonly path: string;
}

export class InputPathNotExistsError extends BaseError<Context> {
  public constructor(context: Context) {
    super('InputPathNotExistsError', 'Input path does not exist.', context);
  }
}
