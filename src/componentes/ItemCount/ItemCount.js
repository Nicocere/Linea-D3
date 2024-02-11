// import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import "./itemCount.css"
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const MySwal = withReactContent(Swal);

const ItemCount = ({ id, optionId, size, optionPrecio, item, nameOptionalSize, quantity, stock }) => {

  const { cart, setCart, CartID, UserID } = useContext(CartContext);


  const agregarAlCarrito = async () => {
    try {

      // Guardar datos de la compra del producto en el front local storage para reducir las
      // peticiones . 

      // Guardar producto en el estado y localStorage
      const newProduct = {
        _id: id || item.id,
        size: size,
        precio: item.precio,
        name: nameOptionalSize || item.nombre,
        img: item.imagen,
        item: item,
        quantity: quantity ? quantity : 1,
        CartID: CartID,
        UserID: UserID
      };
      // Verifica si el producto ya está en el carrito y si el tamaño es el mismo
      const existingProductIndex = cart.findIndex((product) =>
        product.id === newProduct.id &&
        product.size === newProduct.size
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito y es del mismo tamaño, incrementa su cantidad
        updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += newProduct.quantity;
      } else {
        // Si el producto no está en el carrito o es de un tamaño diferente, lo añade al carrito
        updatedCart = [...cart, newProduct];
      }

      // Actualiza el carrito en el estado y en localStorage
      setCart(updatedCart);
      localStorage.setItem('carrito', JSON.stringify(updatedCart));

      //   setCart(prevCart => {
      //     const updatedCart = [...prevCart, newProduct];
      //     localStorage.setItem('carrito', JSON.stringify(updatedCart));
      //     return updatedCart;
      // });

      // // Guarda el carrito actualizado en localStorage 
      // const updatedCart = [...cart, newProduct];
      // localStorage.setItem('carrito', JSON.stringify(updatedCart));

      // // const result = await axios.post('http://localhost:8080/productos/addToCart', {
      // const result = await axios.post('https://envioflores-backend.vercel.app/productos/addToCart',
      //  {
      //   _id: idProd,
      //   idOption: optionId,
      //   size: optionSize,
      //   price: optionPrecio,
      //   img: item.img,
      //   item: item,
      //   quantity: count,
      //   CartID: CartID,
      //   UserID: UserID
      // });

      // SweetAlert2
      MySwal.fire({
        toast: true, // Activamos el modo "toast"
        title: `<strong>Producto Agregado</strong>`,
        text: `${nameOptionalSize || item.nombre} (${size}) - ${item.precio}`, // Aquí agregamos el nombre, tamaño y precio
        icon: 'success',
        showConfirmButton: false,
        timer: 4000, // Duración de 3 segundos
        position: 'bottom-end', // Posición inferior derecha
        background: '#f9fafb', // Un fondo más claro
        iconColor: '#34c38f', // Color de icono
        customClass: {
          title: 'my-title-class',
          popup: 'my-popup-class',
          content: 'my-content-class',
        }
      });
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className='btnAgregarQuitar'>
      <Button sx={{background:'black', color:'white' , fontSize:'12px', '&:hover':{background:'grey'} }}  
      variant='contained' size='small' onClick={agregarAlCarrito} className="agregarAlCarrito" startIcon={<AddShoppingCartIcon/>}> AGREGAR AL CARRITO</Button>
    </div>
  );
}

export default ItemCount;
