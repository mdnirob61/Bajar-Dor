import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">

                <p className="text-7xl sm:text-8xl font-bold text-green-700">
                    404
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-4">
                    পণ্যের ক্যাটাগরি পাওয়া যায়নি
                </h1>

                <p className="text-slate-500 mt-3 leading-relaxed">
                    এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি অথবা
                    ক্যাটাগরিটি সঠিক নয়।
                </p>

                <Link
                    href="/"
                    className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-3 rounded-xl transition"
                >
                    হোম পেজে ফিরে যান
                </Link>

            </div>
        </main>
    );
};

export default NotFound;