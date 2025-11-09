
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PlusCircle, Mic, MicOff } from "lucide-react";


function ProgressRing({ spent, budget }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const percentage = Math.min((spent / budget) * 100, 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="url(#grad)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-xl font-semibold fill-gray-700"
        >
          {Math.round(percentage)}%
        </text>
      </svg>

      <p className="text-sm text-gray-500 mt-2">
        ₹{spent} / ₹{budget} spent
      </p>
    </div>
  );
}

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Other");
  const [note, setNote] = useState("");
  const [budget, setBudget] = useState(() => {
    return localStorage.getItem("budget") || 10000;
  });
  const [spent, setSpent] = useState(() => {
    return parseFloat(localStorage.getItem("spent")) || 0;
  });
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("spent", spent);
  }, [spent]);


  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("🎤 Voice Input:", transcript);

      const matchAmount = transcript.match(/(\d+(\.\d+)?)/);
      if (matchAmount) setAmount(matchAmount[0]);

      const cleanTitle = transcript
        .replace(/(\d+(\.\d+)?)(\s?(rupees|rs|₹))?/g, "")
        .trim();

      if (cleanTitle) setTitle(cleanTitle);

      toast.info("🎙️ Voice captured: " + transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      toast.error("Please enter title and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      date: date || new Date().toISOString().slice(0, 10),
      category,
      note,
    };

    onAddExpense(newExpense);
    setSpent((prev) => prev + parseFloat(amount));

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("Other");
    setNote("");

    if (parseFloat(amount) > budget) {
      toast.warning("⚠️ This expense exceeds your current budget!");
    } else {
      toast.success("Expense added ✓");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-gray-100 max-w-lg mx-auto"
    >
      <form onSubmit={submit}>
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4 flex justify-center items-center gap-2">
          <PlusCircle className="text-indigo-500" /> Add New Expense
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense Title"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none"
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (₹)"
          type="number"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none"
        />

        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none"
        >
          <option value="Food">🍔 Food</option>
          <option value="Travel">✈️ Travel</option>
          <option value="Bills">💡 Bills</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Education">🎓 Education</option>
          <option value="Health">🏥 Health</option>
          <option value="Entertainment">🎬 Entertainment</option>
          <option value="Other">🪙 Other</option>
        </select>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)..."
          className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none resize-none"
          rows="2"
        ></textarea>

        <div className="flex items-center justify-between gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={listening ? stopListening : startListening}
            className={`flex items-center justify-center gap-2 w-1/2 py-2 rounded-lg text-white font-medium transition-all ${listening ? "bg-red-600" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
            {listening ? "Stop" : "Voice Input"}
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-1/2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-transform"
          >
            Add Expense
          </motion.button>
        </div>
      </form>

      
    </motion.div>
  );
}
