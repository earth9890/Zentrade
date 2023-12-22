import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Dashboard = () => {
  // State for card data
  const [cardData, setCardData] = useState({
    totalRevenue: 0,
    totalJobsAvg: 0,
    ticketsCreated: 0,
    ticketsScheduled: 0,
    outstandingAmount: 0,
    membershipSold: 0,
    jobsCompleted: 0,
    totalCanceled: 0,
  });

  // State for chart data
  const data = [
    { name: "Material Scale", users: 2000000000 },
    { name: "Maintenance", users: 1500000000 },
    { name: "HWT Replacement", users: 1000000000 },
    { name: "Bid Work Plumbing", users: 500000000 },
  ];

  // Fetch data or perform calculations for card data
  useEffect(() => {
    // Example: Fetch data from an API or perform calculations
    // Update cardData state accordingly
    const fetchData = async () => {
      // Simulated API call or data calculation
      // Replace this with your actual data fetching logic
      // For demonstration, we're using setTimeout
      const simulatedAPICall = () =>
        new Promise((resolve) => setTimeout(resolve, 1000));

      await simulatedAPICall();

      setCardData({
        totalRevenue: 100000,
        totalJobsAvg: 620,
        ticketsCreated: 120,
        ticketsScheduled: 80,
        outstandingAmount: 110448.48,
        membershipSold: 30,
        jobsCompleted: 90,
        totalCanceled: 10,
      });

      // Update chart data
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: [cardData.ticketsCreated, cardData.ticketsScheduled],
          },
        ],
      });
    };

    fetchData();
  }, []); // Run this effect only once on component mount

  return (
    <div>
      {/* Cards */}
      <div>
        <div className="m-4">
          <h1 className="text-xl font-bold text-blue-1000">Company Metrics</h1>
          <div />
          <div className="grid grid-cols-4 gap-4 mb-8 text-green-500">
            <DashboardCard
              title="Total Revenue"
              value={`$${cardData.totalRevenue}`}
            />
            <DashboardCard
              title="Total Jobs Avg"
              value={`$${cardData.totalJobsAvg}`}
            />
            <DashboardCard
              title="Tickets Created"
              value={cardData.ticketsCreated}
            />
            <DashboardCard
              title="Tickets Scheduled"
              value={cardData.ticketsScheduled}
            />
            <DashboardCard
              title="Outstanding Amount"
              value={`$${cardData.outstandingAmount.toFixed(2)}`}
            />
            <DashboardCard
              title="Membership Sold"
              value={cardData.membershipSold}
            />
            <DashboardCard
              title="Jobs Completed"
              value={cardData.jobsCompleted}
            />
            <DashboardCard
              title="Total Canceled"
              value={cardData.totalCanceled}
            />
          </div>
          {/* Chart */}
          {/* <div>
            <h2 className="text-xl font-bold mb-4">Revenue by Job</h2>
            <Bar data={chartData} />
          </div> */}
          <div>
            <div className=" grid grid-cols-2">
              <div>
                <h1 className="text-xl font-bold text-blue-1000">
                  Revenue By Job Location{" "}
                </h1>
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="users"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-1000 mb-4">
                  Revenue By Job Type{" "}
                </h1>
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 80,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="users"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for individual cards
const DashboardCard = ({ title, value }) => (
  <div className="p-4 bg-white rounded shadow-md mt-4 hover:bg-red-200">
    <p className="text-2xl">{value}</p>
    <h3 className="text-lg font-bold mb-2 mt-5 text-gray-600">{title}</h3>
  </div>
);

export default Dashboard;
