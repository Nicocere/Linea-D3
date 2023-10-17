import React, { useState } from 'react';
import style from './navTop.module.css'
import CartWidget from '../CartWidget/CartWidget'
import { NavLink } from 'react-router-dom'
import Searcher from '../Searcher/Searcher';


const NavBarTop = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const openMenu = showMobileMenu ? 'seccion' : 'seccionCerrada';
  const openCategory = showMobileMenu ? 'catOpen' : 'catClosed'


  return (
    <div className={style.navTop}>

      <img className={style.imgNavBar} src={'../assets/logo/LineaD3Logo.png'} alt="logo lineaD3" />

      <div>
        <ul className={openMenu}>

          <div className='categoriaMovil' >
            {
              showMobileMenu ? <p className={openCategory} >Categorias </p> : <p className={openCategory} >Categorias </p>
            }
          </div>


          <div className='barMovil' onClick={() => setShowMobileMenu(!showMobileMenu)}>
          </div>

          <div className={style.navBarSeccions}>
            <NavLink className='seccionLi' to='/' onClick={() => setShowMobileMenu(!showMobileMenu)}> Inicio </NavLink>

            <NavLink className='seccionLi' to='/categoria/Productos' onClick={() => setShowMobileMenu(!showMobileMenu)}>Productos </NavLink>

            <NavLink className='seccionLi' to="/categoria/Funcionalidades" onClick={() => setShowMobileMenu(!showMobileMenu)}>Promociones</NavLink>

            <NavLink className='seccionLi' to="/categoria/Recursos" onClick={() => setShowMobileMenu(!showMobileMenu)}>Contacto</NavLink>

            <NavLink className='seccionLi' to="/categoria/Especiales" onClick={() => setShowMobileMenu(!showMobileMenu)}>Quienes somos</NavLink>
          </div>

        </ul>
        <Searcher />
      </div>
      <div>
        <NavLink to="/cart">
          <CartWidget />
        </NavLink>
      </div>
    </div>
  )
}

export default NavBarTop