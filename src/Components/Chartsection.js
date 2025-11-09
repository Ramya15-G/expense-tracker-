// src/Components/Chartsection.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA", "#F472B6"];

export default function Chartsection({ expenses = [] }) {
  // group by title first  (simple demo grouping)
  const map = {};
  expenses.forEach((e) => {
    const key = e.title || "Other";
    map[key] = (map[key] || 0) + (Number(e.amount) || 0);
  });

  const data = Object.keys(map).map((k) => ({ name: k, value: map[k] }));

  if (!data.length) return <p className="text-center text-gray-500">No data to show</p>;

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
