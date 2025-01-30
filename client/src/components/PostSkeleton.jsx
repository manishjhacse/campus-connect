const PostSkeleton = () => {
    return (
      <div className="w-[95%] sm:w-[450px] px-2 h-fit mt-3 rounded-lg bg-[#fafafa] dark:bg-[#111] animate-pulse">
        <div className="flex">
          <div className="mt-3 mr-2 w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="mt-4 h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
  
        <div className="ml-4 mt-2 h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="ml-4 mt-2 h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
  
        <div className="flex justify-center mt-3">
          <div className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  };
  
  export default PostSkeleton;
  