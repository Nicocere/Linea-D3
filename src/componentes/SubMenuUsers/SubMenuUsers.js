import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import style from '../NavBarTop/navTop.module.css'
import useLogout from '../Login/LogOut/LogOut';
import './subMenuUsers.css'
import { Button } from '@mui/material';


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
          <Button variant='contained' size='small' sx={{background:'linear-gradient(to left, #2b2b2b, #171616)', margin:'15px', 
                transition:'background .25s ease-in-out',  '&:hover':{background: 'silver', color:'black'}}} onClick={handleProfileNavigation}>Ir a mi perfil</Button>

          <Button variant='contained' size='small' sx={{background:'linear-gradient(to left, #2b2b2b, #171616)', margin:'15px', 
                transition:'background .25s ease-in-out',  '&:hover':{background: 'silver', color:'black'}}} onClick={logout}>Cerrar Sesión</Button>
        </div>

      </div>
    );
}
