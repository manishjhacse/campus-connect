import { Code } from "@nextui-org/react";
import { useState } from "react";

function Products() {
  const [isExpanded, setIsExpanded] = useState(false);
  const text =
    "If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose? If a dog chews shoes whose shoes does he choose?";
  const shortText = text.slice(0, 40);
  return (
    <div className="mt-10 ">
      <div className="card max-w-80 mx-3 shadow-xl  bg-[#fafafa] dark:bg-[#111] font-poppins">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title ">Shoes!</h2>
          <div className="flex gap-x-1 flex-wrap">
            <p>
              {isExpanded ? text : shortText}
              {text.length > 40 && !isExpanded && "..."}
            </p>
            {text.length > 40 && (
              <button
                className="text-xs text-green-500"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "See less" : "See more"}
              </button>
            )}
          </div>

          <Code color="success" className="w-fit">
            <span className=" font-bold">Price: &#8377;{3999}</span>
          </Code>
          <div className="card-actions justify-end">
            <button className="btn bg-blue-800 hover:bg-blue-900 border-0 w-full rounded-xl shadow-sm text-white font-poppins text-lg shadow-blue-800">
              Contact to seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
