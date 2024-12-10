import { useEffect, useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import './App.css';

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'dark');

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const handleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  return (
    <>
      <div
        className="min-h-screen transition-all duration-200 ease-linear min-w-screen border flex justify-center items-center border-black relative dark:bg-black dark:text-white"
      >
        <h1 className="text-5xl font-bold bg-red-500 dark:bg-red-800  px-6 py-6 rounded-md">Campus Connect</h1>
        <button
          className="absolute top-5 right-5 p-2 bg-gray-200 rounded-md shadow-md"
          onClick={handleMode}
        >
          {mode == "dark" ? <MdOutlineWbSunny /> : <FaMoon />}

        </button>
      </div>
    </>
  );
}

export default App;
