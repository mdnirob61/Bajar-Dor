import React from "react";

const Loading = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f2f7f3]">
            <div className="text-center">
                <p className="text-4xl text-green-700 font-bold">
                    পণ্যের ক্যাটাগরি লোড হচ্ছে.....
                </p>

                <p className="text-2xl text-gray-400 mt-3">
                    অনুগ্রহ করে একটু অপেক্ষা করুন
                </p>
            </div>
        </div>
    );
};

export default Loading;