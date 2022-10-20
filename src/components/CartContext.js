/* eslint-disable import/prefer-default-export */
import React, { useContext, useState } from 'react';
import { Page } from '../services/tools';

const input = localStorage.getItem('cart');
const data = JSON.parse(input);
export const CartContext = React.createContext();
export const CartContextAdd = React.createContext();
export const CartContextRemove = React.createContext();
export const CartContextIncrement = React.createContext();
export const CartContextDecrement = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function useCartAdd() {
  return useContext(CartContextAdd);
}

export function useCartRemove() {
  return useContext(CartContextRemove);
}

export function useCartIncrement() {
  return useContext(CartContextIncrement);
}

export function useCartDecrement() {
  return useContext(CartContextDecrement);
}

/* eslint-disable */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(data === null ? [] : data);

  function addToCart(item, quantity, setMessage) {
    let value = false;
  
    cart.map((e) => {
      if (e.name === item.name) {
        value = true;
      }
    });
    if (value) {
      cart.map((i, index) => {
        if (i.name === item.name) {
          cart[index].quantity = i.quantity + quantity;
          cart[index].price = quantity === 1 ? i.price + item.price : i.price * quantity;
          setCart(cart);
          const data = JSON.stringify(cart);
          localStorage.setItem('cart', data);
        }
      });
    } else {
      item.quantity = quantity;
      item.price *= quantity;
      console.log(item.price);
      cart.push(item);
      setCart(cart);
      const data = JSON.stringify(cart);
      localStorage.setItem('cart', data);
    }
    setTimeout(() => {
      window.location.href = `/shop/${Page()}`;
    }, 700);
    setMessage('Item added successfully to the cart');
  }

  function removeFromCart(index, setMessage) {
    let newCart = cart;
    newCart.splice(index, 1);
    setCart(newCart);
    const data = JSON.stringify(newCart);
    localStorage.setItem('cart', data);
    setMessage('Item has been removed');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }


 function increment(id) {
    /* eslint-disable */
    cart.map((e, index) => {
      if (e.id === id) {
        cart[index].price = e.price + (e.price / e.quantity);
        cart[index].quantity = e.quantity + 1;
        setCart(cart);
        const data = JSON.stringify(cart);
        localStorage.setItem('cart', data);
      }
    });
    window.location.reload();
  }

  function decrement(id) {
    /* eslint-disable */
    cart.map((e, index) => {
      if (e.id === id && e.quantity > 1) {
        cart[index].price = e.price - (e.price / e.quantity);
        cart[index].quantity = e.quantity - 1;
        setCart(cart);
        const data = JSON.stringify(cart);
        localStorage.setItem('cart', data);
      }
    });
    window.location.reload();
  }

  return (
    <CartContext.Provider value={cart}>
      <CartContextAdd.Provider value={addToCart}>
        <CartContextRemove.Provider value={removeFromCart}>
            <CartContextIncrement.Provider value={increment}>
                <CartContextDecrement.Provider value={decrement}>
                    {children}
                </CartContextDecrement.Provider>
            </CartContextIncrement.Provider>
        </CartContextRemove.Provider>
      </CartContextAdd.Provider>
    </CartContext.Provider>
  );
};
