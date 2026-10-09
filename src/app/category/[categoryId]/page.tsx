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
        `${process.env.BACKEND_URL}/api/bazardor/products?category=${encodeURIComponent(categoryId)}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    const data: Product[] = await res.json();

    if (data.length === 0) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <main className="container mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">

                {/* Category Heading */}
                <section className="mb-4 rounded-xl bg-white p-4 sm:mb-6 sm:rounded-2xl sm:p-5 md:p-6">
                    <h1 className="text-xl font-bold leading-snug text-slate-800 sm:text-2xl md:text-3xl">
                        {data[0].categoryIcon} {data[0].categoryNameBn}
                    </h1>

                    <p className="mt-1.5 text-xs text-slate-500 sm:mt-2 sm:text-sm md:text-base">
                        {toBanglaNumber(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </section>

                {/* Sorting + Product Cards */}
                <CategoryProducts products={data} />

            </main>
        </div>
    );
};

export default CategoryProduct;