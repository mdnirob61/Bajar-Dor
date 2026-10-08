import React from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";

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

interface PageProps {
    params: Promise<{
        categoryId: string;
    }>;
}

const toBanglaNumber = (value: number | string) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";

    return String(value).replace(
        /\d/g,
        (digit) => banglaDigits[Number(digit)]
    );
};

const CategoryProduct = async ({ params }: PageProps) => {
    const { categoryId } = await params;

    const res = await fetch(
        `${process.env.BACKEND_URL}/api/bazardor/products?category=${categoryId}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    const data: Product[] = await res.json();

    // Empty category
    if (data.length === 0) {
        notFound();
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <main className="max-w-6xl container mx-auto px-4 py-8">

                {/* Category Heading */}
                <div className="mb-6 p-6 bg-white rounded-2xl">
                    <h1 className="text-3xl font-bold text-slate-800">
                        {data[0].categoryIcon} {data[0].categoryNameBn}
                    </h1>

                    <p className="text-slate-500 mt-2">
                        {toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>

                {/* Sorting + Product Cards */}
                <CategoryProducts products={data} />

            </main>
        </div>
    );
};

export default CategoryProduct;