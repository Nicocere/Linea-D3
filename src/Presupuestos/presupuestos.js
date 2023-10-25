import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FadeLoader } from 'react-spinners';
import Swal from 'sweetalert2';

function Presupuestos() {

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: 'LineaD3 Basket',
        from_name: '',
        from_email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        emailjs.send('service_prueba_LineaD3', 'template_prueba_LineaD3', formData, 'Cs60mk0EHnwsrrRsM')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsLoading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Mensaje Enviado',
                    text: `Has enviado un mail al vendedor pidiendo un presupuesto `,
                });

            }, (error) => {
                console.log('FAILED...', error);
                setIsLoading(false)
                alert('Ocurrió un error al enviar el mensaje.');
            });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <div className='div-presupuestos'>
            <form className='form-presupuesto' onSubmit={handleSubmit}>
                <label>Nombre y Apellido</label>
                <input className='input-presup'
                    type="text"
                    name="from_name"
                    placeholder="Nombre y apellido..."
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                />

                <label>E-mail</label>
                <input className='input-presup'
                    type="email"
                    name="from_email"
                    placeholder="Email..."
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                />

                <label>Teléfono </label>
                <input className='input-presup'
                    type="text"
                    name="phone"
                    placeholder="Teléfono...."
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />

                <label>¿Qué presupuesto desea pedir?</label>
                <textarea className='text-presup'
                    name="message"
                    placeholder="Detalles del presupuesto"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                ></textarea>
                {
                    isLoading ?
                        <div className="spinner">
                            Enviando su mail, aguarde....
                    <FadeLoader color="black" />
                        </div> : <button className="black-btn" type="submit">Enviar</button>

                }
            </form>
        </div>
    );
}

export default Presupuestos;
