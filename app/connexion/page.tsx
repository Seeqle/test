// 'use client'
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Navbar from '../navbar/page';
// import Link from 'next/link';

// export default function Connexion() {
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('/api/connexion', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name, password }),
//             });

//             if (response.ok) {
//                 const { token } = await response.json();
//                 // Stockez le token dans localStorage ou dans l'état de l'application
//                 localStorage.setItem('token', token);
//                 // Redirigez l'utilisateur vers une autre page par exemple
//                 window.location.href = '/home';
//             } else {
//                 console.error('Authentification échouée');
//             }
//         } catch (error) {
//             console.error('Erreur lors de la requête:', error);
//         }
//     };
//     return (
//         <div className='flex justify-center items-center h-screen'>
//             <div className="w-full max-w-xs ml-20">
//                 <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>
//                 <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
//                     <div className="flex items-center justify-center">
//                         <Link href="/register" className='text-blue-500'> Sign in</Link>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Name:
//                             <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </label>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Password:
//                             <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
//                                 type="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </label>
//                     </div>
//                     <div className="flex items-center justify-center">
//                         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                             Login
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }


'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            alert(result.error);
        } else {
            console.log('connextion ok');
            
            // window.location.href = '/connexion'
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign In</button>

            </form>
        </div>
    );
}
