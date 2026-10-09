"use client";

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    // Show or hide the update form
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = (formData.get("name") as string).trim();

        if (!name) {
            toast.error("নাম লিখুন!");
            return;
        }

        setIsUpdating(true);

        try {
            const { data, error } = await updateUser({ name });

            if (error) {
                toast.error("আপডেট ব্যর্থ হয়েছে!");
                return;
            }

            if (data) {
                toast.success("সফলভাবে আপডেট হয়েছে!");
                setIsEditing(false);
            }
        } catch {
            toast.error("কিছু একটা সমস্যা হয়েছে!");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:py-10">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center">

                {/* Heading */}
                <h1 className="text-center text-2xl font-bold sm:text-3xl">
                    আমার প্রোফাইল
                </h1>

                <p className="mb-5 mt-2 text-center text-sm text-slate-700 sm:mb-6">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>

                {/* User Information */}
                <section className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                                {user?.image ? (
                                    <Image
                                        alt={user.name || "Profile"}
                                        src={user.image}
                                        width={48}
                                        height={48}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl font-semibold text-slate-500">
                                        {user?.name?.charAt(0) || "?"}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate font-semibold text-slate-800">
                                    {user?.name}
                                </h2>

                                <p className="break-all text-xs text-slate-600 sm:text-sm">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2.5 text-sm text-red-500 transition hover:bg-red-50 sm:w-auto"
                        >
                            <span>↩</span>
                            <span>সাইন আউট</span>
                        </button>
                    </div>
                </section>

                {/* Update Button */}
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="mt-5 w-full rounded-xl bg-green-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto sm:min-w-40"
                    >
                        প্রোফাইল আপডেট করুন
                    </button>
                )}

                {/* Update Profile Form */}
                {isEditing && (
                    <form
                        onSubmit={handleUpdateProfile}
                        className="mt-4 w-full rounded-xl bg-white px-4 py-6 shadow-sm sm:mt-5 sm:px-6 sm:py-8"
                    >
                        <fieldset
                            disabled={isUpdating}
                            className="w-full"
                        >
                            <h4 className="font-semibold text-slate-800">
                                তথ্য আপডেট করুন
                            </h4>

                            <label
                                htmlFor="name"
                                className="mb-2 mt-5 block text-sm text-slate-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={user?.name || ""}
                                placeholder="আপনার নাম লিখুন"
                                required
                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-full rounded-xl bg-green-700 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-40"
                                >
                                    {isUpdating
                                        ? "আপডেট হচ্ছে..."
                                        : "আপডেট করুন"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    disabled={isUpdating}
                                    className="w-full rounded-xl border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 sm:w-auto"
                                >
                                    বাতিল
                                </button>
                            </div>
                        </fieldset>
                    </form>
                )}
            </div>
        </main>
    );
};

export default ProfilePage;

