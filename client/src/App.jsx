import { useEffect, useState } from "react";
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

  return (
    <>
      <div className="min-h-screen  transition-all text-black duration-200 ease-linear  flex justify-center  relative dark:bg-black bg-white dark:text-white">
        <Layout />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
}

export default App;
