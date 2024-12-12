import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import "./App.css";
import Imagecontent from "./components/Imagecontent";

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
      <div className="min-h-screen transition-all duration-200 ease-linear min-w-screen  flex justify-center items-center  relative dark:bg-black bg-white dark:text-white">
        <button
          className="absolute top-5 right-5 p-2 bg-gray-200 rounded-md shadow-md"
          onClick={handleMode}
        >
          {mode == "dark" ? <MdOutlineWbSunny /> : <FaMoon />}
        </button>

        <Imagecontent />
      </div>
    </>
  );
}

export default App;
