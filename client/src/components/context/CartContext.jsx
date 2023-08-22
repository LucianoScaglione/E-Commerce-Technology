import { useState, useEffect } from 'react'
import { createContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const getItems = localStorage.getItem("shoppingCart");
    if (getItems) {
      return JSON.parse(getItems);
    } else {
      return [];
    }
  });

  const addItemToCart = (product) => {
    const findInCart = cartItems.find(item => item.id === product.id);
    if (findInCart) {
      setCartItems(cartItems.map(itemOfState => {
        if (itemOfState.id === product.id && product.amount < product.quantity) {
          return { ...product, amount: product.amount + 1 };
        } else {
          return itemOfState;
        };
      }));
    } else {
      return setCartItems([...cartItems, { ...product, amount: 1 }]);
    };
  };

  const deleteItemToCart = (product) => {
    const findItem = cartItems.find(item => item.id === product.id);
    if (findItem) {
      if (product.amount === 1) {
        setCartItems(cartItems.filter(item => item.id !== product.id));
      } else {
        setCartItems(cartItems.map(itemOfState => {
          if (itemOfState.id === product.id) {
            return { ...product, amount: product.amount - 1 };
          } else {
            return itemOfState;
          };
        }));
      };
    };
  };

  const deleteItemTotal = (product) => {
    const findItem = cartItems.find(item => item.id === product.id);
    if (findItem) {
      setCartItems(cartItems.filter(item => item.id !== product.id));
    };
  };

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems))
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, deleteItemToCart, deleteItemTotal }}>
      {children}
    </CartContext.Provider>
  )
}
