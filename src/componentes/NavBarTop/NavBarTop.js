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
import { SubMenuUsers } from '../SubMenuUsers/SubMenuUsers';


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userData, setUserData] = useState(null);
  const logout = useLogout()
  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';
  const [currentUser, setCurrentUser] = useState(null);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
};


  const storageProducts = JSON.parse(localStorage.getItem('productos'));


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

      <div className={style.divNav}>


        <img className={style.imgNavBar} src={'../assets/logo/LineaD3Logo.png'} alt="logo lineaD3" />

        <div className={style.sercherContainer} >
          <Searcher items={storageProducts} />
          <NavSeccions />
        </div>

      </div>


      <div className={style.loginWidgetContainer} >
        <NavLink className={style.cartLink} to="/cart">
          <CartWidget />
        </NavLink>
        {currentUser && userData ? (
          
         
          <div className={style.loginWelcome} onClick={toggleSubMenu} >
            <div className={style.containerUser} >
          Bienvenido <strong className={style.strongUsername}>{userData.username}</strong>
        </div>
              {showSubMenu && <SubMenuUsers userData={userData}  />}
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