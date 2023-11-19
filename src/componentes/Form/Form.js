/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../context/CartContext.js';
import MercadoPagoButton from '../MercadoPago/MercadoPago'
import Swal from 'sweetalert2';

const Form = ({ itemSelected }) => {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { finalPrice, locationValue, locationName, location, cart, dolar, priceDolar, setPriceDolar } = useContext(CartContext);
    const [saveDedicatoria, setSaveDedicatoria] = useState('');
    const [locationSelect, setLocationSelect] = useState({});

    const [selectedDate, setSelectedDate] = useState(''); // estado para la fecha seleccionada
    const [selectedTime, setSelectedTime] = useState(''); // estado para el horario seleccionado

    const [confirmationDone, setConfirmationDone] = useState(false);
    const [hasSelectedLocation, setHasSelectedLocation] = useState(false);

    const onSubmit = (data) => {

    };

    const handleChangeDateTime = (e) => {
        e.preventDefault()
        setSelectedDate(e.target.value)
        setSelectedTime(e.target.value)
    }

    const handleChangeBtn = (e) => {
        e.preventDefault();
        setSaveDedicatoria(watch('dedicatoria'));
        reset({ dedicatoria: saveDedicatoria });
    }

    // Verificar si todos los campos requeridos están completos
    const handleConfirmationClick = () => {
        const fieldsFilled = (
            watch('nombreDestinatario')
            // watch('apellidoDestinatario') &&
            // watch('phoneDestinatario') &&
            // watch('calle') &&
            // watch('altura') &&
            // watch('piso') &&
            // watch('nombreComprador') &&
            // watch('telefonoComprador') &&
            // watch('apellidoComprador') &&
            // watch('mailComprador') &&
            // watch('fechaEnvio') &&
            // watch('selectHorario') &&
            // watch('mailComprador') === watch('validateMail')
        );
        if (fieldsFilled && locationSelect) {
            setConfirmationDone(true);
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos y selecciona una localidad antes de confirmar.',
            });
        }
    };

    useEffect(() => {
        if (finalPrice !== 0) {
            setHasSelectedLocation(true);
        } else {
            setHasSelectedLocation(false);
        }
    }, [finalPrice]);

    return (
        <div className=''>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <div className='datos-recibe'>

                    <h3 className='titulo-datosEnvio'>Datos de Contacto</h3>

                    <input
                        {...register("nombreDestinatario", { required: true })}
                        type="text"
                        placeholder="Nombre..."
                        name="nombreDestinatario"
                        className='input-nombreApellido'
                    />
                    {errors.nombreDestinatario && <p className='message-error' >Debe ingresar un Nombre</p>}

                    <input
                        {...register("apellidoDestinatario", { required: true })}
                        type="text"
                        placeholder="Apellido..."
                        name="apellidoDestinatario"
                        className='input-nombreApellido'
                    />
                    {errors.apellidoDestinatario && <p className='message-error' >Debe ingresar un Apellido</p>}

                    <input
                        {...register("phoneDestinatario", { required: true, minLength: 5 })}
                        type="text"
                        placeholder="Telefono..."
                        name="phoneDestinatario"
                        className='input-phone'
                    />
                    {errors.phoneDestinatario && <p className='message-error' >El numero de Telefono no es valido</p>}


                    {errors.locationSelect && <p className='message-error' >Tiene que elegir una LOCALIDAD</p>}

                    <input
                        {...register("calle", { required: true })}
                        type="text"
                        placeholder="Calle..."
                        name="calle"
                        className='input-calle'
                    />
                    {errors.calle && <p className='message-error' >La Calle no es valida</p>}

                    <input
                        {...register("altura", { required: true })}
                        type="text"
                        placeholder="Altura..."
                        name="altura"
                        className='input-altura'
                    />
                    {errors.altura && <p className='message-error' >La Altura no es valida</p>}

                    <input
                        {...register("piso", { required: true })}
                        type="text"
                        placeholder="Piso..."
                        name="piso"
                        className='input-piso'
                    />
                    {errors.piso && <p className='message-error' >El piso no es valida</p>}


                </div>

                {/* <div className='datos-Fecha-Envio'>
                    <h3 className='titulo-datosEnvio'>Fecha y Horario de Envío:</h3> */}

                {/* Selector de Fecha */}
                {/* <label htmlFor="deliveryDate" className='lbl-fecha-envio' >Fecha de entrega:</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        // value={selectedDate}
                        className='input-fecha-envio'
                        onChange={handleChangeDateTime}
                        {...register("fechaEnvio", { required: true })}
                    />
                    {errors.fechaEnvio && <p className='message-error'>Debe seleccionar una fecha</p>} */}

                {/* Selector de Horario */}
                {/* <label htmlFor="deliveryTime" className='lbl-horario-envio'>Horario de entrega:</label>
                    <select
                        id="deliveryTime"
                        name="deliveryTime"
                        // value={selectedTime}
                        className='select-horario-envio'
                        onChange={handleChangeDateTime}
                        {...register("selectHorario", { required: true })}
                    >
                        <option value="">Seleccione un horario</option>
                        <option value="7hs-10hs">Mañana (7hs a 10hs)</option>
                        <option value="9hs-12hs">Mañana (9hs a 12hs)</option>
                        <option value="13hs-16hs">Tarde (13hs a 16hs)</option>
                        <option value="16hs-19hs">Tarde (16hs a 19hs)</option>
                    </select>
                    {errors.selectHorario && <p className='message-error'>Debe seleccionar un horario</p>}
                </div> */}

                <div className='datos-comprador'>

                    <h3 className='titulo-datosEnvio'>Datos de Facturación</h3>

                    <input
                        {...register("nombreComprador", { required: true })}
                        type="text"
                        placeholder="Nombre de comprador..."
                        name="nombreComprador"
                        className='input-nombreApellido'
                    />
                    {errors.nombreComprador && <p className='message-error' >Debe ingresar su Nombre </p>}

                    <input
                        {...register("apellidoComprador", { required: true })}
                        type="text"
                        placeholder="Apellido de comprador..."
                        name="apellidoComprador"
                        className='input-nombreApellido'
                    />
                    {errors.apellidoComprador && <p className='message-error' >Debe ingresar su Apellido</p>}

                    <input
                        {...register("telefonoComprador", { required: true })}
                        type="text"
                        placeholder="Telefono del comprador..."
                        name="telefonoComprador"
                        className='input-nombreApellido'
                    />
                    {errors.telefonoComprador && <p className='message-error' >Debe ingresar su N° de Telefono por
                    si necesitamos comunicarnos con usted </p>}

                    <input
                        {...register("mailComprador", { required: true })}
                        type="email"
                        placeholder="Ingrese su E-mail..."
                        name="mailComprador"
                        className='input-email'
                    />
                    {errors.mailComprador && <p className='message-error' >Debe ingresar un E-mail</p>}

                    <input
                        {...register("validateMail", { required: true })}
                        type="email"
                        placeholder="Repita su E-mail..."
                        name="validateMail"
                        className='input-email'
                    />
                    {watch('validateMail') !== watch('mailComprador') && <p className='message-error' >Los E-mails no coinciden</p>}


                </div>

                {
                    !confirmationDone &&
                    <button className="button-confirmar btn-clear" onClick={handleConfirmationClick}>Confirmar Datos</button>
                }

                {

                    confirmationDone ? (
                        <>
                            <h3 className='metodo-pago-title'>Seleccione un metodo de pago</h3>
                            <div className='mercadopago-div'>
                                <p className='tarjetas'>Tarjeta Nacionales</p>
                                <MercadoPagoButton
                                    nombreDestinatario={watch('nombreDestinatario')}
                                    apellidoDestinatario={watch('apellidoDestinatario')}
                                    phoneDestinatario={watch('phoneDestinatario')}
                                    mailComprador={watch('mailComprador')}
                                    localidad={location}
                                    nombreLocalidad={locationName}
                                    precioLocalidad={locationValue}
                                    calle={watch('calle')}
                                    altura={watch('altura')}
                                    piso={watch('piso')}
                                    dedicatoria={saveDedicatoria}
                                    nombreComprador={watch('nombreComprador')}
                                    phoneComprador={watch('telefonoComprador')}
                                    apellidoComprador={watch('apellidoComprador')}
                                    fechaEnvio={watch('fechaEnvio')}
                                    horarioEnvio={watch('selectHorario')}
                                    // servicioPremium={isPremium}
                                    // envioPremium={precioEnvioPremium}
                                    finalPrice={finalPrice}
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
                        </>

                    ) : hasSelectedLocation ? (
                        <>
                            {
                                priceDolar ? <h2 className='totalPrecio'  >Total final: USD${finalPrice}</h2>
                                    : <h2 className='totalPrecio'  >Total final: ${finalPrice.toLocaleString('es-AR')}</h2>
                            }
                            <h1 className='alert-finalprice'> Antes de Finalizar la compra,
                        debe completar TODOS los campos.</h1>
                        </>
                    ) : (
                                <h1 className='alert-finalprice'> Antes de Finalizar la compra,
                    debe elegir una Localidad de envio y completar TODOS los campos.</h1>
                            )
                }

            </form>

        </div>
    );
};

export default Form;
