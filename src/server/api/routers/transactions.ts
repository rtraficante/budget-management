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
    });

    return transactions;
  }),
});
