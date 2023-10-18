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

      <div className={style.sercherContainer} >
        <Searcher />
        <ul className="seccionCerrada">

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