const ProductSkeleton = () => {
    return (
        <div className="mt-10">
            <div className="card max-w-80 mx-3 shadow-xl bg-[#fafafa] dark:bg-[#111] font-poppins animate-pulse">
                <figure className="h-40 w-full bg-gray-300 dark:bg-gray-700 rounded"></figure>

                <div className="card-body">
                    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>

                    <div className="flex gap-x-1 flex-wrap">
                        <div className="h-4 w-56 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>

                    <div className="h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>

                    <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mt-4"></div>
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
