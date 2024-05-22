'use client'
import React, { Fragment, useEffect, useState } from "react";

import { Cart } from "@prisma/client";
import Payment from "../payment/page";

export default function CartComponent() {
  const [carts, setCart] = useState<Cart[]>([]);
  const [productCounts, setProductCounts] = useState<{ [name: string]: { product: Cart, count: number } }>({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch('/api/getcart');
        if (response.ok) {
          const cartProducts = await response.json();
          setCart(cartProducts);
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
    const counts: { [name: string]: { product: Cart, count: number } } = {};
    carts.forEach(cart => {
      if (counts[cart.name]) {
        counts[cart.name].count += 1;
      } else {
        counts[cart.name] = { product: cart, count: 1 };
      }
    });
    setProductCounts(counts);
  }, [carts]);

  const handleBuyClick = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <Fragment>
      {isPaymentModalOpen && <Payment isVisible={true} onClose={() => setIsPaymentModalOpen(false)} />}
      <div className="container">
        <div className="px-5 pt-1 pb-5 ">
          <button className='w-[100px] bg-blue-600 rounded float-end' onClick={handleBuyClick}>Buy</button>
        </div>
        <>
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
                <img src={product.link} className="images" />
              </div>
              <p>{product.name}</p>
              <p>{product.price}€</p>
              <p>{count}</p>
              <p>{product.price * count}€</p>
            </div>
          ))}
          <h2>Total: {carts.reduce((acc, cart) => acc + cart.price, 0)}€</h2>
        </>
      </div>
    </Fragment>
  );
}
