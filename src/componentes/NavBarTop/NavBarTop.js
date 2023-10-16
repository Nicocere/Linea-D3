import React, { useState } from 'react';
import style from './navTop.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from 'react-router-dom'


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';
  const openCategory = showMobileMenu ? 'catOpen' : 'catClosed'


  return (
    <div className={style.navTop}>

      <ul className={openMenu}>

        <div className='categoriaMovil' >
          {
            showMobileMenu ? <p className={openCategory} >Categorias </p> : <p className={openCategory} >Categorias </p>
          }
        </div>


        <div className='barMovil' onClick={() => setShowMobileMenu(!showMobileMenu)}>
        </div>

        <div className={style.navBarSeccions}>
          <NavLink className='seccionLi' to='/' onClick={() => setShowMobileMenu(!showMobileMenu)}> INICIO </NavLink>

          <NavLink className='seccionLi' to='/categoria/Productos' onClick={() => setShowMobileMenu(!showMobileMenu)}>Productos </NavLink>

          <NavLink className='seccionLi' to="/categoria/Funcionalidades" onClick={() => setShowMobileMenu(!showMobileMenu)}>Funcionalidades</NavLink>

          <NavLink className='seccionLi' to="/categoria/Recursos" onClick={() => setShowMobileMenu(!showMobileMenu)}>Recursos</NavLink>

          <NavLink className='seccionLi' to="/categoria/Especiales" onClick={() => setShowMobileMenu(!showMobileMenu)}>Planes y Precios</NavLink>
        </div>

      </ul>

      <NavLink to="/cart">
        <CartWidget />
      </NavLink>


    </div>
  )
}

export default NavBarTop