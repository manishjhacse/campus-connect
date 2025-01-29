import Navbar from "../components/Navbar";
import Products from "../components/Products";

function Market() {
  return (
    <div className="overflow-hidden flex flex-wrap justify-center mx-auto w-full">
      <Navbar />
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn mt-20 rounded-full bg-green-800 hover:bg-black text-white shadow-sm text-lg shadow-green-900"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Become a seller
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
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
