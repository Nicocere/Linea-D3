import { useEffect, useState } from 'react';
import { auth } from '../../../firebaseConfig.mjs';
import { doc, getDoc } from "firebase/firestore";
import { baseDeDatos } from '../../../firebaseConfig.mjs';
import useLogout from '../LogOut/LogOut';

function PerfilUser() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                const userDocRef = doc(baseDeDatos, "users", uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                    console.log("user data", userData)
                } else {
                    console.error("No se encontró el usuario en Firestore");
                }
            }
        };

        fetchData();
    }, []);


    return (
<>
        {
            userData ? 
            (
          <div className='perfil-usuario'>
          <h1>Bienvenido, {userData.nombre} {userData.apellido}</h1>
          <p>Email: {userData.email}</p>
          {/* ... otros detalles del usuario ... */}
          <button onClick={useLogout}>Cerrar Sesión</button>
          
          </div>
          )
            
            :
            <div  className='perfil-usuario'>Cargando...</div> 
        }
        </>
            );
}

export default PerfilUser;
