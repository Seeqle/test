'use client'
import React, { useEffect } from 'react';
import { useState } from 'react';

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLogged(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    };

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
                    {isLogged ? (
                        <li className=" absolute inset-x-5 bottom-[4em] h-16 ">
                            <Link href="#" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">
                                <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", }} className='pr-2 w-5' />Profil</Link>
                        </li>
                    ) : (
                        <div></div>
                    )}
                    {isLogged ?(
                    <li className=" absolute inset-x-5 bottom-8 h-16 ">
                        <Link href="/cart" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">
                            <FontAwesomeIcon icon={faCartPlus} style={{ color: "#ffffff", }} className='pr-2 w-5' />Cart</Link>
                    </li>
                    ) : (
                            <div></div>
                    )}
                    {!isLogged ? (
                        <li className=" absolute inset-x-5 bottom-0 h-16 ">
                            <Link href="/connexion" className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">
                                <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#ffffff", }} className='pr-2 w-5' />Login</Link>
                        </li>
                    ) : (
                        <li className="absolute inset-x-5 bottom-0 h-16 ">
                            <Link href="/connexion"><button onClick={handleLogout} className="text-xl hover:text-gray-300 transition duration-150 ease-in-out">
                                    <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ffffff", }} className='pr-2'/>Logout
                            </button></Link>
                            </li>
                            
                    )}

                    
                </ul>
            </div>

        </div>
    );
}
