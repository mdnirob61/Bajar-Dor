import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

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
    markets: Market[];
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return String(value).replace(
        /\d/g,
        (digit) => banglaDigits[Number(digit)]
    );
};

const formatPrice = (value: number) => {
    const formatted = Number.isInteger(value)
        ? String(value)
        : value.toFixed(1);

    return toBanglaNumber(formatted);
};

const getUnitText = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "liter") return "প্রতি লিটার";
    if (unit === "dozen") return "প্রতি ডজন";

    return "প্রতি পিস";
};

const getProduct = async (id: string): Promise<Product | null> => {
    // "use cache";

    const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/products/${id}`);

    if (!res.ok) {
        return null;
    }
    return res.json();
};

const ProductDetails = async ({ params }: PageProps) => {
    const { id } = await params;

    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const unitText = getUnitText(product.unit);
    const isUp = product.change.dir === "up";
    const isDown = product.change.dir === "down";

    const minimumPrice = Math.min(
        ...product.markets?.map((market) => market.min)
    );
    const maximumPrice = Math.max(
        ...product.markets?.map((market) => market.max)
    );

    const averagePrice = (maximumPrice + minimumPrice) / 2;

    return (
        <div className="bg-slate-100">
            <main className="max-w-6xl container mx-auto px-4 py-6 sm:py-8">

                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-5">

                    <Link
                        href="/"
                        className="hover:text-green-700 transition">
                        হোম
                    </Link>

                    <span>›</span>

                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-green-700 transition">
                        {product.categoryNameBn}
                    </Link>

                    <span>›</span>

                    <span className="text-slate-700">
                        {product.nameBn}
                    </span>
                </div>

                <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-3">

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div className="flex items-start gap-4">

                            {/* Product icon */}
                            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-xl flex items-center justify-center text-3xl sm:text-4xl">
                                {product.image}
                            </div>

                            {/* Product text */}
                            <div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                                    {product.nameBn}
                                </h1>

                                <p className="text-sm text-slate-500 mt-1">
                                    প্রতি {unitText} · {product.categoryNameBn}
                                </p>
                                <p
                                    className={`text-sm mt-2 ${isUp
                                        ? "text-slate-700"
                                        : isDown
                                            ? "text-green-600"
                                            : "text-slate-500"
                                        }`}>
                                    গতকালের তুলনায় আজ দাম{" "}
                                    <span className="font-semibold">
                                        {isUp
                                            ? "বেড়েছে"
                                            : isDown
                                                ? "কমেছে"
                                                : "অপরিবর্তিত"}
                                    </span>
                                    {" · "}
                                    {toBanglaNumber(
                                        Math.abs(product.today - product.yesterday)
                                    )}{" "}
                                    টাকা
                                </p>
                            </div>
                        </div>

                        {/* Today's price */}
                        <div className="bg-slate-50 rounded-xl p-4 sm:p-5 min-w-44 text-center">

                            <p className="text-xs text-slate-500">
                                আজকের দাম
                            </p>

                            <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                                {toBanglaNumber(product.today)}
                            </p>

                            <p className="text-xs text-slate-500">
                                টাকা / {unitText}
                            </p>

                            {/* Change */}
                            <span
                                className={`inline-block mt-2 text-xs font-semibold ${isUp
                                    ? "text-red-500"
                                    : isDown
                                        ? "text-green-600"
                                        : "text-slate-500"
                                    }`}>
                                {isUp
                                    ? `▲ ${toBanglaNumber(product.change.pct)}%`
                                    : isDown
                                        ? `▼ ${toBanglaNumber(product.change.pct)}%`
                                        : `— ${toBanglaNumber(product.change.pct)}%`}
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mt-7">

                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                        দামের সারসংক্ষেপ
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">

                        {/* Minimum */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4">

                            <p className="text-xs text-slate-500">
                                সর্বনিম্ন দাম
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-green-600 mt-1">
                                {formatPrice(minimumPrice)} টাকা
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                সবচেয়ে কম দামের বাজার
                            </p>

                        </div>

                        {/* Maximum */}

                        <div className="bg-white border border-slate-200 rounded-xl p-4">

                            <p className="text-xs text-slate-500">
                                সর্বাধিক দাম
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-red-500 mt-1">
                                {formatPrice(maximumPrice)} টাকা
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                সবচেয়ে বেশি দামের বাজার
                            </p>
                        </div>

                        {/* Average */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4">

                            <p className="text-xs text-slate-500">
                                গড় দাম
                            </p>

                            <p className="text-xl sm:text-2xl font-bold text-green-700 mt-1">
                                {formatPrice(averagePrice)} টাকা
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                {unitText}-এর হিসাবে
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-8">

                    <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                    <div className="mt-4 bg-white border border-slate-200 rounded-xl overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-170 text-sm">
                                {/* Table header */}

                                <thead className="bg-slate-50">

                                    <tr className="border-b border-slate-200">

                                        <th className="text-left px-4 py-3 font-semibold text-slate-600">
                                            বাজার
                                        </th>

                                        <th className="text-left px-4 py-3 font-semibold text-slate-600">
                                            বিভাগ
                                        </th>

                                        <th className="text-right px-4 py-3 font-semibold text-slate-600">
                                            সর্বনিম্ন
                                        </th>

                                        <th className="text-right px-4 py-3 font-semibold text-slate-600">
                                            সর্বাধিক
                                        </th>

                                        <th className="text-right px-4 py-3 font-semibold text-slate-600">
                                            গড়
                                        </th>

                                    </tr>

                                </thead>

                                {/* Table body */}
                                <tbody>

                                    {product.markets.map((market) => {

                                        const marketAverage =
                                            (market.min + market.max) / 2;

                                        return (
                                            <tr
                                                key={`${market.market}-${market.division}`}
                                                className="border-b last:border-b-0 border-slate-200 hover:bg-slate-50 transition">

                                                {/* Market */}
                                                <td className="px-4 py-3 text-slate-700">
                                                    {market.market}
                                                </td>

                                                {/* Division */}
                                                <td className="px-4 py-3 text-slate-600">
                                                    {market.division}
                                                </td>

                                                {/* Minimum */}
                                                <td className="px-4 py-3 text-right text-slate-700">
                                                    {formatPrice(market.min)} টাকা
                                                </td>

                                                {/* Maximum */}
                                                <td className="px-4 py-3 text-right text-slate-700">
                                                    {formatPrice(market.max)} টাকা
                                                </td>

                                                {/* Average */}
                                                <td className="px-4 py-3 text-right font-semibold text-slate-800">
                                                    {formatPrice(marketAverage)} টাকা
                                                </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductDetails;