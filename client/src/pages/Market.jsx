import { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { IoIosAddCircle } from "react-icons/io";

function Market() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "₹",
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-hidden flex flex-wrap justify-center mx-auto w-full">
      <Navbar />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className=" w-10/12 mt-2 items-end flex justify-between">
        <div className=" flex flex-col md:flex-row gap-y-1 ">
          <label htmlFor="" className="font-poppins font-semibold md:text-lg">
            Category:
          </label>
          <select
            name=""
            id=""
            className="md:mx-2 p-1 rounded-md outline-none  w-[130px]   bg-gray-200 dark:bg-[#1f1f1f] "
          >
            <option selected value="all">
              All
            </option>
            <option value="Book">Book</option>
            <option value="Accessories">Accessories</option>
            <option value="Stationary">Stationery</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button
          className="btn btn-sm md:btn-md mt-20 rounded-lg border-0 bg-red-600 hover:bg-red-700 transition-all  text-white shadow-sm md:text-lg shadow-red-900"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <IoIosAddCircle />
          Sell
        </button>
      </div>

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box w-80 h-[550px]  md:w-[500px] md:h-[450px] bg-[#fafafa] dark:bg-[#111]">
          <h3 className="font-bold text-xl w-full text-center font-poppins">
            List your product
          </h3>
          <form className=" flex items-start flex-col gap-3 p-5 mt-5">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="w-10/12  flex flex-col md:flex-row md:justify-between">
              <label htmlFor="" className="font-poppins text-lg">
                Product Name:
              </label>
              <input
                onChange={handleChange}
                name="productName"
                value={formData.productName}
                type="text"
                className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none  bg-gray-200 dark:bg-[#1f1f1f] "
              />
            </div>
            <div className="w-10/12  flex flex-col md:flex-row md:justify-between">
              <label htmlFor="" className="font-poppins text-lg">
                Description:
              </label>
              <input
                onChange={handleChange}
                name="description"
                value={formData.description}
                type="text"
                className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none  bg-gray-200 dark:bg-[#1f1f1f] "
              />
            </div>
            <div className="w-10/12  flex flex-col md:flex-row md:justify-between">
              <label htmlFor="" className="font-poppins text-lg">
                Price:
              </label>
              <input
                onChange={handleChange}
                name="price"
                value={formData.price}
                type="text"
                className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none   bg-gray-200 dark:bg-[#1f1f1f] "
              />
            </div>
            <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
              <label htmlFor="" className="font-poppins text-lg">
                Category:
              </label>
              <select
                onChange={handleChange}
                name=""
                id=""
                className="md:mx-2 p-1 rounded-md outline-none  w-[229.6px] md:w-[188.8px]  bg-gray-200 dark:bg-[#1f1f1f] "
              >
                <option disabled selected value="">
                  Select an option
                </option>
                <option value="Book">Book</option>
                <option value="Accessories">Accessories</option>
                <option value="Stationary">Stationery</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <input
              type="file"
              className="file-input mx-auto  file-input-xs mt-1 md:mt-2 md:file-input-sm h-8   bg-gray-200  dark:bg-[#1f1f1f] "
            />
            <button className=" mx-auto  md:mt-5 px-3 py-1.5 text-white text-lg font-semibold font-poppins rounded-md bg-green-600 mt-2 shadow-sm shadow-green-700 hover:bg-green-700 transition-all ">
              Add Product
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="flex md:gap-3 flex-wrap justify-center mx-auto w-full">
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
        <Products />
      </div>
    </div>
  );
}

export default Market;
