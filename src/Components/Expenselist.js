
import React from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";

export default function ExpenseList({ expenses = [] }) {
  if (!expenses.length)
    return (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-500"
      >
        No expenses yet — add one!
      </motion.p>
    );


  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("💸 Expense Report", 14, 16);

    const tableColumn = ["Title", "Date", "Amount (₹)"];
    const tableRows = [];

    expenses.forEach((ex) => {
      const expenseData = [ex.title, ex.date, ex.amount];
      tableRows.push(expenseData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 22,
      styles: { halign: "center" },
      headStyles: { fillColor: [52, 152, 219] },
    });

    doc.save("Expense_Report.pdf");
  };


  const csvHeaders = [
    { label: "Title", key: "title" },
    { label: "Date", key: "date" },
    { label: "Amount (₹)", key: "amount" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/30 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-5"
    >

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          💰 Expense List
        </h2>

        <div className="flex gap-3">
          <CSVLink
            data={expenses}
            headers={csvHeaders}
            filename="Expense_Report.csv"
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm shadow hover:bg-blue-700 hover:scale-[1.05] transition"
          >
            📥 Export CSV
          </CSVLink>

          <button
            onClick={exportPDF}
            className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm shadow hover:bg-green-700 hover:scale-[1.05] transition"
          >
            🧾 Export PDF
          </button>
        </div>
      </div>


      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        {expenses.map((ex, index) => (
          <motion.li
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center bg-white/40 backdrop-blur-md border border-white/30 rounded-xl p-3 shadow-sm transition hover:scale-[1.02] hover:shadow-md"
          >
            <div>
              <div className="font-medium text-gray-800">{ex.title}</div>
              <div className="text-xs text-gray-500">{ex.date}</div>
            </div>
            <div className="text-blue-700 font-semibold">
              ₹{Number(ex.amount).toFixed(2)}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
