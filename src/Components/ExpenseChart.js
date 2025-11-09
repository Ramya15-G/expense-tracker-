import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExpenseChart = ({ expenses }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B084CC"];

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Expense Breakdown</h2>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="amount"
          data={expenses}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ExpenseChart;
