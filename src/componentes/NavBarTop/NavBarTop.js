import React, { useState } from 'react';
import style from './navTop.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink, useNavigate } from 'react-router-dom'
import Searcher from '../Searcher/Searcher';
import NavSeccions from '../NavSeccions/NavSeccions'
import { onAuthStateChanged } from "@firebase/auth";
import { auth, baseDeDatos } from "../../firebaseConfig.mjs";
import { useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import useLogout from '../Login/LogOut/LogOut';


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userData, setUserData] = useState(null);
  const logout = useLogout()
  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate()

  const handleProfileNavigation = () => {
    if (userData.rol === 'administrador') {
        navigate('/admin');
    } else {
        navigate('/perfil');
    }
};

  useEffect(() => {
      // Establecer el observador en el estado de autenticación
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              setCurrentUser(user);
              const fetchData = async () => {
                if (auth.currentUser) {
                    const uid = auth.currentUser.uid;
                    const userDocRef = doc(baseDeDatos, "users", uid);
                    const userDoc = await getDoc(userDocRef);
                    console.log("USER DOC", userDoc.data())
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        console.error("No se encontró el usuario en Firestore");
                    }
                }
            };
    
            fetchData();
               console.log("esto pasa pq existe user", user)
          } else {
              setCurrentUser(null);
          }
      });

      // Limpiar el observador cuando el componente se desmonte
      return () => unsubscribe();

  }, []);

  return (
    <div className={style.navTop}>

      <img className={style.imgNavBar} src={'../assets/logo/LineaD3Logo.png'} alt="logo lineaD3" />

      <div className={style.sercherContainer} >
        <Searcher />
        <NavSeccions />
      </div>
      <div className={style.loginWidgetContainer} >
        <NavLink className={style.cartLink} to="/cart">
          <CartWidget />
        </NavLink>
        {currentUser && userData ? (
                <div className={style.loginWelcome}>
                    Bienvenido <strong className={style.strongUsername}>{userData.username}</strong>
                    <button className={style.buttonLogout} onClick={logout}>Cerrar Sesión</button>
                    <button className={style.buttonProfile} onClick={handleProfileNavigation}>Ir a mi perfil</button>

                </div>
            ) : (
              <div className={style.loginContainer} >
              <NavLink to="/sigin">Crear Cuenta</NavLink>
              <NavLink to="/login">Iniciar Sesión</NavLink>
            </div>    
            
            )}
     
      </div>
    </div>
  )
}

export default NavBarTop