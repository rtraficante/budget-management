import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

type Props = {
  categoryNames: string[];
  totalAmounts: string[];
};

const DoughnutChart = ({ categoryNames, totalAmounts }: Props) => {
  return (
    <div className="relative col-span-2 flex h-[50vh] w-full rounded-lg border bg-white p-4 lg:h-[70vh]">
      <Doughnut
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "",
            },
          },
        }}
        data={{
          labels: categoryNames,
          datasets: [
            {
              label: "Money Spent",
              data: totalAmounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
