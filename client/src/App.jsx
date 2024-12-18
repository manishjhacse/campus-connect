import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Layout";

function App() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "dark"
  );

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const handleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <>
      <div className="min-h-screen transition-all text-black duration-200 ease-linear min-w-screen  flex justify-center items-center  relative dark:bg-black bg-white dark:text-white">
        <button
          className="absolute top-5 right-5 p-2 bg-gray-200 rounded-md shadow-md"
          onClick={handleMode}
        >
          {mode == "dark" ? <MdOutlineWbSunny /> : <FaMoon />}
        </button>


        <Layout/>
        

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
