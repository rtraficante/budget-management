import { Spinner } from "flowbite-react";
import React from "react";

type Percentage = {
  num: string;
  greaterThanPrevious: boolean;
};

type TopBarData = {
  total: number;
  percentage: Percentage;
};

type Props = {
  averageMontlySpending?: number | undefined;
  thisMonthSpending?: TopBarData | undefined;
  lastSevenSpending?: TopBarData | undefined;
  isLoading: boolean;
};

const DashboardTopBars = ({
  averageMontlySpending,
  thisMonthSpending,
  lastSevenSpending,
  isLoading,
}: Props) => {
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-6">
      <div className="col-span-1 flex w-full justify-center rounded-lg border bg-white p-4 lg:col-span-2">
        {isLoading ? (
          <div className="my-auto flex">
            <p className=" mr-2">Loading...</p>
            <Spinner />
          </div>
        ) : (
          <div className="flex w-full flex-col pb-4 ">
            <p className="text-2xl font-bold ">
              ${averageMontlySpending ? averageMontlySpending.toFixed(2) : "0"}
            </p>
            <p className="text-gray-600">Average Monthly Spending</p>
          </div>
        )}
      </div>

      <div className="col-span-1 flex w-full justify-center rounded-lg border bg-white p-4 lg:col-span-2">
        {isLoading ? (
          <div className="my-auto flex">
            <p className=" mr-2">Loading...</p>
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col pb-4 ">
              <p className="text-2xl font-bold ">
                ${thisMonthSpending ? thisMonthSpending.total.toFixed(2) : "0"}
              </p>
              <p className="text-gray-600">This Month&apos;s Spending</p>
            </div>
            <p
              className={` flex items-center justify-center rounded-lg p-2 ${
                thisMonthSpending?.percentage.greaterThanPrevious
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              <span className="text-lg ">
                {thisMonthSpending?.percentage.greaterThanPrevious ? "+" : null}
                {thisMonthSpending ? thisMonthSpending.percentage.num : null}
              </span>
            </p>
          </>
        )}
      </div>
      <div className="col-span-1 flex w-full justify-center rounded-lg border bg-white p-4 lg:col-span-2">
        {isLoading ? (
          <div className="my-auto flex">
            <p className=" mr-2">Loading...</p>
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col pb-4 ">
              <p className="text-2xl font-bold ">
                ${lastSevenSpending ? lastSevenSpending.total.toFixed(2) : "0"}
              </p>
              <p className="text-gray-600">This Week&apos;s Spending</p>
            </div>
            <p
              className={` flex items-center justify-center rounded-lg p-2 ${
                lastSevenSpending?.percentage.greaterThanPrevious
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }`}
            >
              <span className="text-lg text-green-700">
                {lastSevenSpending?.percentage.greaterThanPrevious ? "+" : null}
                {lastSevenSpending ? lastSevenSpending.percentage.num : null}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardTopBars;
