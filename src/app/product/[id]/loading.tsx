import React from "react";

const Loading = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f2f7f3] px-4">
            <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl text-green-700 font-bold leading-snug">
                    পণ্যের তথ্য লোড হচ্ছে.....
                </p>

                <p className="text-base sm:text-xl md:text-2xl text-gray-400 mt-2 sm:mt-3">
                    অনুগ্রহ করে একটু অপেক্ষা করুন
                </p>
            </div>
        </div>
    );
};

export default Loading;