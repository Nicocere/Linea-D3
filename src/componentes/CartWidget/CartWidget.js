import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import {RiShoppingCartFill} from 'react-icons/ri'
const CartWidget = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-widget-container" >
      {/* <img className="cart-icon" src={CartIcon} alt="cart-logo" ></img> */}
      <div className="boton-abrircarrito">
      <span ><RiShoppingCartFill/></span>
        <span className="contadorCarrito"> {cart ? cart.length : 0} </span>
      </div>
    </div>
  )
}

export default CartWidget
