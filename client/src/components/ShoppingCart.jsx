import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { createPayment, isAuthenticated } from "./redux/actions";

const ShoppingCart = () => {
  const { cartItems, addItemToCart, deleteItemToCart, deleteItemTotal } = useContext(CartContext);
  const price = cartItems.reduce((a, b) => a + b.price * b.amount, 0)
  const user = isAuthenticated();
  return (
    <div>
      <h1>CART:</h1>
      {cartItems.length ? <button onClick={() => (localStorage.removeItem("shoppingCart"), window.location.reload())}>Delete cart</button> : null}
      {cartItems.length ? cartItems.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
            <img src={item.image} alt='Not found' />
            <p>Price: ${item.price}</p>
            <p>Amount disponibility: {item.quantity}</p>
            <button onClick={() => addItemToCart(item)} disabled={item.quantity === item.amount}>+</button>
            <button onClick={() => deleteItemToCart(item)}>-</button>
            <p>Amount: {item.amount}</p>
            <button onClick={() => deleteItemTotal(item)}>Delete item</button>
          </div>
        )
      }
      ) : <p>Cart empty</p>}
      <p>Total: ${cartItems.reduce((a, b) => a + b.price * b.amount, 0)}</p>
      <button onClick={() => {
        createPayment({ cartItems: cartItems, price: price, productId: cartItems.map(item => item.id), userId: user.usuario.id })
        localStorage.removeItem("shoppingCart");
      }
      }>Buy</button>
    </div>
  )
}

export default ShoppingCart;