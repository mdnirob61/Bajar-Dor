'use client';
import { signOut, updateUser, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {

    const { data: session } = useSession();
    const user = session?.user;

    const handleUpdateProfile = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries())

        await updateUser({
            name: user.name as string,
        })
    }

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className='bg-slate-100 flex flex-col items-center py-10'>
            <h1 className='font-bold text-3xl'>আমার প্রোফাইল</h1>
            <p className='text-[0.9rem] text-slate-700 py-2 mb-3'>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

            <div className='flex justify-between bg-white px-6 py-5 rounded-xl gap-30'>
                <div className='flex gap-2'>
                    <div className="avatar">
                        <div className="w-10 rounded-xl">
                            {user?.image && (
                                <Image
                                    alt={user.name}
                                    src={user.image}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-xl object-cover"
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-[1rem]'>{user?.name}</h2>
                        <p className='text-[0.8rem] text-slate-600'>{user?.email}</p>
                    </div>
                </div>
                <Link href={'/'}>
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition hover:bg-red-50 border border-red-500"
                    >
                        <span>↩</span>
                        <span>সাইন আউট</span>
                    </button>
                </Link>
            </div>

            <form onSubmit={handleUpdateProfile} className="bg-white rounded-xl px-6 py-8 mt-5">
                <fieldset className="fieldset w-xs">
                    <h4 className='font-semibold'>তথ্য</h4>
                    < p className='pb-1 pt-5'> নাম </p >
                    <input name='name' type="text" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="Name" />

                    <button className="py-2 text-center px-20 bg-green-700 text-white mt-5 rounded-xl w-md cursor-pointer">আপডেট </button>
                </fieldset >
            </form >

        </div>
    );
};

export default ProfilePage;