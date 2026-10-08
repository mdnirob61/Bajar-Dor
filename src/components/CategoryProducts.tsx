"use client";

import Link from "next/link";
import { useState } from "react";

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

interface CategoryProductsProps {
    products: Product[];
}

const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return String(value).replace(
        /\d/g,
        (digit) => banglaDigits[Number(digit)]
    );
};

const CategoryProducts = ({
    products,
}: CategoryProductsProps) => {

    const [sortBy, setSortBy] = useState<
        "ডিফল্ট" | "দাম: কম থেকে বেশি" | "দাম: বেশি থেকে কম"
    >("ডিফল্ট");

    const sortProducts = (products: Product[]) => {

        const sortedProducts = [...products];

        if (sortBy === "ডিফল্ট") {
            return sortedProducts;
        }

        else if (sortBy === "দাম: কম থেকে বেশি") {
            sortedProducts.sort((a, b) => a.today - b.today);
        }

        else if (sortBy === "দাম: বেশি থেকে কম") {
            sortedProducts.sort((a, b) => b.today - a.today);
        }

        return sortedProducts;
    };

    const sortedProducts = sortProducts(products);

    return (
        <>
            {/* Sort Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <p className="text-slate-700">
                    মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="flex items-center gap-2">

                    <label
                        htmlFor="sort"
                        className="text-sm font-medium text-slate-700"
                    >
                        সাজান:
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value as
                                | "ডিফল্ট"
                                | "দাম: কম থেকে বেশি"
                                | "দাম: বেশি থেকে কম"
                            )
                        }
                        className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm outline-none"
                    >
                        <option value="ডিফল্ট">
                            ডিফল্ট
                        </option>

                        <option value="দাম: কম থেকে বেশি">
                            দাম: কম থেকে বেশি
                        </option>

                        <option value="দাম: বেশি থেকে কম">
                            দাম: বেশি থেকে কম
                        </option>
                    </select>

                </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {sortedProducts.map((item) => {

                    const isUp = item.change.dir === "up";
                    const isDown = item.change.dir === "down";

                    return (
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
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${isUp
                                            ? "text-red-500 bg-red-50"
                                            : isDown
                                                ? "text-green-500 bg-green-50"
                                                : "text-gray-500 bg-gray-100"
                                        }`}
                                >
                                    {isUp
                                        ? `▲ ${toBanglaNumber(item.change.pct)}%`
                                        : isDown
                                            ? `▼ ${toBanglaNumber(
                                                item.change.pct
                                            )}%`
                                            : `— ${toBanglaNumber(
                                                item.change.pct
                                            )}%`}
                                </span>

                            </div>

                        </Link>
                    );
                })}

            </div>
        </>
    );
};

export default CategoryProducts;