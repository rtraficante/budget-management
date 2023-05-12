import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
      },
      include: {
        category: true,
      },
      orderBy: [{ date: "desc" }],
    });

    return transactions;
  }),
  add: privateProcedure
    .input(
      z.object({
        date: z.date(),
        amount: z.number(),
        category: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUserId;
      const category = await ctx.prisma.category.findFirst({
        where: {
          name: input.category,
        },
      });

      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId,
          date: input.date,
          amount: input.amount,
          description: input.description,
          categoryId: category?.id,
        },
      });
      return transaction;
    }),
});
