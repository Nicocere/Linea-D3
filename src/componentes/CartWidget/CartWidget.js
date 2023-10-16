import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-widget-container" >
      <img src={'../assets/cart.png'} alt="cart-logo" ></img>
      <div className="boton-abrircarrito">
        <span className="contadorCarrito"> {cart ? cart.length : 0} </span>
      </div>
    </div>
  )
}

export default CartWidget
