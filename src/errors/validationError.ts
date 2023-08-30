import { ZodIssue } from 'zod';

import { BaseError } from './baseError';

interface Context {
  readonly target: unknown;
  readonly issues: ZodIssue[];
  readonly message: string;
}

export class ValidationError extends BaseError<Context> {
  public constructor(context: Context) {
    super('ValidationError', 'Validation error.', context);
  }
}
