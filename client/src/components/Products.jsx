import { Code } from "@nextui-org/react";

function Products() {
  return (
    <div className="mt-10 ">
      <div className="card w-80 mx-3 shadow-xl  bg-[#fafafa] dark:bg-[#111] font-poppins">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose? </p>
          <Code color="success" className="w-fit">
            <span className=" font-bold">Price: &#8377;{3999}</span>
          </Code>
          <div className="card-actions justify-end">
            <button className="btn btn-primary w-full rounded-xl shadow-sm text-lg shadow-blue-700">
              Contact to seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
