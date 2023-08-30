/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodTypeAny } from 'zod';

export class Schema {
  public static nonEmptyString(): z.ZodString {
    return z.string().nonempty();
  }

  public static array<T extends ZodTypeAny>(type: T): z.ZodArray<T> {
    return z.array(type);
  }

  public static object<T extends z.ZodRawShape>(schema: T): z.ZodObject<T> {
    return z.object(schema);
  }
}
