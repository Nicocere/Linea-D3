import React from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth, baseDeDatos } from '../../../firebaseConfig.mjs';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';



function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const fieldsFilled = (                            
            watch('email') &&
            watch('password')
        );
        if (fieldsFilled) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
    
                    // Obtener el rol del usuario desde Firestore
                    const userDoc = await getDoc(doc(baseDeDatos, "users", user.uid));
    
                    if (userDoc.exists() && userDoc.data().rol === "administrador") {
                        navigate('/admin'); // Si es administrador, redirigir a la página de administrador
                    } else {
                        navigate('/perfil'); // Si no, redirigir a la página de perfil
                    }
    
                })
                .catch((error) => {
                    // Manejar errores
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error("Error al iniciar sesión:", errorMessage);
                    
                    // Mostrar mensaje de error al usuario (puedes usar SweetAlert si prefieres)
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario No encontrado',
                        text: 'Su E-mail o contraseña son incorrectos.',
                    });
                });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Datos Faltantes',
                text: 'Ingrese su E-mail y contraseña.',
            });        }
    };
    


    return (
        <div className="login-form">

            <h3>Inicia Sesion</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        {...register("email", { required: true })}
                        type="text"
                        placeholder="Email..."
                        name="email"
                        className='input-email'
                    />
                    {errors.email && <p className='message-error' >El E-mail es requerido</p>}
                </div>

                <div className="input-group">
                    <label>Contraseña</label>
                    <input
                        {...register("password", { required: true })}
                        type="password"
                        placeholder="Contraseña..."
                        className='input-password'
                        name="password"
                    />
                    {errors.password && <p className='message-error' >La contraseña es requerida</p>}
                </div>


                <button type="submit">Iniciar Sesión</button>
            </form>

            <p>No estas registrado?. <a href={'http://localhost:3000/sigin'}>Regristrate aquí</a></p>
        </div>
    );
}

export default Login;
