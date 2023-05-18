import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { type FormattedTransactionWithCategory } from "~/types";
import { getPercentage } from "~/utils/helpers";

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
    const today = new Date();
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
            date: {
              gte: new Date(`01/01/${today.getFullYear()}`),
            },
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

    // This Month Stats
    const thisMonthTransactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: new Date(`${today.getMonth() + 1}/01/${today.getFullYear()}`),
        },
      },
    });

    let lastMonth = today.getMonth();
    if (lastMonth === 0) lastMonth = 12;

    const lastMonthTransactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: new Date(`${lastMonth}/01/${today.getFullYear()}`),
          lt: new Date(`${today.getMonth() + 1}/01/${today.getFullYear()}`),
        },
      },
    });

    let lastMonthSpendingTotal = 0;
    let thisMonthSpendingTotal = 0;
    thisMonthTransactions.forEach((t) => {
      thisMonthSpendingTotal += Number(t.amount);
    });
    lastMonthTransactions.forEach((t) => {
      lastMonthSpendingTotal += Number(t.amount);
    });

    // Last Seven Stats
    const lastSevenDate = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const lastSevenTransactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: lastSevenDate,
        },
      },
    });

    const previousSevenDate = new Date(
      lastSevenDate.getTime() - 6 * 24 * 60 * 60 * 1000
    );

    const previousSevenTransactions = await ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
        date: {
          gte: previousSevenDate,
          lte: lastSevenDate,
        },
      },
    });

    let lastSevenSpendingTotal = 0;
    let previousSevenSpendingTotal = 0;
    lastSevenTransactions.forEach((t) => {
      lastSevenSpendingTotal += Number(t.amount);
    });
    previousSevenTransactions.forEach((t) => {
      previousSevenSpendingTotal += Number(t.amount);
    });

    // Average Monthly Stats
    const result = await ctx.prisma.$queryRaw<
      { month: string; average: string }[]
    >(
      Prisma.sql`SELECT DATE_TRUNC('month', date) as month, SUM(amount::numeric) as average FROM "public"."Transaction" AS transaction WHERE "transaction"."userId" = ${ctx.currentUserId} GROUP BY month`
    );

    const averageMonthlySpending =
      result.reduce((total, { average }) => total + parseFloat(average), 0) /
      result.length;

    console.log(
      Math.ceil(
        ((thisMonthSpendingTotal - lastMonthSpendingTotal) /
          ((thisMonthSpendingTotal + lastMonthSpendingTotal) / 2)) *
          100
      )
    );

    const thisMonthPercentage = getPercentage(
      thisMonthSpendingTotal,
      lastMonthSpendingTotal
    );
    const lastSevenPercentage = getPercentage(
      lastSevenSpendingTotal,
      previousSevenSpendingTotal
    );

    return {
      averageMonthlySpending: isNaN(averageMonthlySpending)
        ? 0
        : averageMonthlySpending,
      thisMonthSpending: {
        total: thisMonthSpendingTotal,
        percentage: {
          num: `${isNaN(thisMonthPercentage) ? 0 : thisMonthPercentage}%`,
          greaterThanPrevious: thisMonthSpendingTotal > lastMonthSpendingTotal,
        },
      },
      lastSevenSpending: {
        total: lastSevenSpendingTotal,
        percentage: {
          num: `${isNaN(lastSevenPercentage) ? 0 : lastSevenPercentage}%`,
          greaterThanPrevious:
            lastSevenSpendingTotal > previousSevenSpendingTotal,
        },
      },
    };
  }),
  getRecentTransactions: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.transaction.findMany({
      where: {
        userId: ctx.currentUserId,
      },
      orderBy: [{ date: "desc" }],
      take: 10,
      include: {
        category: true,
      },
    });
  }),
  getAmountSpentPerMonth: privateProcedure.query(async ({ ctx }) => {
    const currentYear = new Date().getFullYear();
    const result = await ctx.prisma.$queryRaw<{ month: string; sum: string }[]>`
    SELECT
      TO_CHAR(months.month, 'YYYY-MM') as month,
      COALESCE(SUM(transaction.amount::numeric), '0') as sum
    FROM
      (
        SELECT
          DATE_TRUNC('month', (date_trunc('year', NOW()) + interval '1 month' * generate_series(0, 11))) as month
      ) months
      LEFT JOIN "public"."Transaction" AS transaction ON DATE_TRUNC('month', transaction.date) = months.month
    WHERE
      DATE_PART('year', months.month) = ${currentYear}
      AND "transaction"."userId" = ${ctx.currentUserId}
    GROUP BY
      months.month
    ORDER BY
      months.month
  `;

    return result.map((s) => s.sum);
  }),
});
