import { createProtectedRouter } from "./protected-router";

export const userRouter = createProtectedRouter()
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
