const ProfileSkeleton = () => {
    return (
      <div className="w-fit flex flex-col items-center gap-4 animate-pulse">
        <div className="w-fit flex flex-col items-center">
          <div className="relative">
            <div className="rounded-full h-32 w-32 bg-gray-300 dark:bg-gray-700"></div>
          </div>
          <div className="mx-1 px-2 py-1 font-bold text-xl font-poppins text-center rounded-lg w-40 h-6 bg-gray-300 dark:bg-gray-700"></div>
        </div>
  
        <div className="flex md:flex-row flex-col md:justify-center items-start md:items-center md:w-full gap-1">
          <div className="flex-col">
            <div className="flex items-center w-fit">
              <span className="font-semibold w-14">Bio: </span>
              <div className="mx-1 px-2 py-1 rounded-lg w-40 h-10 bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="flex items-center w-fit">
              <span className="font-semibold w-16">Reg. No: </span>
              <div className="mx-1 px-2 py-1 rounded-lg w-40 h-6 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
  
          <div className="flex-col w-full items-start">
            <div className="flex items-center w-fit flex-row">
              <span className="font-semibold w-14">Email: </span>
              <div className="mx-1 px-2 py-1 rounded-lg w-56 h-6 bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="flex items-center w-fit flex-row">
              <span className="font-semibold w-14">Mobile: </span>
              <div className="mx-1 px-2 py-1 rounded-lg w-40 h-6 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;
  