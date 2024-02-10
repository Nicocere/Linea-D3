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
import { Avatar, Button, SwipeableDrawer, Typography, useMediaQuery } from '@mui/material';


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userData, setUserData] = useState(null);
  const logout = useLogout()
  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';
  const [currentUser, setCurrentUser] = useState(null);
  const storageProducts = JSON.parse(localStorage.getItem('productos'));
  const [showSubMenu, setShowSubMenu] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
};



  //Abrir sub menu de Usuarios
  //ABRIR SUBMENU DE USUARIOS
  const handleToggleProfileDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenProfileDrawer(open);
  };


  const handleToggleSubMenuDrawer = () => {
    setOpenProfileDrawer(!openProfileDrawer);
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
              <div onClick={handleToggleSubMenuDrawer} style={{
                alignSelf: 'flex-end', display: 'flex', cursor: 'pointer',
                alignItems: 'flex-end',
              }}>
               
                <Avatar sx={{
                  zIndex: '1200', background: 'yellow', margin: '3px', marginBottom: '1px', width: '25px',
                   height: '25px', fontSize: '.80rem', transition: 'background .50s ease', color:'black'
                  , '&:hover': { background: '#f6a900' }
                }}>
                  {userData.username.charAt(0).toUpperCase()}
                </Avatar>

                <Typography variant="subtitle1" sx={{
                  margin: 0, marginRight: '22px', marginTop:'12px', display: 'flex',
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  fontWeight: '700',
                  fontSize: ' 0.875rem',
                  lineHeight: '1.75',
                  letterSpacing: ' 0.02857em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: 'yellow',
                }} >{userData.username}
                </Typography>

                {openProfileDrawer && <SubMenuUsers userData={userData} />}
              </div>
            ) : (
              <div style={{ alignSelf: 'flex-end', margin:'15px 10px 5px', }}>
                <NavLink style={{
                  textDecoration: 'none', color: 'white', fontSize: 'smaller',
                  fontFamily: 'sans-serif', marginTop:'15px',
                }} to="/login">Iniciar Sesión</NavLink>
              </div>
            )}
            <SwipeableDrawer
              anchor="right"
              open={openProfileDrawer}
              onClick={handleToggleProfileDrawer(false)}
              onClose={handleToggleProfileDrawer(false)}
              onOpen={handleToggleProfileDrawer(true)}
              disableBackdropTransition={true}
              disableDiscovery={true}
            >
              {openProfileDrawer && (
                <div style={{
                  width: '200px', display: 'flex', flexDirection: 'column',
                  background: 'linear-gradient(to top, rgb(0 0 0), rgb(39 39 39))',
                  height: '100vh', padding: '0 14px 0',
                }}>
                  <Button variant='contained' color='error' size='small' sx={{
                    margin: 0, fontWeight: '600',
                    position: 'sticky', right: '15px', top: '100px'
                  }}
                  // onClick={handleToggleDrawer(!openDrawer)} 
                  >
                    Volver atrás
                  </Button>


                  {openProfileDrawer &&
                    <>
                      <Typography variant="subtitle1" sx={{
                        margin: 0, fontWeight: '600',
                        position: 'sticky', right: '40px', top: '60px',color:'white', borderBottom: '1px solid silver'
                      }}>

                        Menu de Usuario

                      </Typography>
                      <SubMenuUsers userData={userData} />
                    </>
                  }
                </div>
              )}
            </SwipeableDrawer>

      </div>
    </div>
  )
}

export default NavBarTop