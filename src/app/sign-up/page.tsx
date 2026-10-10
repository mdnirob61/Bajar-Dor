"use client";
import { signIn, signUp } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordValid =
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password);

    const passwordsMatch = password === confirmPassword;

    const onSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!passwordValid) {
            toast.error("পাসওয়ার্ডের শর্ত পূরণ করুন!");
            return;
        }

        if (!passwordsMatch) {
            toast.error("দুটি পাসওয়ার্ড মিলছে না!");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await signUp.email({
            name: user.name as string,
            email: user.email as string,
            password,
            // callbackURL: "/sign-in",
        });

        if (error) {
            toast.error("সাইন আপ ব্যর্থ হয়েছে!");
            return;
        }

        if (data) {
            toast.success("সফলভাবে সাইন আপ হয়েছে!");
            router.replace("/sign-in")
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
                <h1 className="text-center text-2xl font-bold leading-snug sm:text-3xl">
                    অ্যাকাউন্ট তৈরি করুন
                </h1>

                <p className="mb-4 mt-2 text-center text-sm leading-relaxed text-slate-700 sm:mb-5">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>

                {/* Signup Card */}
                <div className="w-full rounded-xl bg-white px-4 py-6 shadow-sm sm:px-6 sm:py-8">
                    <form onSubmit={onSubmit}>
                        <fieldset className="w-full">

                            {/* Name */}
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-semibold sm:text-base"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:text-base"
                                required
                                placeholder="আপনার নাম"
                            />

                            {/* Email */}
                            <label
                                htmlFor="email"
                                className="mb-1 mt-4 block text-sm font-semibold sm:mt-5 sm:text-base"
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
                                className="mb-1 mt-4 block text-sm font-semibold sm:mt-5 sm:text-base"
                            >
                                পাসওয়ার্ড
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-green-100 sm:text-base ${password && !passwordValid
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-slate-300 focus:border-green-600"
                                    }`}
                                required
                                placeholder="পাসওয়ার্ড লিখুন"
                            />

                            {/* Password Requirements */}
                            <div className="mt-2 space-y-1.5 text-xs sm:text-sm">
                                <p className={password.length >= 8 ? "text-green-600" : "text-slate-500"}>
                                    {password.length >= 8 ? "✓" : "•"} কমপক্ষে ৮টি অক্ষর
                                </p>

                                <p className={/[a-z]/.test(password) ? "text-green-600" : "text-slate-500"}>
                                    {/[a-z]/.test(password) ? "✓" : "•"} অন্তত ১টি ছোট হাতের অক্ষর (a-z)
                                </p>

                                <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-slate-500"}>
                                    {/[A-Z]/.test(password) ? "✓" : "•"} অন্তত ১টি বড় হাতের অক্ষর (A-Z)
                                </p>

                                <p className={/[0-9]/.test(password) ? "text-green-600" : "text-slate-500"}>
                                    {/[0-9]/.test(password) ? "✓" : "•"} অন্তত ১টি সংখ্যা (0-9)
                                </p>
                            </div>

                            {password.length > 0 && !passwordValid && (
                                <p className="mt-2 text-xs text-red-600">
                                    পাসওয়ার্ডের সব শর্ত পূরণ করুন।
                                </p>
                            )}

                            {/* Confirm Password */}
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1 mt-4 block text-sm font-semibold sm:mt-5 sm:text-base"
                            >
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-green-100 sm:text-base ${confirmPassword && !passwordsMatch
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-slate-300 focus:border-green-600"
                                    }`}
                                required
                                placeholder="আবার পাসওয়ার্ড লিখুন"
                            />

                            {confirmPassword.length > 0 && !passwordsMatch && (
                                <p className="mt-2 text-xs text-red-600">
                                    পাসওয়ার্ড দুটি মিলছে না।
                                </p>
                            )}

                            {confirmPassword.length > 0 && passwordsMatch && (
                                <p className="mt-2 text-xs text-green-600">
                                    ✓ পাসওয়ার্ড দুটি মিলেছে।
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="mt-5 w-full cursor-pointer rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 sm:text-base"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </button>
                        </fieldset>
                    </form>

                    {/* Social Login */}
                    <div className="flex flex-col items-center">
                        <p className="py-4 text-sm text-slate-500">অথবা</p>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex items-center justify-center gap-3 rounded-xl border border-slate-300 px-4 py-3 font-semibold transition hover:bg-slate-50"
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
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/sign-in"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন ইন করুন
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

export default SignUpPage;