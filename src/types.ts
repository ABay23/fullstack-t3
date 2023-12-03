import { z } from "zod";
export const todoInput = z
  .string({
    required_error: "Todo description is required",
  })
  .min(1)
  .max(100);

export const todoId = z.number().int();
