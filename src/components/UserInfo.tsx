"use client";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const user = session?.user;

    const handleSignOut = async () => {
        try {
            await signOut();
            setIsOpen(false);
            toast.success("Signed Out Successfully");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Sign out failed. Please try again.");
        }
    };

    // Loading state
    if (isPending) {
        return (
            <div className="h-10 w-24 rounded-xl bg-slate-200 animate-pulse" />
        );
    }

    return (
        <div className="relative">
            {user ? (
                <>
                    {/* Profile Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-label="Open profile menu"
                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-slate-100 transition"
                    >
                        <div className="avatar">
                            <div className="w-10 rounded-xl">
                                {user.image ? (
                                    <Image
                                        alt={user.name || "User profile"}
                                        src={user.image}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-xl object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 font-bold text-green-800">
                                        {user.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                            </div>
                        </div>

                        <span className="hidden sm:block max-w-28 truncate text-sm font-bold text-slate-800">
                            {user.name}
                        </span>

                        <span className="text-xl text-slate-500">▾</span>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <>
                            {/* Click outside to close */}
                            <button
                                type="button"
                                aria-label="Close profile menu"
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-40 cursor-default"
                            />

                            <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">

                                {/* User Details */}
                                <div className="border-b border-slate-100 pb-3">
                                    <p className="truncate font-semibold text-slate-800">
                                        {user.name}
                                    </p>

                                    <p className="mt-1 truncate text-xs text-slate-500">
                                        {user.email}
                                    </p>
                                </div>

                                {/* Profile Link */}
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="mt-2 flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-green-700"
                                >
                                    <span>👤</span>
                                    <span>আমার প্রোফাইল</span>
                                </Link>

                                {/* Sign Out */}
                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50"
                                >
                                    <span>↩</span>
                                    <span>সাইন আউট</span>
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                /* Sign In / Sign Up */
                <div className="flex items-center gap-2 sm:gap-4">
                    <Link
                        href="/sign-in"
                        className="rounded-xl px-2 py-1.5 text-sm font-semibold transition hover:bg-green-100 sm:px-3 sm:py-2 sm:text-base"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-xl bg-green-700 px-2 py-1.5 text-sm font-semibold text-white transition hover:bg-green-800 sm:px-3 sm:py-2 sm:text-base"
                    >
                        সাইন আপ
                    </Link>
                </div>
            )}
        </div>
    );

};

export default UserInfo;
