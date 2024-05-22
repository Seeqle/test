// 'use client'
// import { useState } from 'react';
// import Navbar from '../navbar/page';
// import { useRouter } from 'next/navigation';
// import '@/style/home.css';
// import Link from 'next/link';



// export default function Register() {
//     const router = useRouter();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (event: { preventDefault: () => void; }) => {
//         event.preventDefault(); // Empêche le comportement par défaut de soumission de formulaire

//         // Préparation des données à envoyer
//         const userData = { email, password };

//         try {
//             const response = await fetch('/api/auth/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert('User registered successfully');
//                 console.log(result);
//                 // window.location.href = '/connexion';
//             } else {
//                 alert(result.message);
//             }
//         } catch (error) {
//             alert('Failed to register user');
//             console.error('Error:', error);
//         }
//     };

//     return (

//         <div className='flex justify-center items-center h-screen'>
//             <div className="w-full max-w-xs ml-20">
//                 <h1 className="text-xl font-semibold mb-4 text-center">Register</h1>
//                 <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                     <div className="flex items-center justify-center">
//                         <Link href="/login" className='text-blue-500'>Login</Link>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Email:
//                             <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
//                                 type="text"
//                                 value={email}
//                                 onChange={e => setEmail(e.target.value)} />
//                         </label>
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                             Password:
//                             <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
//                                 type="password"
//                                 value={password}
//                                 onChange={e => setPassword(e.target.value)} />
//                         </label>
//                     </div>
//                     <div className="flex items-center justify-center">
//                         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                             Register
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );


// }


// 'use client'
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/router';

// export default function SignUp() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();

//         const result = await signIn('credentials', {
//             redirect: false,
//             email,
//             password,
//         });

//         if (result?.error) {
//             alert(result.error);
//         } else {
//             console.log('connextion ok');
            
//             // window.location.href = '/connexion'
//         }
//     };

//     return (
//         <div>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Email:
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </label>
//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     );
// }


'use client'
import { useState } from 'react';
import Navbar from '../navbar/page';
import { useRouter } from 'next/navigation';
import '@/style/home.css';
import Link from 'next/link';



export default function Register() {
    const router = useRouter();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Empêche le comportement par défaut de soumission de formulaire

        // Préparation des données à envoyer


        try {
            const response = await fetch('/api/auth/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert('User registered successfully');
                console.log(result);
                // window.location.href = '/connexion';
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Failed to register user');
            console.error('Error:', error);
        }
    };

    return (

        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-xs ml-20">
                <h1 className="text-xl font-semibold mb-4 text-center">Register</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex items-center justify-center">
                        <Link href="/login" className='text-blue-500'>Login</Link>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Name:
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                                type="text"
                                value={data.name}
                                onChange={(e) => { setData({ ...data, name: e.target.value }) }} />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                                type="text"
                                value={data.email}
                                onChange={(e) => { setData({ ...data, email: e.target.value }) }} />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                                type="password"
                                value={data.password}
                                onChange={(e) => { setData({ ...data, password: e.target.value }) }}/>
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


}
