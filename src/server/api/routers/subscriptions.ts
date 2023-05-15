import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { isPassedDue } from "~/utils/isPassedDue";
import { Prisma } from "@prisma/client";
import { type FormattedSubscription } from "~/types";

export const subscriptionRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const subs = await ctx.prisma.subscription.findMany({
      where: {
        userId: ctx.currentUserId,
      },
    });
    for (const [idx, sub] of subs.entries()) {
      // TODO: Add functionality for weekly and yearly subscriptions
      const today = new Date().toLocaleDateString();
      const chargeDate = sub.chargeDate.toLocaleDateString();

      if (isPassedDue(chargeDate, today)) {
        await ctx.prisma.transaction.create({
          data: {
            date: new Date(today),
            amount: sub.recurringCharge,
            description: `${sub.company} - Subscription`,
            categoryId: 2,
            userId: ctx.currentUserId,
          },
        });

        const todayDate = new Date();
        let newMonth = todayDate.getMonth() + 2;
        let newYear = todayDate.getFullYear();

        if (newMonth > 12) {
          newMonth = 1;
          newYear = newYear + 1;
        }

        const newChargeDate = new Date(
          `${newMonth}/${sub.chargeDate.getDate()}/${newYear}`
        );

        const updatedSub = await ctx.prisma.subscription.update({
          where: {
            id: sub.id,
          },
          data: {
            chargeDate: newChargeDate,
          },
        });
        subs[idx] = updatedSub;
      }
    }
    const formattedSubscriptions: FormattedSubscription[] = subs.map((sub) => ({
      id: sub.id,
      company: sub.company,
      plan: sub.plan,
      recurringCharge: new Prisma.Decimal(sub.recurringCharge)
        .toNumber()
        .toFixed(2),
      chargeDate: sub.chargeDate.toLocaleDateString(),
    }));

    return formattedSubscriptions;
  }),

  add: privateProcedure
    .input(
      z.object({
        company: z.string(),
        plan: z.enum(["MONTHLY", "WEEKLY", "YEARLY"]),
        chargeDate: z.number().min(1).max(31),
        recurringCharge: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const month = new Date().getMonth() + 1;
      const day = input.chargeDate;
      const year = new Date().getFullYear();

      return ctx.prisma.subscription.create({
        data: {
          company: input.company,
          plan: input.plan,
          chargeDate: new Date(`${month}/${day}/${year}`),
          recurringCharge: input.recurringCharge,
          userId: ctx.currentUserId,
        },
      });
    }),
  delete: privateProcedure
    .input(
      z.object({
        ids: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.subscription.deleteMany({
        where: {
          id: { in: input.ids },
        },
      });
    }),
});
