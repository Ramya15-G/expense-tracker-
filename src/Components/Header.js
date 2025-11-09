
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, List, PieChart, BarChart3, Brain, Wallet, Sun, Moon } from "lucide-react";

export default function Header({ theme, setTheme }) {
  const location = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${location.pathname === path
      ? "bg-white/25 text-yellow-300 shadow-md scale-105"
      : "text-white hover:bg-white/10 hover:scale-105"
    }`;

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">

        <h1 className="text-lg font-semibold tracking-wide text-white">
          💸 Smart Family Expense Tracker
        </h1>


        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className={linkClasses("/")}>
              <Home size={18} /> Home
            </Link>

            <Link to="/budget" className={linkClasses("/budget")}>
              <Wallet size={18} /> Budget
            </Link>

            <Link to="/add-expense" className={linkClasses("/add-expense")}>
              <PlusCircle size={18} /> Add
            </Link>

            <Link to="/expenses" className={linkClasses("/expenses")}>
              <List size={18} /> List
            </Link>

            <Link to="/charts" className={linkClasses("/charts")}>
              <PieChart size={18} /> Charts
            </Link>

            <Link to="/summary" className={linkClasses("/summary")}>
              <BarChart3 size={18} /> Summary
            </Link>

            <Link to="/insights" className={linkClasses("/insights")}>
              <Brain size={18} /> Insights
            </Link>
          </nav>


          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="ml-2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
