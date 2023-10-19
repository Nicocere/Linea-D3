import { useEffect, useState } from 'react';
import { auth } from '../../../firebaseConfig.mjs';
import { doc, getDoc } from "firebase/firestore";
import { baseDeDatos } from '../../../firebaseConfig.mjs';
import useLogout from '../../../componentes/Login/LogOut/LogOut';

function Admin() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const userDocRef = doc(baseDeDatos, "users", uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.error("No se encontró el usuario en Firestore");
                }
            }
        };

        fetchData();
    }, []);

    if (!userData) return <div>Cargando...</div>;

    return (
        <div className='perfil-usuario'>
            <h1>Estas en el Perfil del Administrador</h1>
            <h3>Bienvenido, {userData.nombre} {userData.apellido}</h3>
            <p>Email: {userData.email}</p>
            <button onClick={useLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default Admin;
