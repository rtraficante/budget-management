import { Prisma, type Transaction, type Category } from "@prisma/client";
import { Button, Spinner } from "flowbite-react";
import React from "react";

type Props = {
  transactions?: (Transaction & { category: Category | null })[];
  isLoading: boolean;
};

const RecentTransactions = ({ transactions, isLoading }: Props) => {
  return (
    <div className="relative col-span-2 flex h-[50vh] w-full flex-col items-center overflow-scroll rounded-lg border bg-white p-4 lg:col-span-1 lg:h-[70vh]">
      <h1>Recent Transactions</h1>
      {isLoading ? (
        <div className="my-auto">
          <span className="pr-3">Loading...</span>
          <Spinner />
        </div>
      ) : (
        <>
          <ul className="w-full">
            {transactions?.map((t) => (
              <li
                key={t.id}
                className="my-3 flex items-center rounded-lg bg-gray-50 p-2 hover:bg-gray-100"
              >
                <div className="pl-4">
                  <p className="fond-bold text-gray-800">
                    ${new Prisma.Decimal(t.amount).toNumber().toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    {t.category?.name || "No Category"}
                  </p>
                </div>
                <p className="absolute right-6 text-sm md:hidden lg:flex">
                  {t.date.toLocaleDateString("en-US", { timeZone: "UTC" })}
                </p>
              </li>
            ))}
          </ul>
          <Button className="mt-2" href="/transactions">
            See More Details
          </Button>
        </>
      )}
    </div>
  );
};

export default RecentTransactions;
