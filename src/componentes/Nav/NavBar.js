import estilos from './nav.module.css'
import { NavLink } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';

const NavBar = () => {




  return (


    <nav className={estilos.navBar}>

      <NavLink to='/' >
        <img className={estilos.imgNavBar} src={'../assets/logo/LineaD3Logo.png'} alt="logo envio flores" />
      </NavLink>




    </nav>

  );
};

export default NavBar;





