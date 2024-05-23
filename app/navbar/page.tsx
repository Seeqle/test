
import React, { useEffect } from 'react';
import { useState } from 'react';

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { LoginButton, LogoutButton } from '../authButtons';
import { auth } from '@/src/lib/auth';

export default async function Navbar() {
    const session = await auth()
    return (
        <div className="h-full w-60 bg-gray-800 text-white fixed">
            <div className="flex flex-col p-5">
                <a className='w-40' href="home"><img src="assets/logosite.png" /></a>
                <ul>
                    <li className="mb-6">
                        <Link href="/home" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">Acceuil</Link>
                    </li>
                    <li className="mb-6">
                        <a href="#" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">A propos</a>
                    </li>
                    <li className="mb-6">
                        <a href="products" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">Produits</a>
                    </li>
                    <li className="mb-6">
                        <Link href="#" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">Contact</Link>
                    </li>
                 
                    <li className=" absolute inset-x-5 bottom-0 h-16 ">
                        <div >
                            <h1>
                                {session?.user
                                    ?  session?.user.email
                                    : "not authentificated"}
                            </h1>
                            <div>
                                {!session?.user ?
                                    <LoginButton /> : <LogoutButton />}
                            </div>
                        </div>
                    </li>
                    {!session?.user ?
                        < Link href="/register" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out"> Register</Link> : ""
                    }
                    
                    
                </ul>
            </div>

        </div>
    );
}
