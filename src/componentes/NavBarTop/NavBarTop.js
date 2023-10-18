import React, { useState } from 'react';
import style from './navTop.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from 'react-router-dom'
import Searcher from '../Searcher/Searcher';
import NavSeccions from '../NavSeccions/NavSeccions'


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';


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
        <div className={style.loginContainer} >
          <NavLink to="/sigin">Crear Cuenta</NavLink>
          <NavLink to="/login">Iniciar Sesión</NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBarTop