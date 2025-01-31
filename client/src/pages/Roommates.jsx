import Navbar from "../components/Navbar";
import RoomnateCard from "../components/RoomnateCard";

function Roommates() {
  return (
    <div className="overflow-hidden flex flex-wrap justify-center mx-auto w-full">
      <Navbar />
      <div className="mt-20 w-full md:w-10/12">
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
