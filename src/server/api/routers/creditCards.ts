import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { isPassedDue } from "~/utils/isPassedDue";

export const creditCardRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const creditCards = await ctx.prisma.creditCard.findMany({
      where: {
        userId: ctx.currentUserId,
      },
    });

    for (const [idx, card] of creditCards.entries()) {
      const dueDate = card.dueDate.toLocaleDateString();
      const today = new Date().toLocaleDateString();

      if (isPassedDue(dueDate, today)) {
        switch (card.status) {
          case "UNPAID":
            const lateUpdatedCard = await ctx.prisma.creditCard.update({
              where: {
                id: card.id,
              },
              data: {
                status: "LATE",
              },
            });
            creditCards[idx] = lateUpdatedCard;
            break;

          case "PAID":
            const unpaidUpdatedCard = await ctx.prisma.creditCard.update({
              where: {
                id: card.id,
              },
              data: {
                status: "UNPAID",
              },
            });
            creditCards[idx] = unpaidUpdatedCard;
            break;
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

      const today = new Date();
      const previousDue = new Date(creditCard.dueDate);

      let month = today.getMonth() + 2;

      const day = previousDue.getDate();
      let year = today.getFullYear();
      if (month > 12) {
        month = 1;
        year = year + 1;
      }

      await ctx.prisma.creditCard.update({
        where: {
          id: input.id,
        },
        data: {
          status: creditCard.status === "LATE" ? "UNPAID" : "PAID",
          dueDate: new Date(`${month}/${day}/${year}`),
        },
      });

      const transaction = await ctx.prisma.transaction.create({
        data: {
          userId,
          date: new Date(),
          amount: input.amount,
          description: `${creditCard.provider} - ${creditCard.nickname}`,
          categoryId: 1,
        },
      });
      return transaction;
    }),
  add: privateProcedure
    .input(
      z.object({
        provider: z.string(),
        nickname: z.string(),
        dueDate: z.number().min(1).max(31),
      })
    )
    .mutation(({ ctx, input }) => {
      const month = new Date().getMonth() + 1;
      const day = input.dueDate;
      const year = new Date().getFullYear();

      return ctx.prisma.creditCard.create({
        data: {
          provider: input.provider,
          nickname: input.nickname,
          dueDate: new Date(`${month}/${day}/${year}`),
          userId: ctx.currentUserId,
        },
      });
    }),
});
