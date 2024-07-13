import "./TransLineChart.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TransLineChart = ({ customer }) => {
  const getCustomerTransactions = (customer) => {
    const transactions = customer.transactions.reduce((acc, transaction) => {
      const date = transaction.date;

      if (!acc[date]) {
        acc[date] = { date, amount: 0 };
      }

      acc[date].amount += transaction.amount;
      return acc;
    }, {});

    return Object.values(transactions);
  };

  return (
    <div className="line-chart">
      <LineChart
        width={700}
        height={400}
        data={getCustomerTransactions(customer)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="amount" />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#088F8F"
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </div>
  );
};

export default TransLineChart;
