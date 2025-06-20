import { Stack, StacksSchema, TriggerRunResponse, TriggerRunResponseSchema } from '../types';

export const validateStacks = (stacks: unknown): Stack[] => {
  const result = StacksSchema.safeParse(stacks);
  if (!result.success) {
    throw new Error(`Invalid stack: ${result.error.message}`);
  }
  return result.data;
};

export const validateTriggerRunResult = (result: unknown): TriggerRunResponse => {
  const validationResult = TriggerRunResponseSchema.safeParse(result);
  if (!validationResult.success) {
    throw new Error(`Invalid run trigger result: ${validationResult.error.message}`);
  }
  return validationResult.data;
};
