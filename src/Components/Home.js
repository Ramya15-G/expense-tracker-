import React from "react";
import Expenseform from " ./ExpenseForm";
import Expenselist from "./ExpenseList";
import Chartsection from "./Chartsection";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        💰 Expense Tracker Dashboard
      </h1>

      {/* Layout for Chart, Form, and List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        
        {/* Chart Section */}
        <div className="col-span-1">
          <Chartsection />
        </div>

        {/* Expense Form */}
        <div className="col-span-1">
          <Expenseform />
        </div>
      </div>

      {/* Expense List */}
      <div className="w-full max-w-4xl mt-8">
        <Expenselist />
      </div>
    </div>
  );
}

export default Home;
