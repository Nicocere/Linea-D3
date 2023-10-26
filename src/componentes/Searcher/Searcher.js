import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from 'react-router-dom';



const Searcher = ({ items }) => {

  const navigate = useNavigate()

  const [busqueda, setBusqueda] = useState('');

  const handleChange = (evento) => {
    setBusqueda(evento.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (busqueda) {
      navigate(`/busqueda/${busqueda}`)
    }
  }




  return (
    <div className="div-buscador-chg-usd">
      <div className="buscador-div">
        {/* <h5 className="buscador-title">Busque el producto que desea</h5> */}
        <form onSubmit={handleSubmit} className="form-buscador"   >
          <input
            type="text"
            className=''
            value={busqueda}
            placeholder="Qué producto deseas buscar?..."
            onChange={handleChange}
          />
          <button className="buscador-btn">BUSCAR</button>
        </form>
      </div>


    </div>
  )
}

export default Searcher