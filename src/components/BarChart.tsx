import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

type Props = {
  amountsPerMonth?: string[];
  isLoading?: boolean;
};

const BarChart = ({ amountsPerMonth }: Props) => {
  return (
    <div className="relative col-span-2 flex h-[50vh] w-full rounded-lg border bg-white p-4 lg:h-[70vh]">
      <Bar
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Money Spent",
              data: amountsPerMonth,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(53, 162, 235, 0.4)",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Monthly Spending",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
