import React from 'react'
import axios from 'axios'
import { Wallet } from '@mercadopago/sdk-react'
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { FadeLoader } from "react-spinners";
import { CardPayment } from '@mercadopago/sdk-react';
import { Button } from '@mui/material';

initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, {
    locale: 'es-AR'
});

const MercadoPagoButton = ({ nombreDestinatario, apellidoDestinatario, phoneDestinatario, mailComprador,
    localidad, precioLocalidad, calle, altura, piso, dedicatoria, nombreComprador, phoneComprador, apellidoComprador, fechaEnvio,
    horarioEnvio, servicioPremium, envioPremium, finalPrice, title, description, picture_url, category_id,
    quantity, id, size, products , retiraEnLocal}) => {

      console.log("productos", products)
      console.log("finalPrice", finalPrice)

  const { CartID, UserID, } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [processingMessage, setProcessingMessage] = useState('Procesando el pago, por favor espere...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingBackend, setIsProcessingBackend] = useState(false);
  const [showWallet, setShowWallet] = useState(true);


  const items = products.map((prod) => ({
    
    id: prod.id,
    title: prod.name,
    description: prod.descr,
    quantity: quantity,
    unit_price: Number(prod.precio), // Aquí se establece el precio individual de cada producto
  }));

  const initialization = {
    amount: finalPrice,
    payer: {
      email: mailComprador,
    },
    installments: 1,  // Puedes ajustar esto según tus necesidades

  }

  const customization = {
    visual: {
      style: {
        customVariables: {
          textPrimaryColor: "#000000",  // Negro
          textSecondaryColor: "black",  // 
          inputBackgroundColor: "#e9e9e9c7",  // Gris claro
          formBackgroundColor: "white",  // Rosa claro
          baseColor: "grey",  // Rosa oscuro
          baseColorFirstVariant: "black",
          baseColorSecondVariant: "#1b1b1b",
          successColor: "darkorange",
          outlinePrimaryColor: "black",
          formPadding: '',
          errorColor: "red",  // 0Rojo
          inputFocusedBorderWidth: "1px solid orange",  // Verde oscuro cuando enfocado
          inputFocusedBoxShadow: "0 0 5px darkorange",  // Sombra verde oscuro cuando enfocado
          inputErrorFocusedBoxShadow: "0 0 5px red",  // Sombra roja cuando hay un error
        }
      }
    },
    paymentMethods: {
      maxInstallments: 1,
    }
  }


    const settings = {
        texts: {
            action: 'pay',
            valueProp: 'security_safety',
        },
        visual: {
            hideValueProp: false,
            buttonBackground: 'black', // default, black, blue, white
            valuePropColor: 'grey', // grey, white
            buttonHeight: '48px', // min 48px - max free
            borderRadius: '6px',
            verticalPadding: '16px', // min 16px - max free
            horizontalPadding: '0px', // min 0px - max free
        },
        checkout: {
            theme: {
                elementsColor: '#4287F5', // color hex code
                headerColor: '#4287F5', // color hex code
            },
        }
    }


  // Obtener el precio total de tu envío
  let shippingCost;
  let shippingTitle
  if (servicioPremium) {
    shippingCost = precioLocalidad + envioPremium; // Asume que tienes un campo llamado "shippingCost" en datosEnvio
    shippingTitle = `Producto: ${title} + Servicio Premium`;
  } else if (!servicioPremium || precioLocalidad) {
    shippingTitle = `Producto: ${title} + Costo de Envío`;
    shippingCost = precioLocalidad; // Asume que tienes un campo llamado "shippingCost" en datosEnvio
  } else if ( retiraEnLocal) {
    shippingCost= 0
    shippingTitle = `Producto: ${title} Sin costo de Envío`;

  }

  // Añadir el costo de envío como un ítem adicional
  const shippingItem = {
    id: 'ShippingCost', // ID que identifique el costo de envío
    title: title,
    quantity: 1,
    unit_price: Number(shippingCost),
  };

  // Definir onSubmit aquí fuera de useEffect
  const onSubmit = async (formData) => {
    setIsLoading(true);
    setIsProcessingBackend(true);
    setProcessingMessage('Procesando el pago, por favor espere...');

    const bodyMP = {
      products: products,
      item: items,
      CartID: CartID,
      datosComprador:
      {
        UserID: UserID,
        nombreComprador: nombreComprador,
        apellidoComprador: apellidoComprador,
        email: mailComprador,
        tel_comprador: phoneComprador,
      },

      datosEnvio:
      {
        nombreDestinatario: nombreDestinatario,
        apellidoDestinatario: apellidoDestinatario,
        phoneDestinatario: phoneDestinatario,
        fecha: fechaEnvio,
        horario: horarioEnvio,
        localidad: localidad,
        precio_envio: precioLocalidad,
        calle: calle,
        altura: altura,
        piso: piso,
        dedicatoria: dedicatoria,
        imagenProd: picture_url,
        products: items,
        totalPrice: finalPrice,
        servicioPremium: servicioPremium,
        envioPremium: envioPremium,
      },
      mp_data: {
        data: {
          ...formData,
          description: shippingTitle
        }
      }

    };


    try {

      const response = await axios.post('https://envio-flores.rj.r.appspot.com/mercadopago/process_payment',
        // const response = await axios.post('http://localhost:8080/mercadopago/process_payment',
        bodyMP,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setIsProcessingBackend(false); // Deja de mostrar el mensaje de procesamiento
      // Verifica si la respuesta tiene la propiedad 'redirectURL'
      if (response.data.status === 'approved') {
        // Elimina el carrito del localStorage si la compra es aprobada
        localStorage.removeItem('cart');
        
        // Redirige al usuario a la URL proporcionada por la API
        window.location.href = response.data.pagoExitoso;
      } else {
        console.error('La respuesta de la API no contiene la URL de redirección esperada.');
        setErrorMessage('Hubo un error al procesar la compra, inténtelo de nuevo.');
      }
    } catch (error) {
      setIsProcessingBackend(false); // Deja de mostrar el mensaje de procesamiento
      console.log('Error:', error);
      setErrorMessage('Hubo un error al procesar la compra, inténtelo de nuevo.');
    } finally {
      setIsLoading(false); // Independientemente del resultado, deja de mostrar el spinner de carga inicial
    }
  };


  const onError = async (error) => {
    console.log('Hubo un error al procesar la compra',error);
    window.cardPaymentBrickController.unmount()
    setErrorMessage('Hubo un error al procesar la compra, inténtelo de nuevo.');
  };

  const onReady = async () => {
    setIsLoading(false)
  };


  return (
    <div>
      {isLoading && (
        <div className="spinner-container">
          <p className="loadMP">Cargando...</p>
          <FadeLoader loading={isLoading} className="fadeLoader" color="#009ee3" />
        </div>
      )}

      {isProcessingBackend && (
        <div className="spinner-container">
          <p className="loadMP">{processingMessage}</p>
          <FadeLoader loading={isProcessingBackend} className="fadeLoader" color="#009ee3" />
        </div>
      )}


      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </div>
      )}

{ !isProcessingBackend && (
        <div>
          {showWallet && (
             <Wallet
                 initialization={{ redirectMode: "modal" }}
                 customization={settings}
                 onSubmit={onSubmit}
                 onReady={() => setIsLoading(false)} // <-- Desactivar el spinner cuando Brick esté listo
                 onError={onError}
             />
          )}

          {!showWallet && (
          <CardPayment
          customization={customization}
          initialization={initialization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
          )}

          <Button size='small' variant='outlined' color='warning' sx={{'&:hover':{background:'linear-gradient(to left, orange, darkorange)', color:'white'}}} onClick={() => setShowWallet(!showWallet)}>
            {!showWallet ? 'Pagar con Cuenta en Mercado Pago' : 'Pagar con Tarjeta Credito/Debito'}
          </Button>
        </div>
      )}

    </div>
  );
};
//     const { CartID, UserID, } = useContext(CartContext);
//     const [isLoading, setIsLoading] = useState(true);


//     console.log(" retiraEnLocal", retiraEnLocal)


//     const items = products.map((prod) => ({
//         id: prod.item.id,
//         title: prod.name,
//         description: prod.item.descr,
//         quantity: quantity,
//         unit_price: Number(prod.item.precio), // Aquí se establece el precio individual de cada producto
//     }));

//     const settings = {
//         texts: {
//             action: 'pay',
//             valueProp: 'security_safety',
//         },
//         visual: {
//             hideValueProp: false,
//             buttonBackground: 'black', // default, black, blue, white
//             valuePropColor: 'grey', // grey, white
//             buttonHeight: '48px', // min 48px - max free
//             borderRadius: '6px',
//             verticalPadding: '16px', // min 16px - max free
//             horizontalPadding: '0px', // min 0px - max free
//         },
//         checkout: {
//             theme: {
//                 elementsColor: '#4287F5', // color hex code
//                 headerColor: '#4287F5', // color hex code
//             },
//         }
//     }


//     const onSubmit = async (formData) => {
//         console.log("Form data: ", formData)
//         console.log("items", items)

//         console.log("products", products)
//         setIsLoading(true)
//         const bodyMP = {
//             products: products,
//             item: items,
//             CartID: CartID,
//             datosComprador: [
//                 {
//                     UserID: UserID,
//                     nombreComprador: nombreComprador,
//                     apellidoComprador: apellidoComprador,
//                     email: mailComprador,
//                     tel_comprador: phoneComprador,
//                 },
//             ],
//             datosEnvio: [
//                 {
//                     nombreDestinatario: nombreDestinatario,
//                     apellidoDestinatario: apellidoDestinatario,
//                     phoneDestinatario: phoneDestinatario,
//                     fecha: fechaEnvio,
//                     horario: horarioEnvio,
//                     localidad: localidad,
//                     precio_envio: precioLocalidad,
//                     calle: calle,
//                     altura: altura,
//                     piso: piso,
//                     dedicatoria: dedicatoria,
//                     imagenProd: picture_url,
//                     products: items, // Usar la nueva estructura con los precios individuales
//                     totalPrice: finalPrice,
//                     servicioPremium: servicioPremium,
//                     envioPremium: envioPremium,
//                 },
//             ],
//             purpose: 'wallet_purchase',
//         };

//         try {
//             const response = await axios.post('http://localhost:8080/mercadopago/payment',
//                 // const response = await axios.post('https://envioflores-backend.vercel.app/mercadopago/payment',
//                 bodyMP,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );
//             // Si necesitas redireccionar al usuario a una URL proporcionada por Mercado Pago,
//             // puedes hacerlo aquí:
//             return response.data.preferenceId
//         } catch (error) {
//             console.log('Error:', error);
//             // Aquí puedes manejar el error, si es necesario.
//         }
//     };

//     const onError = async (error) => {
//         // callback llamado para todos los casos de error de Brick
//         console.log("Hubo un error al ejecutar el servicio de Mercado Pago", error);
//     };

//     return (
//         <div>

//             {isLoading && (
//                 <div className="spinner-container">
//                     <p className="loadMP">Cargando...</p>
//                     <FadeLoader loading={isLoading} className="fadeLoader" color="#009ee3" />
//                 </div>
//             )}


//             <Wallet
//                 initialization={{ redirectMode: "modal" }}
//                 customization={settings}
//                 onSubmit={onSubmit}
//                 onReady={() => setIsLoading(false)} // <-- Desactivar el spinner cuando Brick esté listo
//                 onError={onError}
//             />
//         </div>
//     )
// };

export default MercadoPagoButton;