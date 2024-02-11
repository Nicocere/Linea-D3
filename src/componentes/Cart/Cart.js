import { CartContext } from '../../context/CartContext';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AppBar, Avatar, Button, IconButton, SwipeableDrawer, Toolbar, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const MySwal = withReactContent(Swal);


const Cart = () => {

    const { cart, setCart, clearCart, eliminarProd, totalPrecio, priceDolar, dolar, isCartOpen, setIsCartOpen, toggleCart } = useContext(CartContext);
    const total = totalPrecio();
    const isSmallScreen = useMediaQuery('(max-width:750px)');
    const [showForm, setShowForm] = useState(false);

    const deleteAll = () => {
        return (
            MySwal.fire({
                title: 'Quieres eliminar todos los productos?',
                text: "Vaciaras el carrito",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cancelar', 
                zIndex: 1000000
            }).then((result) => {
                if (result.isConfirmed) {
                    setCart([])
                    Swal.fire(
                        'Carrito Vacio!',
                        'Tu carrito ha sido vaciado.',
                        'success'
                    );
                }
            })
        )
    }



    const finishForm = () => {
        setShowForm(!showForm);
    };

    let itemSelected = cart?.map((item) => {
        return { ...item }
    })



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const pagoExitoso = queryParams.get('PagoExistoso');
    const paymentID = queryParams.get('Payment-ID');
    const pagoPaypalExitoso = queryParams.get('PagoPayPalExistoso');

    if (pagoExitoso === 'true' || pagoPaypalExitoso === 'true') {
        return (
            <>
                <h2 className='compraFinalizada'>Gracias por comprar en Envio Flores. </h2>
                <h2 className='compraFinalizada'>Tu ID de tu compra es:</h2>
                <h1 className='idCompra'> {paymentID} </h1>
                <h4 className='compraFinalizada'>
                    Puedes ir al <Link to="/" className='cart-home'>Inicio</Link>{' '} para seguir viendo otros productos </h4>
            </>
        );
    }

    console.log("item selected", itemSelected)

    return (
        <>
            <Typography variant='h6' sx={{ color: 'black' }}>Carrito de Compras</Typography>
            <div className='cart'>
                {
                    pagoExitoso === 'true' || pagoPaypalExitoso === 'true' ? (
                        <>
                            <h2 className='compraFinalizada'>Gracias por comprar en Envio Flores. </h2>
                            <h2 className='compraFinalizada'>Tu ID de tu compra es:</h2>
                            <h1 className='idCompra'> {paymentID} </h1>
                            <h4 className='compraFinalizada'>
                                Puedes ir al <Link to="/" className='cart-home'>Inicio</Link>{' '} para seguir viendo otros productos
                            </h4>
                        </>
                    ) : (
                        cart.length === 0 ? (
                            <>
                                <h1 className='cartVacio'>
                                    El Carrito esta vacío...
                                    Puedes ir al <Link to="/" className='cart-home'>Inicio</Link>{' '}
                                    para buscar y agregar algún producto
                                </h1>
                            </>
                        ) : (

                            isSmallScreen ?
                                (
                                    <>
                                        {/* Carrito de compras */}
                                        <SwipeableDrawer
                                            anchor="right"
                                            open={isCartOpen}
                                            onClose={() => setIsCartOpen(false)}
                                            onOpen={() => setIsCartOpen(true)}
                                            onClick={toggleCart}
                                        >
                                            <Button sx={{ color: 'black', width:'50%' }} startIcon={<ArrowBackIosNewIcon />}>Carrito de compras</Button>
                                            <List>
                                                {itemSelected.map((prod, indx) => (
                                                    <ListItem key={indx}>
                                                        <img className='imgInCart' src={prod.item.imagen} alt="imagen producto en carrito" />
                                                        <ListItemText primary={prod.name} secondary={`Cantidad: ${prod.quantity}, Talle: ${prod.size}`} />
                                                        <ListItemText primary={`Precio: $${prod.item.precio}`} />
                                                        <button className='btn-eliminarProd' onClick={(event) => {eliminarProd(prod._id, prod.size,  prod.quantity); event.stopPropagation();}}>Eliminar</button>
                                                    </ListItem>
                                                ))}
                                            </List>
                                            <Button color='error' size='small' variant='outlined' sx={{ alignSelf: 'center', width:'25%', margin:'15px' }}   onClick={(event) => { deleteAll(); event.stopPropagation(); }}>Eliminar Todo</Button>
                                            <h3 className='totalPrecio'> Precio total: ${total}</h3>

                                            <Button variant="contained" sx={{ background: 'linear-gradient(6deg, #625e5e, black)', width: '50%', alignSelf: 'center' }} onClick={finishForm}>Comprar</Button>
                                        </SwipeableDrawer>

                                        {/* Formulario */}

                                        <SwipeableDrawer
                                            anchor="right"
                                            open={showForm}  // Utiliza showForm para controlar la apertura y cierre del SwipeableDrawer
                                            onClose={() => setShowForm(false)}
                                            onOpen={() => setShowForm(true)}
                                        >
                                            <Button sx={{ color: 'black' ,width:'50%'}} startIcon={<ArrowBackIosNewIcon />} onClick={() => setShowForm(false)}>Volver al Carrito de compras</Button>
                                            <Form
                                                itemSelected={itemSelected}
                                                idCompra={paymentID}
                                                clearCart={clearCart}
                                            />
                                        </SwipeableDrawer>
                                    </>
                                ) :
                                (
                                    <>
                                        <h3 className='tituloProducto'>ESTOS SON LOS PRODUCTOS QUE SELECCIONO</h3>
                                        <table className='table-cart'>
                                            <thead className='table-head'>
                                                <tr className='table-head-tr'>
                                                    <th>Producto</th>
                                                    <th>Nombre</th>
                                                    <th>Cantidad</th>
                                                    <th>Talle</th>
                                                    <th>Precio</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-body'>
                                                {
                                                    itemSelected?.map((prod, indx) => {
                                                        const prodPrecioUsd = (prod.item.precio / dolar).toFixed(2);
                                                        console.log("item", prod)
                                                        return (
                                                            <tr className='table-info' key={indx}>
                                                                <td><img className='imgInCart' src={prod.item.imagen} alt="imagen producto en carrito" /></td>
                                                                <td className='detailsInCart'>{prod.name}</td>
                                                                <td className='detailsInCart'>{prod.quantity}</td>
                                                                <td className='detailsInCart'>{prod.size}</td>
                                                                <td className='detailsInCart'>
                                                                    {priceDolar ? `USD$${prodPrecioUsd}` : `$${prod.item.precio}`}
                                                                </td>
                                                                <td>
                                                                    <button className='btn-eliminarProd'
                                                                        onClick={() => eliminarProd(prod._id,
                                                                            prod.item.size,
                                                                            prod.idOption,
                                                                            prod.quantity,
                                                                        )}>
                                                                        Eliminar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <button className='btn-clear' onClick={deleteAll}>Eliminar Todo</button>
                                        <h3 className='totalPrecio'> ${total}</h3>

                                        <div className='formulario'>
                                            <h3 className='form-title'>Ingrese los datos de envío para confirmar la entrega.</h3>
                                            <Form
                                                itemSelected={itemSelected}
                                                idCompra={paymentID}
                                                clearCart={clearCart}
                                            />
                                        </div>
                                    </>)
                        )
                    )
                }
            </div>
        </>
    );

};
export default Cart;

