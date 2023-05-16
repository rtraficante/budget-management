import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  
  getAllNames: privateProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany();

    return categories
      .filter((c) => c.name !== "Credit Bill")
      .map((c) => {
        return c.name;
      });
  }),
});
