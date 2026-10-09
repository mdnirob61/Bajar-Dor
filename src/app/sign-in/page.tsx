'use client';
import { signIn } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await signIn.email({
            email: user.email as string,
            password: user.password as string,
            callbackURL: "/"
        })

        if (data) {
            toast.success("Signed In Successfully");
        }
        if (error) {
            toast.error("Something went Wrong")
        }
    }

    const handleGoogleSignIn = async () => {
        const data = await signIn.social({
            provider: "google",
        })
        // console.log(data)
    }

    const handleGithubSignIn = async () => {
        const data = await signIn.social({
            provider: "github",
        })
        // console.log(data)
    }

    return (
        <div className='bg-slate-100 flex flex-col items-center py-10'>
            <h1 className='font-bold text-3xl'>সাইন ইন</h1>
            <p className='text-[0.9rem] text-slate-700 py-2 mb-3'>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            <div className='bg-white rounded-xl px-6 py-8'>
                <form onSubmit={onSubmit}>
                    <fieldset className="fieldset w-xs">

                        <p className='pb-1 font-semibold'>ইমেইল</p>
                        <input name='email' type="email" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="you@example.com" />

                        <p className='pb-1 mt-5 font-semibold'>পাসওয়ার্ড</p>
                        <input name='password' type="password" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="কমপক্ষে ৮ অক্ষর" />

                        <button className="py-3 text-center px-20 bg-green-700 text-white mt-5 rounded-xl w-md">সাইন ইন</button>
                    </fieldset>
                </form>
                <div className='flex flex-col items-center'>
                    <p className='py-4'>অথবা</p>
                    <div className='flex gap-2'>
                        <button onClick={handleGoogleSignIn} className='border border-slate-300 rounded-xl p-3 font-semibold cursor-pointer'>
                            Google দিয়ে চালিয়ে যান</button>
                        <button onClick={handleGithubSignIn} className='border border-slate-300 rounded-xl p-3 font-semibold cursor-pointer'>
                            GitHub দিয়ে চালিয়ে যান</button>
                    </div>
                    <p className='text-slate-800 pt-5'>অ্যাকাউন্ট নেই? <Link href={'/sign-up'} className='text-green-700 cursor-pointer'>সাইন আপ করুন</Link></p>
                </div>
            </div>
            <Link href={'/'} className='text-slate-500 text-[0.9rem] items-center mt-3'>← হোম পেজে ফিরে যান</Link>
        </div>
    );
};

export default SignInPage;