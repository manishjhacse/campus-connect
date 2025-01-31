import { Code } from "@nextui-org/react";
import { useState } from "react";
import { IoChatbox } from "react-icons/io5";
// import { format } from 'fecha';
function Products({ product }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const text = product.description
  const shortText = text.slice(0, 40);
  return (
    <div className="mt-10 ">
      <div className="card md:w-80  max-w-80 mx-3 shadow-xl  bg-[#fafafa] dark:bg-[#111] font-poppins">
        <figure>
          <img className="h-40 w-full object-cover"
            src={product.image}
            alt="Shoes"
          />
        </figure>
        <div className="card-body py-2 w-full px-4">
          <h2 className="card-title ">{product.productName}</h2>
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
            <span className=" font-bold">Price: {product.price}</span>
          </Code>
          <div className="card-actions justify-end">
            <p className="text-xs ">Created At: {new Date(product.createdAt).toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              day: "2-digit",
              month: "2-digit",
            }).replace(",", "")}</p>
            <button className="btn text-2xl px-3 py-2 h-fit min-h-fit text-blue-800 hover:text-blue-900 border-0 rounded-xl shadow-sm font-poppins">
              <IoChatbox />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
