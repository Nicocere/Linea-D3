import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export const CartContext = createContext();

const CartProvider = ({ children }) => {

    // Primero, verificamos si ya existen los IDs en localStorage
    const cartLocalStorage = localStorage.getItem('carrito', [])

    //Precio Rosas
    const rose_unit = 2299
    //Precio Del Dolar
    const dolar = 367
    const [priceDolar, setPriceDolar] = useState(false)
    //Productos y Carrito
    const [cart, setCart] = useState(JSON.parse(cartLocalStorage) || []);

    const [finalPrice, setFinalPrice] = useState(0)
    // const [cartVinculed, setCartVinculed] = useState({})
    const [locationValue, setLocationValue] = useState(0)
    const [location, setLocation] = useState({})
    const [locationName, setLocationName] = useState("")

  // Cookies
  const [CartID, setCartID] = useState(sessionStorage.getItem("CartID") || null);
  const [UserID, setUserID] = useState(sessionStorage.getItem("UserID") || null);

    let CartIDStorage = localStorage.getItem("CartID", CartID);
    let UserStorage = localStorage.getItem("UserID", UserID);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const totalPrecio = () => {
        let acumulador = 0;
        let acumuladorInUsd = 0
        cart?.forEach((prod) => {
            const precioInUsd = (prod.item.precio / dolar).toFixed(2)

            acumulador += prod.quantity * prod.item.precio
            acumuladorInUsd += prod.quantity * precioInUsd
        })

        if (priceDolar) {
            setFinalPrice(Number(acumuladorInUsd))
            return Number(acumuladorInUsd)
        } else {
            setFinalPrice(Number(acumulador))
            return Number(acumulador) //.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

        }
    };

    // Precio Final
    const totalPriceLocation = (total) => {
        setFinalPrice(total)
    }

    const eliminarProd = async (_id, name, precio, size, quantity) => {
        try {
            const productIndex = cart.findIndex(prod => (prod.precio === precio) && (prod.size === size) && prod.id === _id);

            console.log("product index", productIndex)
            if (productIndex !== -1) {
                if (cart[productIndex].quantity > 1) {
                    // Pregunta al usuario cuánta cantidad desea eliminar
                    const { value: quantityToRemove } = await Swal.fire({
                        title: 'Cantidad a eliminar',
                        input: 'number',
                        inputLabel: 'Ingrese la cantidad que desea eliminar',
                        inputValue: 1,
                        inputValidator: (value) => {
                            if (parseInt(value) <= 0 || parseInt(value) > cart[productIndex].quantity) {
                                return 'Ingrese una cantidad válida!'
                            }
                        }
                    });

                     // If the user cancels, do nothing
                     if (!quantityToRemove) return;

                     // Update the quantity in the cart
                     cart[productIndex].quantity -= parseInt(quantityToRemove);
 
                     // If the remaining quantity is greater than zero, update the cart state
                     if (cart[productIndex].quantity > 0) {
                        console.log("esto pasa")
                         setCart([...cart]);
                     } else {
                         // If the remaining quantity is zero, remove the product from the cart
                         const updatedCart = cart.filter(prod => prod.id !== _id);
                         console.log("esto pasa")

                         setCart(updatedCart);
                     }
                 } else {
                     // If there is only one quantity of the product, remove it from the cart
                     const updatedCart = cart.filter(prod => prod.id !== _id);
                     setCart(updatedCart);
                 }
 
                 // Show a success message
                 Swal.fire({
                     icon: 'warning',
                     title: 'Producto eliminado!',
                     text: 'El producto ha sido eliminado de tu carrito.',
                     toast: true,
                     position: 'bottom-right',
                     showConfirmButton: false,
                     timer: 2100,
                     timerProgressBar: true,
                     background: '#f3f3f3',
                     iconColor: '#a30000'
                 });
             }
         } catch (error) {
             console.log("Ocurrió un error en el Contexto del Cart", error);
         }
     };

     
    const cantidadProducto = (id) => {
        const producto = cart?.find((prod) => prod.id === id);
        return producto?.quantity;
    };

    const clearCart = async () => {
        try {
            // const resultDeleteCart = await axios.delete(`https://envioflores-backend.vercel.app/cart/delete/${cartVinculed._id}`);

            // if (resultDeleteCart.status === 200) {
            //     setCart([]);
            // }
        } catch (error) {
            console.log("Error al borrarse el Carrito", error);
        }
    };


    useEffect(() => {
    
        const fetchData = async () => {
            try {
        
                // Verificar si storedEncryptedCart es una cadena JSON válida antes de intentar analizarla
                // if (!CartID || !UserID) {
                //     console.log("No existe la Cookie, la creo.")
                //     const result = await axios.get('https://envio-flores.rj.r.appspot.com/cookie', {
                //         params: {
                //             CartID: CartID,
                //             UserID: UserID
                //         }
                //     });
        
                //     setUserID(result.data.UserID);
                //     setCartID(result.data.CartID);
                // } else {
                //     console.log('Cookie creada.');
                // }
            } catch (error) {
                console.log("Error al obtener los datos de cookies", error);
            }
        };
        fetchData();
    }, [CartID, UserID]);
    

    useEffect(() => {
        if (UserID) {
            sessionStorage.setItem("UserID", UserID);
        }
        if (CartID) {
            sessionStorage.setItem("CartID", CartID);
        }
    }, [UserID, CartID]);


    useEffect(() => {
        // Guardo los datos de cart en el localStorage cada vez que cart cambie
        localStorage.setItem('carrito', JSON.stringify(cart));
    }, [cart]);



    return (
        <CartContext.Provider
            value={{
                cart,
                cartLocalStorage,
                setCart,
                rose_unit,
                setPriceDolar,
                priceDolar,
                eliminarProd,
                cantidadProducto,
                totalPrecio,
                clearCart,
                setLocationValue,
                locationValue,
                setLocation,
                location,
                setLocationName,
                locationName,
                totalPriceLocation,
                dolar,
                finalPrice,
                isCartOpen,
                setIsCartOpen,
                toggleCart,
                CartID,
                UserID
            }}>

            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
