import React from "react";

function Summary({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-blue-50 p-4 rounded-xl shadow-md w-full max-w-md mt-6 text-center">
      <h3 className="text-lg font-semibold text-blue-700">
        💰 Total Expense: ₹{total.toFixed(2)}
      </h3>
    </div>
  );
}

export default Summary;
