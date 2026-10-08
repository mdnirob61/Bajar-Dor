"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface INavLinks {
    id: string;
    slug: string;
    icon: string;
    nameBn: string;
}

const NavbarLinks = ({ data }: { data: INavLinks[] }) => {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">

            {/* Mobile Hamburger */}
            <div className="flex md:hidden justify-start">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-green-100 transition"
                    aria-label="Toggle menu"
                >
                    <div className="space-y-1.5">
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden mt-2 border rounded-xl p-2 bg-white shadow-sm">
                    <div className="flex flex-col gap-1">
                        {data.map((item) => {
                            const isActive =
                                pathname === `/category/${item.slug}`;

                            return (
                                <Link
                                    key={item.id}
                                    href={`/category/${item.slug}`}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-3 py-2 rounded-lg transition ${isActive
                                        ? "bg-green-200 text-black"
                                        : "text-slate-600 hover:bg-green-100"
                                        }`}
                                >
                                    <p className="font-semibold">
                                        {item.icon} {item.nameBn}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-4 lg:gap-5 justify-center">
                {data.map((item) => {
                    const isActive =
                        pathname === `/category/${item.slug}`;

                    return (
                        <Link
                            key={item.id}
                            href={`/category/${item.slug}`}
                            className={`px-3 py-1 mt-1 rounded-xl font-medium transition ${isActive
                                ? "bg-green-200 text-black"
                                : "text-slate-600 hover:bg-green-100"
                                }`}>
                            <small className="font-semibold text-black">
                                {item.icon} {item.nameBn}
                            </small>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default NavbarLinks;