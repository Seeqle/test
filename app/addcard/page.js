'use client'
import React, { useState } from "react";

const AddCard = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0 ,
        link: '',
        currency: '',
        category: '',
        univers: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            // [id]: value
            [id]: id === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/productcreate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Product added:', data);
                onClose(); 
            } else {
                console.error('Failed to add product:', await response.json());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-hidden">
            <div className="w-[720px] flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={onClose}>X</button>
                <div className="bg-white rounded justify-center">
                    <form onSubmit={handleSubmit}>
                        <div className="w-[58%] flex float-start h-full">
                            <img className="rounded" src="assets/yugi.jpg" alt="Product" />
                        </div>
                        <div className="mb-3 pt-2 text-center">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <input
                                type="text"
                                id="description"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="number"
                                id="price"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="link" className="block text-gray-700 text-sm font-bold mb-2">Link</label>
                            <input
                                type="text"
                                id="link"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="link"
                                value={formData.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="currency" className="block text-gray-700 text-sm font-bold mb-2">Currency</label>
                            <input
                                type="text"
                                id="currency"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="currency"
                                value={formData.currency}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                            <input
                                type="text"
                                id="category"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-center">
                            <label htmlFor="univers" className="block text-gray-700 text-sm font-bold mb-2">Univers</label>
                            <input
                                type="text"
                                id="univers"
                                className="shadow appearance-none border rounded py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                aria-describedby="univers"
                                value={formData.univers}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCard;
