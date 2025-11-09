// src/Components/ExpenseList.js
import React from "react";

export default function ExpenseList({ expenses = [] }) {
  if (!expenses.length) return <p className="text-center text-gray-500">No expenses yet — add one!</p>;

  return (
    <ul className="space-y-3">
      {expenses.map((ex) => (
        <li key={ex.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 shadow-sm">
          <div>
            <div className="font-medium text-gray-700">{ex.title}</div>
            <div className="text-xs text-gray-400">{ex.date}</div>
          </div>
          <div className="text-blue-600 font-semibold">₹{Number(ex.amount).toFixed(2)}</div>
        </li>
      ))}
    </ul>
  );
}
