import { z } from "zod";
import { createRouter } from "./context";
import { createProtectedRouter } from "./protected-router";

const privateUserRouter = createProtectedRouter()
  .query("session", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .query("me", {
    async resolve({ ctx }) {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      return user;
    },
  });

const publicUserRouter = createRouter().query("search", {
  input: z.object({
    email: z.string(),
  }),
  async resolve({ ctx, input }) {
    const users = await ctx.prisma.user.findMany({
      where: {
        email: {
          contains: input.email,
        },
      },
    });

    return users;
  },
});

export const userRouter = createRouter()
  .merge(publicUserRouter)
  .merge(privateUserRouter);
