import React from "react";

type TopBarData = {
  total: number;
  percentage: string;
};

type Props = {
  averageMontlySpending?: TopBarData | undefined;
  thisMonthSpending?: TopBarData | undefined;
  thisWeekSpending?: TopBarData | undefined;
};

const DashboardTopBars = ({
  averageMontlySpending,
  thisMonthSpending,
  thisWeekSpending,
}: Props) => {
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-6">
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2">
        <div className="flex w-full flex-col pb-4 ">
          <p className="text-2xl font-bold ">
            {averageMontlySpending
              ? averageMontlySpending.total.toFixed(2)
              : "$0"}
          </p>
          <p className="text-gray-600">Average Monthly Spending</p>
        </div>
        <p className="flex items-center justify-center rounded-lg bg-green-200 p-2">
          <span className="text-lg text-green-700">
            {averageMontlySpending ? averageMontlySpending.percentage : "18%"}
          </span>
        </p>
      </div>

      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2">
        <div className="flex w-full flex-col pb-4 ">
          <p className="text-2xl font-bold ">
            ${thisMonthSpending ? thisMonthSpending.total.toFixed(2) : "0"}
          </p>
          <p className="text-gray-600">This Month&apos;s Spending</p>
        </div>
        <p className="flex items-center justify-center rounded-lg bg-green-200 p-2">
          <span className="text-lg text-green-700">
            {thisMonthSpending ? thisMonthSpending.percentage : "18%"}
          </span>
        </p>
      </div>
      <div className="col-span-1 flex w-full justify-between rounded-lg border bg-white p-4 lg:col-span-2">
        <div className="flex w-full flex-col pb-4 ">
          <p className="text-2xl font-bold ">
            {thisWeekSpending ? thisWeekSpending.total : "$1,000"}
          </p>
          <p className="text-gray-600">This Week&apos;s Spending</p>
        </div>
        <p className="flex items-center justify-center rounded-lg bg-green-200 p-2">
          <span className="text-lg text-green-700">
            {thisWeekSpending ? thisWeekSpending.percentage : "18%"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DashboardTopBars;
