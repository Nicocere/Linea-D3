import { CartContext } from '../../context/CartContext';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);


const Cart = () => {

    const { cart, setCart, clearCart, eliminarProd, totalPrecio, priceDolar, dolar } = useContext(CartContext);
    const total = totalPrecio();

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
                cancelButtonText: 'Cancelar'
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

    let itemSelected = cart ?.map((item) => {
        return { ...item }
    });


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const pagoExitoso = queryParams.get('PagoExistoso');
    const paymentID = queryParams.get('Payment-ID');
    const pagoPaypalExitoso = queryParams.get('PagoPayPalExistoso');

    if (pagoExitoso === 'true' || pagoPaypalExitoso === 'true') {
        <>
            <h2 className='compraFinalizada'>Gracias por comprar en Envio Flores. </h2>
            <h2 className='compraFinalizada'>Tu ID de tu compra es:</h2>
            <h1 className='idCompra'> {paymentID} </h1>
            <h4 className='compraFinalizada'>
                Puedes ir al <Link to="/" className='cart-home'>Inicio</Link>{' '} para seguir viendo otros productos </h4>
        </>
    }
    console.log(itemSelected)

    return (
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
                                                itemSelected ?.map((prod, indx) => {
                                                    const prodPrecioUsd = (prod.precio / dolar).toFixed(2);
                                                    return (
                                                        <tr className='table-info' key={indx}>
                                                            <td><img className='imgInCart' src={prod.item.imagen} alt="imagen producto en carrito" /></td>
                                                            <td className='detailsInCart'>{prod.name}</td>
                                                            <td className='detailsInCart'>{prod.quantity}</td>
                                                            <td className='detailsInCart'>{prod.size}</td>
                                                            <td className='detailsInCart'>
                                                                {priceDolar ? `USD$${prodPrecioUsd}` : `$${prod.precio.toLocaleString('es-AR')}`}
                                                            </td>
                                                            <td>
                                                                <button className='btn-eliminarProd'
                                                                    onClick={() => eliminarProd(prod._id,
                                                                        prod.size,
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

                                    {
                                        priceDolar ?
                                            <h3 className='totalPrecio'> USD${total}</h3>
                                            :
                                            <h3 className='totalPrecio'> ${total.toLocaleString('es-AR')}</h3>
                                    }

                                    <div className='formulario'>
                                        <h3 className='form-title'>Ingrese los datos de envío para confirmar la entrega.</h3>
                                        <Form
                                            itemSelected={itemSelected}
                                            idCompra={paymentID}
                                            clearCart={clearCart}
                                        // preferenceId={preferenceId}
                                        />


                                    </div>
                                </>
                            )
                    )
            }
        </div>
    );

};
export default Cart;


// <h2 className='tituloProducto'>ESTOS SON LOS PRODUCTOS QUE SELECCIONO</h2>
// {
//     itemSelected?.map((prod, indx) =>
//     {
//         const prodPrecioUsd = (prod.precio / dolar ).toFixed(2)
//         return (

//             <div className='prodInCart' key={indx}>

//             <img className='imgInCart' src={prod.img} alt="imagen producto en carrito" />

//             <div className='divCart'>
//                 <h4 className='detailsInCart'> {prod.name}</h4>
//             </div>

//             <div className='divCart'>
//                 <p className='detailsInCart'>Cantidad:{prod.quantity}</p>

//             </div>
//             {/* <div className='divCart'>
//             <p className='detailsInCart'>Color: {prod.color}</p>

//         </div> */}

//             <div className='divCart'>
//                 <p className='detailsInCart'>Tamaño: {prod.size}</p>
//             </div>

//             {
//       priceDolar ?    <p className='detailsInCart'>Precio: USD${prodPrecioUsd}</p>
//      : <div className='divCart'>
//       <p className='detailsInCart'>Precio: ${prod.precio.toLocaleString('es-AR')}</p>
//   </div>
//     }


//             <button className='btn-eliminarProd' onClick={() => eliminarProd(prod._id)}>
//                 <FaTrashAlt className='icon-eliminarProd' /> Eliminar
//             </button>
//         </div>
//     )
// }
//     )
// }

// <button className='btn-clear' onClick={deleteAll}>Eliminar Todo</button>