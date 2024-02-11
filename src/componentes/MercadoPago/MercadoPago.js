import React from 'react'
import axios from 'axios'
import { Wallet } from '@mercadopago/sdk-react'
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { FadeLoader } from "react-spinners";

initMercadoPago(process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY, {
    locale: 'es-AR'
});

const MercadoPagoButton = ({ nombreDestinatario, apellidoDestinatario, phoneDestinatario, mailComprador,
    localidad, precioLocalidad, calle, altura, piso, dedicatoria, nombreComprador, phoneComprador, apellidoComprador, fechaEnvio,
    horarioEnvio, servicioPremium, envioPremium, finalPrice, title, description, picture_url, category_id,
    quantity, id, size, products }) => {

    const { CartID, UserID, } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);

    const items = products.map((prod) => ({
        id: prod.item.id,
        title: prod.name,
        description: prod.item.descr,
        quantity: quantity,
        unit_price: Number(prod.item.precio), // Aquí se establece el precio individual de cada producto
    }));

    const settings = {
        texts: {
            action: 'pay',
            valueProp: 'smart_option',
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


    const onSubmit = async (formData) => {
        console.log("Form data: ", formData)
        console.log("items", items)

        console.log("products", products)
        setIsLoading(true)
        const bodyMP = {
            products: products,
            item: items,
            CartID: CartID,
            datosComprador: [
                {
                    UserID: UserID,
                    nombreComprador: nombreComprador,
                    apellidoComprador: apellidoComprador,
                    email: mailComprador,
                    tel_comprador: phoneComprador,
                },
            ],
            datosEnvio: [
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
                    products: items, // Usar la nueva estructura con los precios individuales
                    totalPrice: finalPrice,
                    servicioPremium: servicioPremium,
                    envioPremium: envioPremium,
                },
            ],
            purpose: 'wallet_purchase',
        };

        try {
            const response = await axios.post('http://localhost:8080/mercadopago/payment',
                // const response = await axios.post('https://envioflores-backend.vercel.app/mercadopago/payment',
                bodyMP,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Si necesitas redireccionar al usuario a una URL proporcionada por Mercado Pago,
            // puedes hacerlo aquí:
            return response.data.preferenceId
        } catch (error) {
            console.log('Error:', error);
            // Aquí puedes manejar el error, si es necesario.
        }
    };

    const onError = async (error) => {
        // callback llamado para todos los casos de error de Brick
        console.log("Hubo un error al ejecutar el servicio de Mercado Pago", error);
    };

    return (
        <div>

            {isLoading && (
                <div className="spinner-container">
                    <p className="loadMP">Cargando...</p>
                    <FadeLoader loading={isLoading} className="fadeLoader" color="#009ee3" />
                </div>
            )}


            <Wallet
                initialization={{ redirectMode: "modal" }}
                customization={settings}
                onSubmit={onSubmit}
                onReady={() => setIsLoading(false)} // <-- Desactivar el spinner cuando Brick esté listo
                onError={onError}
            />
        </div>
    )
};

export default MercadoPagoButton;