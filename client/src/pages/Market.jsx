import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductSkeleton from "../components/ProductSkeleton";

function Market() {
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [productsToShow, setProductsToShow] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);
  const getAllProducts = async () => {
    const url = import.meta.env.VITE_BASE_URL;
    try {
      setLoading(true);
      const response = await axios.get(`${url}/getItems`);
      setProduct(response.data.products || []);
      setProductsToShow(response.data.products || []);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const url = import.meta.env.VITE_BASE_URL;
    if (!formData.productName || !formData.price || !formData.category) {
      toast.error("Required fields missing");
      return;
    }

    let toastID = toast.loading("Adding Item");

    try {
      const response = await axios.post(`${url}/addItem`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.dismiss(toastID);
      toast.success(response.data.message);
      setProduct((prevProducts) => [response.data.product, ...prevProducts]);
      setFormData({
        productName: "",
        description: "",
        price: "",
        image: null,
        category: "",
      });
    } catch (err) {
      console.error(err);

      toast.dismiss(toastID);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
    document.getElementById("my_modal_2").close();
  };
  const handleFilter = () => {
    if (category === "All") {
      setProductsToShow(product);
    } else {
      const filteredProduct = product.filter((p) => p.category === category);
      setProductsToShow(filteredProduct);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (category === "All") {
      setProductsToShow(product);
    } else {
      const filteredProduct = product.filter((p) => p.category === category);
      setProductsToShow(filteredProduct);
    }
  }, [category, product]);

  return (
    <div className="overflow-hidden flex flex-wrap justify-center mx-auto w-full">
      <Navbar />

      {/* Category Selection and Sell Button */}
      <div className="w-10/12 mt-2 items-end flex justify-between">
        <div className="flex flex-col md:flex-row gap-y-1">
          <label
            htmlFor="category"
            className="font-poppins font-semibold md:text-lg"
          >
            Category:
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="filterCategory"
            id="category"
            value={category}
            className="md:mx-2 p-1 rounded-md outline-none w-[229.6px] md:w-[188.8px] bg-gray-200 dark:bg-[#1f1f1f]"
          >
            <option value="All">All</option>
            <option value="Book">Book</option>
            <option value="Accessories">Accessories</option>
            <option value="Stationery">Stationery</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <button
          className="btn btn-sm md:btn-md mt-20 rounded-lg border-0 bg-red-600 hover:bg-red-700 transition-all text-white shadow-sm md:text-lg shadow-red-900"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <IoIosAddCircle />
          Sell
        </button>
      </div>

      {/* Modal for Adding Products */}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-80 h-[550px] md:w-[500px] md:h-[450px] bg-[#fafafa] dark:bg-[#111]">
          <h3 className="font-bold text-xl w-full text-center font-poppins">
            List your product
          </h3>
          <form
            onSubmit={handleSubmit}
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
                Product Name:
              </label>
              <input
                onChange={handleChange}
                name="productName"
                value={formData.productName}
                type="text"
                className="md:mx-2 p-1 w-[229.6px] md:w-[188.8px] rounded-md outline-none bg-gray-200 dark:bg-[#1f1f1f]"
              />
            </div>

            {/* Description */}
            <div className="w-10/12 flex flex-col md:flex-row md:justify-between">
              <label htmlFor="description" className="font-poppins text-lg">
                Description:
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
                Price:
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
                Category:
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
                <option value="Book">Book</option>
                <option value="Accessories">Accessories</option>
                <option value="Stationery">Stationery</option>
                <option value="Others">Others</option>
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
              Add Product
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Products List */}
      <div className="flex md:gap-3 flex-wrap justify-center mx-auto w-full">
        {loading ? (
          [...Array(8)].map((index) => <ProductSkeleton key={index} />)
        ) : productsToShow.length > 0 ? (
          productsToShow.map((p) => (
            <Products
              setProduct={setProduct}
              setProductsToShow={setProductsToShow}
              key={p._id}
              product={p}
            />
          ))
        ) : (
          <div className="w-full h-[80vh] flex justify-center items-center text-xl">
            No Products Found!
          </div>
        )}
      </div>
    </div>
  );
}

export default Market;
