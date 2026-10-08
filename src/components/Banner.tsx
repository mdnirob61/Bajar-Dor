import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="max-w-6xl mx-auto bg-white mt-6 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8 px-5 sm:px-8 lg:pb-20 py-10 sm:py-8">

            <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Content */}
                <div className="w-full md:max-w-2xl text-center md:text-left">

                    {/* Eyebrow / Small Text */}
                    <span className="inline-block bg-green-100 py-2 sm:py-3 px-3 sm:px-4 rounded-3xl text-xs sm:text-[0.93rem] text-green-600 font-semibold">
                        {date}
                    </span>

                    {/* Main Heading */}
                    <h1 className="font-extrabold text-2xl sm:text-4xl lg:text-4xl mt-2 sm:mt-5 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-700 pt-6 sm:pt-8 lg:pt-10 font-semibold mb-6 sm:mb-8 text-sm sm:text-base lg:text-[1rem] leading-relaxed">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                        বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
                        দামের পরিবর্তন এক জায়গায়।
                    </p>

                    {/* CTA */}
                    <Link
                        href="#সব-পণ্য"
                        className="inline-block bg-green-700 hover:bg-green-800 py-2.5 sm:py-3 px-4 sm:px-5 text-white rounded-xl text-sm sm:text-[1rem] transition"
                    >
                        সব পণ্য দেখুন ↓
                    </Link>

                </div>

                {/* Hero Image */}
                <div className="w-full md:w-auto flex justify-center">
                    <Image
                        src="/assets/bazar-hero.png"
                        alt="Bazar price illustration"
                        width={320}
                        height={320}
                        className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto"
                    />
                </div>

            </div>
        </div>
    );
};

export default Banner;