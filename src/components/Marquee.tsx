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
    // "use cache";

    const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products`);
    const data: Product[] = await res.json();

    return (
        <div className="border-b border-gray-300 bg-white overflow-hidden">
            <MarqueeText direction="right" duration={15}>
                {data.map((item) => {
                    const isUp = item.change.dir === "up";
                    const isDown = item.change.dir === "down";

                    return (
                        <span
                            key={item.id}
                            className="inline-flex items-center gap-2 mx-6 whitespace-nowrap text-sm">
                            {/* Emoji */}
                            <span>{item.image}</span>

                            {/* Product name */}
                            <span className="font-semibold">
                                {item.nameBn}
                            </span>

                            {/* Today's price */}
                            <span>
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
                            <span className="text-gray-400 font-bold text-3xl">•</span>
                        </span>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default Marquee;