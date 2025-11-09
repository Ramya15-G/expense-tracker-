import React, { useState } from "react";
import Header from "./Components/Header";
import ExpenseForm from "./Components/Expenseform";
import ExpenseList from "./Components/ExpenseList";
import ChartSection from "./Components/Chartsection";

function App() {
  // All expenses stored here
  const [expenses, setExpenses] = useState([]);

  // Function to add a new expense
  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Expense Form */}
        <ExpenseForm onAddExpense={handleAddExpense} />

        {/* Expense List */}
        <ExpenseList expenses={expenses} />

        {/* Chart Section */}
        <ChartSection expenses={expenses} />
      </div>
    </div>
  );
}

export default App;

