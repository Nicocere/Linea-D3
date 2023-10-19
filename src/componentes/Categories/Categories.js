import React from 'react'
import { NavLink } from 'react-router-dom'
import './Categories.css'


const Categories = () => {

    return (
        <div className='categories'>
            <h3>Categorias</h3>
            <ul>
                <NavLink to="/productos/hombre">Hombre</NavLink>
                <NavLink to="/productos/mujer" >Mujer</NavLink>
                <NavLink to="/productos/grandiosos">Grandiosos Muchachos</NavLink>
                <NavLink to="/productos/conjuntos">Conjuntos</NavLink>
                <NavLink to="/productos/buzos">Buzos</NavLink>
                <NavLink to="/productos/musculosas">Musculosas</NavLink>
                <NavLink to="/productos/short">Short</NavLink>
            </ul>
        </div>
    );


};

export default Categories;