import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <img src={'../assets/cart.png'} alt="cart-logo" ></img>
      <button className="boton-abrircarrito">
        <span className="contadorCarrito"> {cart ? cart.length : 0} </span>
      </button>
    </div>
  )
}

export default CartWidget
