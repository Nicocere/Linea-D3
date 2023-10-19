import React, { useState } from 'react';
import style from './navTop.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from 'react-router-dom'
import Searcher from '../Searcher/Searcher';
import NavSeccions from '../NavSeccions/NavSeccions'
import { onAuthStateChanged } from "@firebase/auth";
import { auth, baseDeDatos } from "../../firebaseConfig.mjs";
import { useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userData, setUserData] = useState(null);

  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';

  const [currentUser, setCurrentUser] = useState(null);

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
                    {/* Aquí podrías tener también un botón para cerrar sesión */}
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