import React from 'react'

export default function RoomCardSkelton() {
    return (
        <div className="card card-side shadow-xl m-4 w-[310px] md:w-[550px] h-[200px] md:h-[220px] p-0 bg-[#fafafa] dark:bg-[#111] animate-pulse">
            <div className="h-[200px] md:h-full w-[150px] md:w-[200px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
            <div className="card-body px-2 md:px-4">
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                </div>
                <div className="card-actions mt-3 justify-end">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
