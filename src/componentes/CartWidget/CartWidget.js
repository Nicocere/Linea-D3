import React, { useContext } from 'react'
import { CartContext } from '../../context/CartContext';
import {RiShoppingCartFill} from 'react-icons/ri'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  const { cart, toggleCart } = useContext(CartContext);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -10,
      top: -3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '9px',
    },
  }));

  return (
    <div className="cart-widget-container" onClick={toggleCart} >
          <IconButton aria-label="cart">
      <StyledBadge  badgeContent={cart ? cart.length : 0} color="warning">
        <ShoppingCartIcon size='large' sx={{color:'white', '&:hover':{color:'black'}}} />
      </StyledBadge>
    </IconButton>
      {/* <img className="cart-icon" src={CartIcon} alt="cart-logo" ></img> */}
      {/* <div className="boton-abrircarrito">
      <span ><RiShoppingCartFill/></span>
        <span className="contadorCarrito"> {} </span>
      </div> */}
    </div>
  )
}

export default CartWidget






