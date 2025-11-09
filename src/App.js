
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ExpenseForm from "./Components/Expenseform";
import ExpenseList from "./Components/ExpenseList";
import ExpenseChart from "./Components/ExpenseChart";
import Summary from "./Components/Summary";
import Insights from "./Components/Insights";
import BudgetPlanner from "./Components/BudgetPlanner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });


  const [theme, setTheme] = useState(() => {

    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });


  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => setExpenses((prev) => [newExpense, ...prev]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header theme={theme} setTheme={setTheme} />
        <main className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-expense" element={<ExpenseForm onAddExpense={addExpense} />} />
            <Route path="/expenses" element={<ExpenseList expenses={expenses} />} />
            <Route path="/charts" element={<ExpenseChart expenses={expenses} />} />
            <Route path="/summary" element={<Summary expenses={expenses} />} />
            <Route path="/insights" element={<Insights expenses={expenses} />} />
            <Route path="/budget" element={<BudgetPlanner expenses={expenses} />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}
