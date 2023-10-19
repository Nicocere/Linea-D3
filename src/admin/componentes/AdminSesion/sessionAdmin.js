import { useEffect, useState } from 'react';
import { auth } from '../../../firebaseConfig.mjs';
import { doc, getDoc } from "firebase/firestore";
import { baseDeDatos } from '../../../firebaseConfig.mjs';
import { onAuthStateChanged } from '@firebase/auth';
import useLogout from '../../../componentes/Login/LogOut/LogOut';
import { Navigate } from 'react-router-dom';

function PerfilUser() {
    const [userData, setUserData] = useState(null);
    const logout = useLogout();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const userDocRef = doc(baseDeDatos, "users", uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.error("No se encontró el usuario en Firestore");
                }
            } else {
                // No hay usuario autenticado
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!auth.currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {
                userData ? (
                    <div className='perfil-usuario'>
                        <h1>Estas en el Perfil del Administrador</h1>

                        <h4>Bienvenido, {userData.nombre} {userData.apellido}</h4>
                        <p>Email: {userData.email}</p>
                        {/* ... otros detalles del usuario ... */}
                        <button onClick={logout}>Cerrar Sesión</button>
                    </div>
                ) : (
                    <div className='perfil-usuario'>Cargando...</div>
                )
            }
        </>
    );
}

export default PerfilUser;
