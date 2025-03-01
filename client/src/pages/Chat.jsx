import Navbar from "../components/Navbar";
import { IoSend } from "react-icons/io5";

function Chat() {
  return (
    <div className="w-full h-full ">
      <Navbar />
      <div className=" flex justify-center items-center">
        <span className="relative inline-flex sm:inline mt-24">
          <span className="bg-gradient-to-r from-[#ffef44] via-[#ff4a44] to-[#5658ee] blur-xl  filter opacity-40 w-full h-full absolute inset-0"></span>
          <span className="relative text-xl md:text-3xl  tracking-tighter text-center font-poppins">
            {" "}
            Chat💬{" "}
          </span>
        </span>
      </div>
      <section className="h-full ">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Siddhesh
            <time className="text-xs opacity-50 ml-1">12:45</time>
          </div>
          <div className="chat-bubble">Muh me lega?</div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Manish Kr Jha
            <time className="text-xs opacity-50 ml-1">12:46</time>
          </div>
          <div className="chat-bubble">Haan do</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      </section>
      {/* send message---->>> */}
      <div className=" flex justify-center items-center fixed bottom-0 w-full p-2">
        <input
          type="text"
          placeholder="Type here"
          className="input mx-1 input-bordered rounded-full w-full max-w-xs dark:bg-slate-800 bg-white shadow-md text-black dark:text-white active:outline-none focus:outline-none"
        />
        <button className=" bg-blue-600 shadow-md shadow-blue-800 w-10 h-10 md:w-11 md:h-11 rounded-full p-3 relative text-xl md:text-2xl text-center text-white mx-1">
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
