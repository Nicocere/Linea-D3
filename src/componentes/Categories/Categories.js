import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Categories.css'
import { useParams } from 'react-router-dom'
import Categorization from './Categorizacion';


const Categories = () => {

    const { categoryName, searchParam } = useParams()
    const [categoryroute, setCategoryRoute] = useState();

    useEffect(() => {
        if (categoryName) {
            setCategoryRoute(categoryName)
        } else if (searchParam) {
            setCategoryRoute(searchParam)
        } else {
            setCategoryRoute("Productos")
        }
    })

    return (
        <div className='categories'>
            {/* <div className="categories-navigation" >
                <NavLink to="/" >
                    <h4>Inicio &nbsp;/&nbsp;</h4>
                </NavLink>
                <h4>{categoryroute}</h4>
            </div>
             */}

            <div className="categories-div">
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
        </div>
    );


};

export default Categories;