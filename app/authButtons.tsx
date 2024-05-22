"use client"

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
    return (

        <div className="px-5 pt-1 pb-5 ">
            <button className='w-[100px] bg-blue-600 rounded' onClick={() => signIn()}>
                Login
            </button>
        </div>
    );
}

export const LogoutButton = () => {
    return (
        <div className="px-5 pt-1 pb-5 ">
            <button className='w-[100px] bg-blue-600 rounded' onClick={() => signOut()}>
                Logout
            </button>
        </div>
    );
}