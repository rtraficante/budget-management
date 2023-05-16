import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type FormattedTransactionWithCategory } from "~/types";

type TotalsByCategory = {
  name: string;
  total: string;
};

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

    const formattedTransactions: FormattedTransactionWithCategory[] =
      transactions.map((val) => {
        return {
          id: val.id,
          date: val.date.toLocaleDateString("en-US", { timeZone: "UTC" }),
          amount: new Prisma.Decimal(val.amount).toNumber().toFixed(2),
          description: val.description,
          category: val.category?.name,
        };
      });

    return formattedTransactions;
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
  delete: privateProcedure
    .input(
      z.object({
        ids: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.transaction.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),
  getTotalByCategory: privateProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      where: {
        name: {
          not: "Credit Bill",
        },
      },
      include: {
        transactions: {
          where: {
            userId: ctx.currentUserId,
          },
        },
      },
    });
    const categoriesWithTransactions = categories.filter(
      (c) => c.transactions.length > 0
    );

    const totals: TotalsByCategory[] = [];
    categoriesWithTransactions.forEach((c) => {
      let total = 0;
      c.transactions.forEach((t) => {
        total += Number(t.amount);
      });
      totals.push({ name: c.name, total: total.toFixed(2) });
    });

    return totals;
  }),
  getSpendingStats: privateProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const transactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: new Date(`${today.getMonth() + 1}/01/${today.getFullYear()}`),
        },
      },
    });

    const lastMonthTransactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: new Date(`${today.getMonth()}/01/${today.getFullYear()}`),
        },
      },
    });

    let lastMonthSpendingTotal = 0;
    let thisMonthSpendingTotal = 0;
    transactions.forEach((t) => {
      thisMonthSpendingTotal += Number(t.amount);
    });
    lastMonthTransactions.forEach((t) => {
      lastMonthSpendingTotal += Number(t.amount);
    });

    return {
      thisMonthSpending: {
        total: thisMonthSpendingTotal,
        percentage: `${Math.ceil(
          (thisMonthSpendingTotal / lastMonthSpendingTotal) * 100
        )}%`,
      },
    };
  }),
});
