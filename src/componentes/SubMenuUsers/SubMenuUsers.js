import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import style from '../NavBarTop/navTop.module.css'
import useLogout from '../Login/LogOut/LogOut';
import './subMenuUsers.css'


export const SubMenuUsers = ({userData, }) => {

    const logout = useLogout()

    const navigate = useNavigate()

    const handleProfileNavigation = () => {
      if (userData.rol === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    };
  

    return (
        <div className='div-submenu'>
      
        <div className={style.userButtons} >
          <button className={style.buttonUser} onClick={logout}>Cerrar Sesión</button>
          <button className={style.buttonUser} onClick={handleProfileNavigation}>Ir a mi perfil</button>
        </div>

      </div>
    );
}
