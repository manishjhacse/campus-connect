import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";

function RoomnateCard() {
  return (
    <div>
      <div className="card card-side transition-all duration-200 shadow-xl m-4 w-[310px] h-[200px] p-0 md:w-[550px] md:h-[220px]  bg-[#fafafa] dark:bg-[#111]">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"  
          alt="roomImage"
          className="h-[200px] md:h-full w-[150px] md:w-[200px] object-cover rounded-md"
        />
        <div className="card-body px-2 md:px-4">
          <h2 className="card-title  text-sm md:text-lg">Spider man</h2>
          <p className="text-xs md:text-sm mt-0 ">New york, usa, america.</p>
          <div className=" flex text-xs flex-wrap md:text-sm gap-1 justify-between">
            <p className="flex md:flex-col-reverse flex-row">
              <span className=" font-semibold">₹5000</span>
              <span className=" opacity-50 ml-1 md:ml-0">Rent/Person</span>
            </p>
            <p>
              <span className=" opacity-50">Looking for</span> <br />{" "}
              <span className=" font-semibold">Male</span>{" "}
            </p>
            <p>
              <span className=" opacity-50">Smoke/Drink </span>
              <br /> <span className=" font-semibold">Not allowed</span>
            </p>
          </div>
          <div className="card-actions mt-3 justify-end">
            <button className="btn mx-2 btn-sm md:btn-md bg-[#fafafa] dark:bg-[#111] rounded-full hover:bg-green-500  dark:hover:bg-green-500 transition-all dark:text-white  text-black">
              <IoCall className="text-[16px]" />
            </button>
            <button className="btn mx-2 border bg-[#fafafa] dark:bg-[#111] btn-sm md:btn-md rounded-full hover:bg-blue-500 dark:hover:bg-blue-500 transition-all dark:text-white  text-black">
              <IoChatbubbleEllipsesSharp className="text-[16px]" />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomnateCard;
