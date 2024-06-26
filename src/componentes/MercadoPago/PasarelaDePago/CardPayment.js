/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';

import { FadeLoader } from "react-spinners";
import React from 'react';

initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, {
  locale: 'es-AR'
});

const CardPaymentMP = ({ nombreDestinatario, apellidoDestinatario, phoneDestinatario, mailComprador,
  localidad, precioLocalidad, calle, altura, piso, dedicatoria, nombreComprador, phoneComprador, apellidoComprador, fechaEnvio,
  horarioEnvio, servicioPremium, envioPremium, finalPrice, title, description, picture_url, category_id,
  quantity, id, size, products }) => {

  const { CartID, UserID, } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [processingMessage, setProcessingMessage] = useState('Procesando el pago, por favor espere...');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessingBackend, setIsProcessingBackend] = useState(false);


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
          textPrimaryColor: "gold",
          textSecondaryColor: "#ac930a",
          inputBackgroundColor: "#5f5f5fc7", // Gris claro
          formBackgroundColor: "black", // 
          baseColor: "#bd9f00 ", // Rojo oscuro
          baseColorFirstVariant: "black", // Rojo oscuro
          baseColorSecondVariant: "gold", // Verde oscuro
          successColor: "gold", // Verde oscuro
          outlinePrimaryColor: "black",
          formPadding: "",
          errorColor: "red", // Rojo
          inputFocusedBorderWidth: "1px solid gold", // Verde oscuro cuando enfocado
          inputFocusedBoxShadow: "0 0 5px gold", // Sombra verde oscuro cuando enfocado
          inputErrorFocusedBoxShadow: "0 0 5px darkred", // Sombra roja cuando hay un error
          
        }
      }
    },
    paymentMethods: {
      maxInstallments: 1,
    }
  }


  // Obtener el precio total de tu envío
  let shippingCost;
  let shippingTitle
  if (servicioPremium) {
    shippingCost = precioLocalidad + envioPremium; // Asume que tienes un campo llamado "shippingCost" en datosEnvio
    shippingTitle = `Producto: ${title} + Servicio Premium`;
  } else {
    shippingTitle = `Producto: ${title} + Costo de Envío`;
    shippingCost = precioLocalidad; // Asume que tienes un campo llamado "shippingCost" en datosEnvio
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
          <FadeLoader loading={isLoading} className="fadeLoader" color="gold" />
        </div>
      )}

      {isProcessingBackend && (
        <div className="spinner-container">
          <p className="loadMP">{processingMessage}</p>
          <FadeLoader loading={isProcessingBackend} className="fadeLoader" color="gold" />
        </div>
      )}


      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {errorMessage}
        </div>
      )}

      {!isProcessingBackend && (
        <div id="walletBrick_container">
          <CardPayment
            customization={customization}
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
          />
        </div>
      )}

    </div>
  );
};

export default CardPaymentMP;