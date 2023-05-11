import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

const isPassedDue = (dueDate: string, today: string) => {
  const dueDateTime = new Date(dueDate).getTime();
  const todayTime = new Date(today).getTime();

  if (dueDateTime < todayTime) {
    return true;
  }

  return false;
};

export const creditCardRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const creditCards = await ctx.prisma.creditCard.findMany({
      where: {
        userId: ctx.currentUserId,
      },
    });

    for (const card of creditCards) {
      const dueDate = card.dueDate.toLocaleDateString();
      const today = new Date().toLocaleDateString();

      if (isPassedDue(dueDate, today)) {
        switch (card.status) {
          case "UNPAID":
            await ctx.prisma.creditCard.update({
              where: {
                id: card.id,
              },
              data: {
                status: "LATE",
              },
            });
          case "PAID":
            await ctx.prisma.creditCard.update({
              where: {
                id: card.id,
              },
              data: {
                status: "UNPAID",
              },
            });
        }
      }
    }

    return creditCards;
  }),
  pay: privateProcedure
    .input(
      z.object({
        id: z.number(),
        amount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.currentUserId;
      const creditCard = await ctx.prisma.creditCard.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!creditCard) {
        return;
      }

      await ctx.prisma.creditCard.update({
        where: {
          id: input.id,
        },
        data: {
          status: "PAID",
        },
      });

      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId,
          date: new Date(),
          amount: input.amount,
          description: `${creditCard.provider} - ${creditCard.nickname}`,
          categoryId: 2,
        },
      });
      return transaction;
    }),
});
