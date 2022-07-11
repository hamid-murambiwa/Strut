import { createContext } from 'react';

const input = localStorage.getItem('cart');
const data = JSON.parse(input);
export const CartContext = createContext(data === null ? [] : data);
export const ReviewContext = createContext([]);
