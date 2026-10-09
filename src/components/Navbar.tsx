import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarLinks from "./NavbarLinks";
import UserInfo from "./UserInfo";

const Navbar = async () => {
    // "use cache";

    const res = await fetch(`${process.env.BACKEND_URL}/api/bazardor/categories`);

    const data = await res.json();

    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div>
            {/* Header */}
            <header className="max-w-6xl mx-auto mt-3 px-4 sm:px-6 lg:px-0">
                <div className="flex justify-between items-center gap-3">

                    {/* Left Side */}
                    <div className="flex items-center gap-2">

                        {/* Mobile Menu */}
                        <div className="md:hidden">
                            <NavbarLinks data={data} />
                        </div>

                        {/* Logo */}
                        <Link href="/">
                            <div className="flex items-center gap-2 sm:gap-3">

                                <Image
                                    className="w-9 h-9 sm:w-10 sm:h-10 bg-green-700 rounded-xl p-2"
                                    height={30}
                                    width={30}
                                    src="/assets/logo-icon.png"
                                    alt="NavLogo"
                                />

                                <div>
                                    <h2 className="font-bold text-xl sm:text-2xl">
                                        বাজার দর
                                    </h2>

                                    <p className="text-slate-500 text-[0.6rem] sm:text-[0.7rem]">
                                        {date}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <UserInfo></UserInfo>
                </div>
            </header>

            <hr className="mt-2 text-slate-200" />

            {/* Desktop Categories */}
            <div className="hidden md:block">
                <NavbarLinks data={data} />
            </div>

            <hr className="my-1 text-slate-200" />
        </div>
    );
};

export default Navbar;