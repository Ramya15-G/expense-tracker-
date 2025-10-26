

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Tailwind CSS is working!
      </h1>
      <div className="flex space-x-4">
        <div className="w-24 h-24 bg-red-500 rounded-lg shadow-md flex items-center justify-center text-white">
          Box 1
        </div>
        <div className="w-24 h-24 bg-green-500 rounded-lg shadow-md flex items-center justify-center text-white">
          Box 2
        </div>
        <div className="w-24 h-24 bg-yellow-500 rounded-lg shadow-md flex items-center justify-center text-white">
          Box 3
        </div>
      </div>
    </div>
  );
}

export default App;
