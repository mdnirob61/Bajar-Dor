import Link from "next/link";
import React from "react";

const CategoryProduct = async ({ params }) => {

    const { categoryId } = await params;

    const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products?category=${categoryId}`);

    const data = await res.json();

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">

            {/* Category Heading */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">
                    🍚 চাল
                </h1>

                <p className="text-slate-500 mt-2">
                    চাল ক্যাটাগরির আজকের বাজারদর
                </p>
            </div>


            {/* Sort Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <p className="text-sm text-slate-500">
                    মোট {data.length}টি পণ্য
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
                        className="border border-slate-300 rounded-lg px-3 py-2 bg-white text-sm outline-none"
                    >
                        <option>ডিফল্ট</option>
                        <option>দাম: কম থেকে বেশি</option>
                        <option>দাম: বেশি থেকে কম</option>
                    </select>
                </div>

            </div>


            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {data.map((item) => {

                    const isUp = item.change.dir === "up";
                    const isDown = item.change.dir === "down";

                    return (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="group">

                            <div className="bg-white border border-slate-200 rounded-2xl p-5 transition duration-200 hover:border-green-600 hover:shadow-md">

                                {/* Emoji */}
                                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-3xl">
                                    {item.image}
                                </div>


                                {/* Product Name */}
                                <h2 className="text-lg font-bold text-slate-800 mt-4">
                                    {item.nameBn}
                                </h2>


                                {/* Unit */}
                                <p className="text-sm text-slate-500 mt-1">
                                    প্রতি {item.unit}
                                </p>


                                {/* Price */}
                                <div className="flex items-end justify-between mt-5">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            আজকের দাম
                                        </p>

                                        <p className="text-xl font-bold text-slate-800 mt-1">
                                            ৳{item.today}
                                        </p>
                                    </div>


                                    {/* Change */}
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${isUp
                                                ? "bg-red-50 text-red-500"
                                                : isDown
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {isUp
                                            ? `▲ ${item.change.pct}%`
                                            : isDown
                                                ? `▼ ${Math.abs(item.change.pct)}%`
                                                : "— ০.০%"}
                                    </span>

                                </div>

                            </div>

                        </Link>
                    );
                })}

            </div>

        </main>
    );
};

export default CategoryProduct;