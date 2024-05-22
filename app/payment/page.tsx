'use client'
import React, { useEffect, useState } from "react";


interface CartProduct {
    id: number;
    name: string;
    price: number;
    link: string;
}

interface ProductCount {
    product: CartProduct;
    count: number;
}

interface PaymentProps {
    isVisible: boolean;
    onClose: () => void;
}

const Payment: React.FC<PaymentProps> = ({ isVisible, onClose }) => {
    const [carts, setCarts] = useState<CartProduct[]>([]);
    const [productCounts, setProductCounts] = useState<{ [name: string]: ProductCount }>({});

    useEffect(() => {
        async function fetchCart() {
            try {
                const response = await fetch('/api/getcart');
                if (response.ok) {
                    const cartProducts: CartProduct[] = await response.json();
                    setCarts(cartProducts);
                } else {
                    console.error('Failed to fetch products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchCart();
    }, []);

    useEffect(() => {
        const counts: { [name: string]: ProductCount } = {};
        carts.forEach(cart => {
            if (counts[cart.name]) {
                counts[cart.name].count += 1;
            } else {
                counts[cart.name] = { product: cart, count: 1 };
            }
        });
        setProductCounts(counts);
    }, [carts]);


    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center overflow-hidden">
            <div className="w-[720px] flex flex-col">
                <button className="text-white text-xl place-self-end" onClick={onClose}>X</button>
                <div className="bg-white rounded justify-center p-5">
                    <div className="container">
                        <div className="header">
                            <div>Image</div>
                            <div>Name</div>
                            <div>Price</div>
                            <div>Quantity</div>
                            <div>Total Price</div>
                        </div>
                        {Object.values(productCounts).map(({ product, count }) => (
                            <div key={product.id} className="body">
                                <div className="image">
                                    <img src={product.link} className="imagePayment" />
                                </div>
                                <p>{product.name}</p>
                                <p>{product.price}€</p>
                                <p>{count}</p>
                                <p>{product.price * count}€</p>
                            </div>
                        ))}
                        <h2 className="float-end">Total: {carts.reduce((acc, cart) => acc + cart.price, 0)}€</h2>
                    </div>
                    Stripe

                </div>
            </div>
        </div>
    );
};

export default Payment;
