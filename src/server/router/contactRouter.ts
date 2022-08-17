import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const contactRouter = createProtectedRouter().mutation("create", {
  input: z.object({
    nickname: z.string(),
    email: z.string().email(),
  }),
  async resolve({ ctx, input }) {
    const user = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return ctx.prisma.contact.create({
      data: {
        nickname: input.nickname,
        user: { connect: { id: user.id } },
      },
    });
  },
});
