"use client";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
    const onSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await signIn.email({
            email: user.email as string,
            password: user.password as string,
            callbackURL: "/",
        });

        if (error) {
            toast.error("সাইন ইন ব্যর্থ হয়েছে!");
            return;
        }

        if (data) {
            toast.success("সফলভাবে সাইন ইন হয়েছে!");
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleGithubSignIn = async () => {
        await signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-6 sm:py-10">
            <div className="mx-auto flex w-full max-w-md flex-col items-center">

                {/* Heading */}
                <h1 className="text-center text-2xl font-bold sm:text-3xl">
                    সাইন ইন
                </h1>

                <p className="mb-4 mt-2 text-center text-sm leading-relaxed text-slate-700 sm:mb-5">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

                {/* Sign In Card */}
                <div className="w-full rounded-xl bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-8">
                    <form onSubmit={onSubmit}>
                        <fieldset className="w-full">

                            {/* Email */}
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-semibold sm:text-base"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:text-base"
                                required
                                placeholder="you@example.com"
                            />

                            {/* Password */}
                            <label
                                htmlFor="password"
                                className="mb-1 mt-5 block text-sm font-semibold sm:text-base"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:text-base"
                                required
                                placeholder="আপনার পাসওয়ার্ড"
                            />

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-5 w-full cursor-pointer rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:text-base"
                            >
                                সাইন ইন
                            </button>
                        </fieldset>
                    </form>

                    {/* Social Login */}
                    <div className="flex flex-col items-center">
                        <p className="py-4 text-sm text-slate-500">
                            অথবা
                        </p>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex rounded-xl border items-center border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50"
                            >
                                <FcGoogle size={40} />
                                Google দিয়ে চালিয়ে যান
                            </button>

                            <button
                                type="button"
                                onClick={handleGithubSignIn}
                                className="flex items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50"
                            >
                                <FaGithub size={40} />
                                GitHub দিয়ে চালিয়ে যান
                            </button>
                        </div>

                        <p className="pt-5 text-center text-sm text-slate-800">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back Home */}
                <Link
                    href="/"
                    className="mt-4 text-center text-sm text-slate-500 transition hover:text-green-700"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </main>
    );
};

export default SignInPage;