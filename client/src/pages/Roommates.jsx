import Navbar from "../components/Navbar";
import RoomnateCard from "../components/RoomnateCard";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";

function Roommates() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };
  return (
    <div className="overflow-hidden flex flex-wrap justify-center mx-auto w-full">
      <Navbar />
      <div className="mt-20 w-full md:w-10/12">
        <div className=" flex justify-center">
          <button
            className="btn btn-sm md:btn-md mt-2 rounded-lg border-0 bg-red-600 hover:bg-red-700 transition-all text-white shadow-sm md:text-lg shadow-red-900"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <IoIosAddCircle />
            Post Listing
          </button>
        </div>

        {/* Modal for Adding Products */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box w-80 h-[590px] md:w-[500px] md:h-[480px] bg-[#fafafa] dark:bg-[#111]">
            <h3 className="font-bold text-xl w-full text-center font-poppins">
              List your Room
            </h3>
            <form
              // onSubmit={handleSubmit}
              className="flex items-start flex-col gap-3 p-5 mt-5"
            >
              <div
                type="cancel"
                onClick={() => document.getElementById("my_modal_2").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </div>

              {/* Product Name */}
              <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
                <label htmlFor="productName" className="font-poppins text-lg">
                  Name:
                </label>
                <input
                  onChange={handleChange}
                  name="productName"
                  value={formData.productName}
                  type="text"
                  className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none bg-gray-200 dark:bg-[#1f1f1f]"
                />
              </div>

              {/* Location */}
              <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
                <label htmlFor="description" className="font-poppins text-lg">
                  Location:
                </label>
                <input
                  onChange={handleChange}
                  name="description"
                  value={formData.description}
                  type="text"
                  className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none bg-gray-200 dark:bg-[#1f1f1f]"
                />
              </div>

              {/* Price */}
              <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
                <label htmlFor="price" className="font-poppins text-lg">
                  Rent/Person:
                </label>
                <div className="relative md:mx-2">
                  <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300">
                    ₹
                  </span>
                  <input
                    onChange={handleChange}
                    name="price"
                    value={formData.price}
                    type="text"
                    className="pl-6 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none bg-gray-200 dark:bg-[#1f1f1f]"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
                <label htmlFor="category" className="font-poppins text-lg">
                  Looking for:
                </label>
                <select
                  onChange={handleChange}
                  name="category"
                  value={formData.category}
                  className="md:mx-2 p-1 rounded-md outline-none w-[229.6px] md:w-[188.8px] bg-gray-200 dark:bg-[#1f1f1f]"
                >
                  <option value="" disabled hidden>
                    Choose
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Category Selection */}
              <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
                <label htmlFor="category" className="font-poppins text-lg">
                  Smoke/Drink:
                </label>
                <select
                  onChange={handleChange}
                  name="category"
                  value={formData.category}
                  className="md:mx-2 p-1 rounded-md outline-none w-[229.6px] md:w-[188.8px] bg-gray-200 dark:bg-[#1f1f1f]"
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  <option value="Allowed">Allowed</option>
                  <option value="NotAllowed">Not allowed</option>
                </select>
              </div>

              {/* File Input */}
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input mx-auto file-input-xs mt-1 md:mt-2 md:file-input-sm h-8 bg-gray-200 dark:bg-[#1f1f1f]"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="mx-auto md:mt-5 px-3 py-1.5 text-white text-lg font-semibold font-poppins rounded-md bg-green-600 mt-2 shadow-sm shadow-green-700 hover:bg-green-700 transition-all"
              >
                List Room
              </button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className=" flex flex-wrap gap-1 justify-center">
          <RoomnateCard />
          <RoomnateCard />
          <RoomnateCard />
          <RoomnateCard />
        </div>
      </div>
    </div>
  );
}

export default Roommates;
