import { z } from "zod";
import { todoInput, todoId } from "~/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.db.todo.findMany({
      where: { userId: ctx.session.user.id },
    });
    console.log(
      "This is the Map with Todos",
      todos.map(({ id, title, description, done }) => ({
        id,
        title,
        description,
        done,
      })),
    );
    return [
      {
        id: 1,
        description: "test",
        done: false,
      },
      {
        id: 2,
        description: "test",
        done: false,
      },
    ];
  }),
  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.todo.create({
        data: {
          title: input,
          description: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  delete: protectedProcedure.input(todoId).mutation(async ({ ctx, input }) => {
    const id = input;
    return await ctx.db.todo.delete({
      where: {
        id: id,
      },
    });
  }),
  toggle: protectedProcedure
    .input(z.object({ id: z.number(), done: z.boolean() }))
    .mutation(async ({ ctx, input: { id, done } }) => {
      return await ctx.db.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});
