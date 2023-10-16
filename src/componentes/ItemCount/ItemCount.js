// import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const ItemCount = ({ idProd, optionId, optionSize, optionPrecio, item, nameOptionalSize, quantity, stock, initial = 1 }) => {

  const [count, setCount] = useState(initial);
  const { cart, setCart, priceDolar,dolar, CartID, UserID } = useContext(CartContext);

  const agregarAlCarrito = async () => {
    try {

      // Guardar datos de la compra del producto en el front local storage para reducir las
      // peticiones . 

        // Guardar producto en el estado y localStorage
        const newProduct = {
          _id: item._id,
          idOption: optionId,
          size: optionSize,
          precio: optionPrecio,
          name: nameOptionalSize || item.nombre ,
          img: item.img,
          item: item,
          quantity: count,
          CartID: CartID,
          UserID: UserID
      };
        // Verifica si el producto ya está en el carrito y si el tamaño es el mismo
        const existingProductIndex = cart.findIndex((product) => 
            product._id.toString() === newProduct._id.toString() && 
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

      // setCart(result.data.cart.products)

      const priceInUsd = (optionPrecio / dolar ).toFixed(2)
      const displayPrice = priceDolar ? `USD$${priceInUsd}` : `$${optionPrecio.toLocaleString('es-AR')}`;

      // SweetAlert2
      MySwal.fire({
        toast: true, // Activamos el modo "toast"
        title: `<strong>Producto Agregado</strong>`,
        text: `${nameOptionalSize || item.nombre} (${optionSize}) - ${displayPrice}`, // Aquí agregamos el nombre, tamaño y precio
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

  useEffect(() => {
    setCount(initial);
  }, [initial]);

  return (
    <div className='btnAgregarQuitar'>
      <button onClick={agregarAlCarrito} className="agregarAlCarrito"> Agregar al carrito</button>
    </div>
  );
}

export default ItemCount;
