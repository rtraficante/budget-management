import { createTRPCRouter } from "~/server/api/trpc";
import { transactionRouter } from "~/server/api/routers/transactions";
import { creditCardRouter } from "./routers/creditCards";
import { subscriptionRouter } from "./routers/subscriptions";
import { categoryRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  transaction: transactionRouter,
  creditCard: creditCardRouter,
  subscription: subscriptionRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
