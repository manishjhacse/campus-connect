import Navbar from "../components/Navbar";


// src/pages/NotFound.jsx
const NotFound = () => {
    return (
        <div className=" flex-col items-center">
            <Navbar />
            <div className="w-full flex flex-col items-center h-screen justify-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-lg text-gray-600 mt-4">Page Not Found</p>
                <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Go Back to Home
                </a>
            </div>
        </div>
    );
};

export default NotFound;
