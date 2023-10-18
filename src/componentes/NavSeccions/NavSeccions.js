import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'


const NavSeccions = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const openCategory = showMobileMenu ? 'catOpen' : 'catClosed'

    return (
        <ul className="seccionCerrada">

            <div className='categoriaMovil' >
                {
                    showMobileMenu ? <p className={openCategory} >Categorias </p> : <p className={openCategory} >Categorias </p>
                }
            </div>


            <div className='barMovil' onClick={() => setShowMobileMenu(!showMobileMenu)}>
            </div>

            <div >
                <NavLink className='seccionLi' to='/' onClick={() => setShowMobileMenu(!showMobileMenu)}> Inicio </NavLink>

                <NavLink className='seccionLi' to='/productos' onClick={() => setShowMobileMenu(!showMobileMenu)}>Productos </NavLink>

                <NavLink className='seccionLi' to="/categoria/Funcionalidades" onClick={() => setShowMobileMenu(!showMobileMenu)}>Promociones</NavLink>

                {/* <NavLink className='seccionLi' to="/categoria/Recursos" onClick={() => setShowMobileMenu(!showMobileMenu)}>Contacto</NavLink> */}

                <NavLink className='seccionLi' to="/categoria/Especiales" onClick={() => setShowMobileMenu(!showMobileMenu)}>Quienes somos</NavLink>
            </div>

        </ul>
    )
}

export default NavSeccions;