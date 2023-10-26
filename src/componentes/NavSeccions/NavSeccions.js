import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { CategoriesSubMenu } from '../SubCategories/SubCategory';


const NavSeccions = () => {

    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showSubMenu, setShowSubMenu] = useState(false);
    

    return (
        <ul className="seccionCerrada">


            <div >
                <NavLink className='seccionLi' to='/' onClick={() => setShowMobileMenu(!showMobileMenu)}> Inicio </NavLink>

                <NavLink  className='seccionLi'  to='/productos'  
                onMouseEnter={() => setShowSubMenu(true)}  onMouseLeave={() => setShowSubMenu(false)}>  Productos {showSubMenu && <CategoriesSubMenu />}</NavLink>
                {/* <NavLink className='seccionLi' to='/productos' onClick={() => setShowMobileMenu(!showMobileMenu)}>Productos </NavLink> */}

                <NavLink className='seccionLi' to="/categoria/Funcionalidades" onClick={() => setShowMobileMenu(!showMobileMenu)}>Promociones</NavLink>

                <NavLink className='seccionLi' to="/presupuestos" onClick={() => setShowMobileMenu(!showMobileMenu)}>Presupuestos</NavLink>

                <NavLink className='seccionLi' to="/categoria/Especiales" onClick={() => setShowMobileMenu(!showMobileMenu)}>Quienes somos</NavLink>
            </div>

        </ul>
    )
}

export default NavSeccions;