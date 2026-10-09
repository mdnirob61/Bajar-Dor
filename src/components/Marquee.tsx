
import Link from "next/link";
import React from "react";
import MarqueeText from "react-marquee-text";

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

const Marquee = async () => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/api/bazardor/products`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: Product[] = await res.json();

    return (
        <div className="w-full overflow-hidden border-b border-gray-300 bg-white">
            <MarqueeText direction="right" duration={15}>
                {data.map((item) => {
                    const isUp = item.change.dir === "up";
                    const isDown = item.change.dir === "down";

                    return (
                        <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            className="inline-block"
                        >
                            <span className="mx-2 inline-flex items-center gap-1.5 whitespace-nowrap py-2 text-xs sm:mx-4 sm:gap-2 sm:text-sm md:mx-6">
                                {/* Product emoji */}
                                <span className="text-sm sm:text-base">
                                    {item.image}
                                </span>

                                {/* Product name */}
                                <span className="font-semibold text-slate-800">
                                    {item.nameBn}
                                </span>

                                {/* Today's price */}
                                <span className="text-slate-700">
                                    {item.today} টাকা/{item.unit}
                                </span>

                                {/* Price change */}
                                <span
                                    className={`font-semibold ${isUp
                                            ? "text-red-500"
                                            : isDown
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                >
                                    {isUp
                                        ? `▲ ${item.change.pct}%`
                                        : isDown
                                            ? `▼ ${item.change.pct}%`
                                            : `— ${item.change.pct}%`}
                                </span>

                                {/* Separator */}
                                <span className="ml-1 text-lg font-bold text-gray-400 sm:ml-2 sm:text-2xl">
                                    •
                                </span>
                            </span>
                        </Link>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
