// 'use client'
// import { Product } from '@prisma/client';
// import { useState, useEffect, Fragment } from 'react';

// export default function Products() {
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         async function fetchProducts() {
//             try {
//                 const response = await fetch('/api/productGet');
//                 if (response.ok) {
//                     const productsData = await response.json();
//                     setProducts(productsData);
//                 } else {
//                     console.error('Failed to fetch products:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         }

//         fetchProducts();
//     }, []);

//     const addToCart = async (product: { id: number; name: string; currency: string; price: number; link: string; category: string; univers: string; }) => {
//         try {
//             const response = await fetch('/api/addshoppindcart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(product),
//             });
//             if (response.ok) {
//                 console.log('Product added to cart successfully');
//             } else {
//                 console.error('Failed to add product to cart:', response.statusText);
//             }
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//         }
//     };

//     return (
//         <Fragment>
//             <div className="container mt-10 ml-10">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 padding">
//                     {products.map(product => (
//                         <div key={product.id} className="card bg-white rounded overflow-hidden shadow-lg">
//                             <img className="w-full" src={product.link} alt={product.name} />
//                             <div className="px-4 py-2">
//                                 <div className="font-bold text-xs mb-2">{product.name}</div>
//                             </div>
//                             <div className="px-4 py-1">
//                                 <p className="text-gray-900 font-semibold text-xs">Price: {product.price} {product.currency}</p>
//                             </div>
//                             <div className="px-5 pt-1 pb-2 mb-0">
//                                 <button className='w-full bg-blue-600 rounded' onClick={() => addToCart(product)}>Add to cart</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Fragment>
//     );
// }
