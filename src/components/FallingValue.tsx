import Link from "next/link";
import React from "react";

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return String(value).replace(
        /\d/g,
        (digit) => banglaDigits[Number(digit)]
    );
};

const FallingValue = async () => {
    // "use cache";

    const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);

    const data: Product[] = await res.json();

    const fallingProducts = data
        .filter((item) => item.change.dir === "down")
        .sort((a, b) => a.change.pct - b.change.pct)
        .slice(0, 6);

    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 mb-10">

            {/* Section title */}
            <h2 className="text-2xl sm:text-xl font-extrabold mb-4">
                <span className="text-green-500">▼</span>{" "}
                আজ দাম কমেছে
            </h2>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

                {fallingProducts.map((item) => (
                    <Link
                        key={item.id}
                        href={`/product/${item.id}`}
                        className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
                    >

                        {/* Product information */}
                        <div className="flex items-center gap-3">

                            {/* Emoji */}
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-2xl">
                                {item.image}
                            </div>

                            {/* Name + unit */}
                            <div>
                                <h3 className="font-semibold text-sm sm:text-base">
                                    {item.nameBn}
                                </h3>

                                <p className="text-xs text-slate-500">
                                    প্রতি{" "}
                                    {item.unit === "kg"
                                        ? "কেজি"
                                        : item.unit === "liter"
                                            ? "লিটার"
                                            : item.unit === "dozen"
                                                ? "ডজন"
                                                : "পিস"}
                                </p>
                            </div>

                        </div>

                        {/* Price row */}
                        <div className="flex justify-between items-end mt-4">

                            <div>
                                <p className="text-xs text-slate-500">
                                    আজকের দাম
                                </p>

                                <p className="font-bold text-base pt-1">
                                    {toBanglaNumber(item.today)} টাকা
                                </p>
                            </div>

                            {/* Change badge */}
                            <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                                ▼ {toBanglaNumber(Math.abs(item.change.pct))}%
                            </span>

                        </div>

                    </Link>
                ))}

            </div>
        </section>
    );
};

export default FallingValue;