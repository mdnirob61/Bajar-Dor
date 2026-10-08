import Link from 'next/link';
import React from 'react';

const SignUpPage = () => {
    return (
        <div className='bg-slate-100 flex flex-col items-center py-10'>
            <h1 className='font-bold text-3xl'>অ্যাকাউন্ট তৈরি করুন</h1>
            <p className='text-[0.9rem] text-slate-700 py-2 mb-3'>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            <form>
                <fieldset className="fieldset bg-white rounded-xl w-xs px-6 py-8">

                    <p className='pb-1 font-semibold'>নাম</p>
                    <input name='name' type="text" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="your name" />

                    <p className='pb-1 mt-5 font-semibold'>ইমেইল</p>
                    <input name='email' type="email" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="you@example.com" />

                    <p className='pb-1 mt-5 font-semibold'>পাসওয়ার্ড</p>
                    <input name='password' type="password" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="কমপক্ষে ৮ অক্ষর" />

                    <p className='pb-1 mt-5 font-semibold'>পাসওয়ার্ড নিশ্চিত করুন</p>
                    <input type="password" className="input border border-slate-300 rounded-xl w-md py-2 pl-2" placeholder="আবার লিখুন" />

                    <button className="py-3 text-center px-20 bg-green-700 text-white mt-5 rounded-xl w-md">অ্যাকাউন্ট তৈরি করুন</button>

                    <div className='flex flex-col items-center'>
                        <p className='py-4'>অথবা</p>
                        <div className='flex gap-2'>
                            <button className='border border-slate-300 rounded-xl p-3 font-semibold'>Google দিয়ে চালিয়ে যান</button>
                            <button className='border border-slate-300 rounded-xl p-3 font-semibold'>GitHub দিয়ে চালিয়ে যান</button>
                        </div>
                        <p className='text-slate-800 pt-5'>অ্যাকাউন্ট নেই? <Link href={'/sign-up'} className='text-green-700 cursor-pointer'>সাইন ইন করুন</Link></p>
                    </div>
                </fieldset>
                <Link href={'/'} className='text-slate-500 text-[0.9rem] text-center'>← হোম পেজে ফিরে যান</Link>
            </form>
        </div>
    );
};

export default SignUpPage;