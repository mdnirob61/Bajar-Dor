'use client';
import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

const UserInfo = () => {

    const { data: session } = useSession();
    const user = session?.user;
    // console.log(user)

    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed Out Successfully");
    }

    return (
        <div>
            {
                user ?
                    <div>
                        <div className='flex gap-3 items-center'>
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                    {user.image && (
                                        <Image
                                            alt="userImage"
                                            src={user.image}
                                            width={40}
                                            height={40}
                                        />
                                    )}
                                </div>
                            </div>
                            <h2 className='font-semibold text-[1rem]'>{user?.name}</h2>
                            <button onClick={handleSignOut} className='btn btn-error'>Sign out</button>
                        </div>
                    </div>
                    : <div className="flex gap-2 sm:gap-4 items-center">

                        <Link href={'/sign-in'}>
                            <button className="hover:bg-green-200 py-1.5 px-2 sm:py-2 sm:px-3 text-sm sm:text-base font-semibold hover:rounded-xl cursor-pointer">
                                সাইন ইন
                            </button>
                        </Link>

                        <Link href={'/sign-up'}>
                            <button className="bg-green-700 py-1.5 px-2 sm:py-2 sm:px-3 text-sm sm:text-base text-white rounded-xl cursor-pointer">
                                সাইন আপ
                            </button>
                        </Link>

                    </div>
            }

        </div>
    );
};

export default UserInfo;