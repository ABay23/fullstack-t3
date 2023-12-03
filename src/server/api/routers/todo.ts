import { z } from "zod";

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
      todos.map(({ id, description, done }) => ({
        id,
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
});
