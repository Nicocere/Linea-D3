import React, { useState } from 'react';
import { NavLink } from "react-router-dom";





export const CategoriesSubMenu = () => {
    return (
        <div className="submenu">
            <NavLink to="/productos/hombre">Hombre</NavLink>
            <NavLink to="/productos/mujer" >Mujer</NavLink>
            <NavLink to="/productos/grandiosos">Grandiosos Muchachos</NavLink>
            <NavLink to="/productos/conjuntos">Conjuntos</NavLink>
            <NavLink to="/productos/buzos">Buzos</NavLink>
            <NavLink to="/productos/musculosas">Musculosas</NavLink>
            <NavLink to="/productos/short">Short</NavLink>
        </div>
    );
}
