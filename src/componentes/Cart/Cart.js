import { CartContext } from '../../context/CartContext';
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AppBar, Avatar, Button, Paper, IconButton, SwipeableDrawer, Toolbar, useMediaQuery, List, ListItem, ListItemText } from '@mui/material';
import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MercadoPagoButton from '../MercadoPago/MercadoPago'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors'; // Importa el color verde de Material UI
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';
import CardPaymentMP from '../MercadoPago/PasarelaDePago/CardPayment';

const MySwal = withReactContent(Swal);

const Cart = () => {

    const { cart, finalPrice, setCart, clearCart, eliminarProd, totalPrecio, priceDolar, dolar, isCartOpen, setIsCartOpen, toggleCart } = useContext(CartContext);
    const total = totalPrecio();
    const isSmallScreen = useMediaQuery('(max-width:750px)');
    const [showForm, setShowForm] = useState(false);
    const [retiraEnLocal, setRetiraEnLocal] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [selectRetirarEnLocal, setSelectRetirarEnLocal] = useState(false)
    const [showMercadoPago, setShowMercadoPago] = useState(true);
    const [showCardPayment, setShowCardPayment] = useState(false);

    const handleMercadoPagoClick = () => {
        setShowMercadoPago(true);
        setShowCardPayment(false);
    };

    const handleCardPaymentClick = () => {
        setShowMercadoPago(false);
        setShowCardPayment(true);
    };


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



    const handleChangeForm = () => {
        console.log("show form", showForm)
        setShowForm(!showForm);
        if (showForm) {
            setShowPayments(false)
            setSelectRetirarEnLocal(false)
            setRetiraEnLocal(false);
        }
    };

    const handleChangeRetirarProducto = () => {
        console.log(" retira en local", retiraEnLocal)
        setRetiraEnLocal(!retiraEnLocal);
    };

    const handleFinishPayment = () => {
        setShowPayments(!showPayments)
        setSelectRetirarEnLocal(!selectRetirarEnLocal)
    }

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


    return (
        <>
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
                                        {
                                            !showForm &&
                                            <>
                                                <Typography variant='h6' sx={{ color: 'black', alignText: 'center' }}>Carrito de Compras</Typography>
                                                <List>
                                                    {itemSelected.map((prod, indx) => (
                                                        <ListItem key={indx} sx={{ paddingLeft: '5px', borderBottom: '1px solid silver' }} >
                                                            <img style={{ marginRight: '10px' }} className='imgInCart' src={prod.item.imagen} alt="imagen producto en carrito" />
                                                            <ListItemText sx={{ flex: '2' }} primary={prod.name} secondary={`Cantidad: ${prod.quantity}, Talle: ${prod.size}`} />
                                                            <ListItemText sx={{ flex: '1' }} primary={`Precio: $${prod.item.precio}`} />
                                                            <button className='btn-eliminarProd' onClick={(event) => { eliminarProd(prod.id, prod.name, prod.item.precio, prod.size, prod.quantity); event.stopPropagation(); }}>Eliminar</button>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                                <Button color='error' size='small' variant='outlined' sx={{ alignSelf: 'center', width: 'fit-content', margin: '15px' }} onClick={(event) => { deleteAll(); event.stopPropagation(); }}>Eliminar Todo</Button>
                                                <h3 className='totalPrecio'> Precio total: ${total}</h3>


                                                <Button variant="contained" sx={{ background: 'linear-gradient(6deg, #625e5e, black)', width: 'fit-content', alignSelf: 'center', margin: '10px' }} onClick={handleChangeForm}>Comprar
                                                </Button>
                                            </>
                                        }

                                        {/* Formulario */}
                                        {
                                            showForm &&
                                            <>
                                                <Button variant="contained" sx={{ background: 'linear-gradient(6deg, #625e5e, black)', width: 'fit-content', alignSelf: 'center', margin: '10px' }} onClick={handleChangeForm}>Volver al Carrito </Button>


                                                <Paper elevation={24}>
                                                    {
                                                        !retiraEnLocal ?

                                                            (
                                                                <>
                                                                    <Paper elevation={24} sx={{ color: 'white', background: 'linear-gradient(to right, rgb(15, 15, 15), black)' }}>
                                                                        <List>
                                                                            {/* {itemSelected.map((prod, indx) => (
                                                    <ListItem key={indx}>
                                                <img className='imgInCart' src={prod.item.imagen} alt="imagen producto en carrito" /> */}
                                                                            <ListItemText sx={{ color: 'white' }} primary={`${showPayments ? `Selecciono Retirar en Local`
                                                                                : 'Retira en Local'}`}

                                                                                secondary={<p style={{ color: 'gold' }}>Cesar Diaz 1234 (Imperio Juniors)</p>} />
                                                                            {
                                                                                showPayments && <CheckCircleIcon sx={{ color: 'gold' }} />
                                                                            }
                                                                            {
                                                                                showPayments ? null :
                                                                                    <Button variant='contained' sx={{ color: 'black', background: 'gold' }} className='btn-eliminarProd' onClick={handleFinishPayment}>Retirar</Button>
                                                                            }
                                                                            {/* </ListItem> */}
                                                                            {/* ))} */}
                                                                        </List>

                                                                        {
                                                                            showPayments &&
                                                                            <>
                                                                                <h3 className='metodo-pago-title'>Seleccione un metodo de pago</h3>

                                                                                {showMercadoPago && (
                                                                                    <Button size='small' variant='contained' color='error' endIcon={<CreditCardTwoToneIcon />}
                                                                                        sx={{ marginTop: '15px', width: '50%', alignSelf: 'center' }} onClick={handleCardPaymentClick}>Pagar con Tarjeta de Crédito / Débito</Button>
                                                                                )}

                                                                                {showCardPayment && (
                                                                                    <Button size='small' variant='contained' color='error' endIcon={<AccountBoxIcon />}
                                                                                        sx={{ marginTop: '15px', width: '50%', alignSelf: 'center' }} onClick={handleMercadoPagoClick}>Pagar con cuenta en Mercado Pago</Button>
                                                                                )}

                                                                                {showCardPayment && (

                                                                                    <div className='mercadopago-div'>
                                                                                        <h4 className='tarjetas'>Pagar con Tarjeta Nacionales</h4>
                                                                                        <span>Total a pagar: ${finalPrice}</span>
                                                                                        <CardPaymentMP
                                                                                            retiraEnLocal={selectRetirarEnLocal}
                                                                                            total={total}
                                                                                            title={cart[0].name}
                                                                                            description={cart[0].descr}
                                                                                            picture_url={cart[0].img}
                                                                                            category_id={cart[0].tipo}
                                                                                            quantity={cart[0].quantity}
                                                                                            id={cart[0].id}
                                                                                            size={cart[0].size}
                                                                                            products={cart}
                                                                                            finalPrice={finalPrice}
                                                                                        />
                                                                                    </div>
                                                                                )}


                                                                                {showMercadoPago && (
                                                                                    <div className='mercadopago-div'>
                                                                                        <h4 className='tarjetas'>Pagar con Cuenta Mercado Pago</h4>
                                                                                        <span>Total a pagar: ${finalPrice}</span>
                                                                                        <MercadoPagoButton
                                                                                            retiraEnLocal={selectRetirarEnLocal}
                                                                                            total={total}
                                                                                            title={cart[0].name}
                                                                                            description={cart[0].descr}
                                                                                            picture_url={cart[0].img}
                                                                                            category_id={cart[0].tipo}
                                                                                            quantity={cart[0].quantity}
                                                                                            id={cart[0].id}
                                                                                            size={cart[0].size}
                                                                                            products={cart}
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </>

                                                                        }
                                                                    </Paper>
                                                                    <Button variant="contained" sx={{ background: 'linear-gradient(6deg, #625e5e, black)', width: '50%', alignSelf: 'center', margin: '10px' }}
                                                                        onClick={() => { handleChangeRetirarProducto(); }}>Enviar a domicilio </Button>
                                                                </>
                                                            )

                                                            :
                                                            (
                                                                <>
                                                                    <Button variant="outlined" color='error' sx={{ color: 'black', width: 'fit-content', alignSelf: 'center', margin: '10px' }} onClick={handleChangeRetirarProducto}>Retirar en el Local </Button>

                                                                    <Form
                                                                        total={total}
                                                                        itemSelected={itemSelected}
                                                                        idCompra={paymentID}
                                                                        clearCart={clearCart}
                                                                    />
                                                                </>
                                                            )
                                                    }
                                                </Paper>
                                            </>
                                        }

                                        {/* <SwipeableDrawer
                                            anchor="right"
                                            open={showForm}  // Utiliza showForm para controlar la apertura y cierre del SwipeableDrawer
                                            onClose={() => setShowForm(false)}
                                            onOpen={() => setShowForm(true)}
                                        >
                                            <Button sx={{ color: 'black' ,width:'50%'}} startIcon={<ArrowBackIosNewIcon />} onClick={() => setShowForm(false)}>Volver al Carrito de compras</Button>
                                        
                                        </SwipeableDrawer> */}
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
                                                                        onClick={() => eliminarProd(prod.id,
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
                                                total={total}
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

