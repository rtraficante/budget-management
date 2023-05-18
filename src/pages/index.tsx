import { type NextPage } from "next";
import Head from "next/head";
import BarChart from "~/components/BarChart";
import DashboardTopBars from "~/components/DashboardTopBars";
import DoughnutChart from "~/components/DoughnutChart";
import RecentTransactions from "~/components/RecentTransactions";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: total } = api.transaction.getTotalByCategory.useQuery();
  const { data: spendingStats, isLoading: statsLoading } =
    api.transaction.getSpendingStats.useQuery();
  const { data: recentTransactions, isLoading: transactionsLoading } =
    api.transaction.getRecentTransactions.useQuery();
  const { data: transactionsByMonth } =
    api.transaction.getAmountSpentPerMonth.useQuery();

  const categoryNames = total ? total.map((t) => t.name) : [];
  const totalAmounts = total ? total.map((t) => t.total) : [];

  return (
    <>
      <Head>
        <title>DimeWise - Dashboard</title>
        <meta name="description" content="Manage your finaces with ease" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className="mt-20 flex w-full flex-col gap-4">
        <DashboardTopBars
          averageMontlySpending={spendingStats?.averageMonthlySpending}
          thisMonthSpending={spendingStats?.thisMonthSpending}
          lastSevenSpending={spendingStats?.lastSevenSpending}
          isLoading={statsLoading}
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {totalAmounts.length < 1 ? (
            <div className="relative col-span-2 flex  h-[50vh] w-full flex-col rounded-lg border bg-white p-4  lg:h-[70vh]">
              <h2 className="text-center text-sm font-bold text-gray-600">
                Yearly Expenses Per Category
              </h2>
              <p className="mt-8  w-full rounded-lg bg-gray-50 p-4 text-center">
                There is no recent transaction history.
              </p>
            </div>
          ) : (
            <DoughnutChart
              categoryNames={categoryNames}
              totalAmounts={totalAmounts}
            />
          )}
          {recentTransactions && (
            <RecentTransactions
              transactions={recentTransactions}
              isLoading={transactionsLoading}
            />
          )}
        </div>

        <BarChart amountsPerMonth={transactionsByMonth} />
      </main>
    </>
  );
};

export default Home;
