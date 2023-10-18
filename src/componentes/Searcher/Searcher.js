import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";


const Searcher = ({ items }) => {

  const { changeList } = useContext(SearchContext)

  let [itemEncontrado, setItemEncontrado] = useState([])
  const [busqueda, setBusqueda] = useState('');

  const handleChange = (evento) => {
    setBusqueda(evento.target.value)
    filtrado(evento.target.value)
  };

  // const serchAlt = document.querySelector('.div-buscador-chg-usd');
  // console.log(serchAlt.getBoundingClientRect().bottom)

  const filtrado = (prodBuscado) => {
    const restultadoBusqueda = items.filter((prod) => {
      if (prod.nombre.toString().toLowerCase().includes(prodBuscado.toLowerCase())) {
        return prod;
      }
    })
    setItemEncontrado(restultadoBusqueda)
  };

  useEffect(() => {
    changeList(itemEncontrado)
  }, [itemEncontrado]);

  return (
    <div className="div-buscador-chg-usd">
      <div className="buscador-div">
        {/* <h5 className="buscador-title">Busque el producto que desea</h5> */}
        <form className="form-buscador"   >
          <input
            type="text"
            className=''
            value={busqueda}
            // placeholder="Buscar Producto"
            onChange={handleChange}
          />
          <button className="buscador-btn">BUSCAR</button>
        </form>
      </div>


    </div>
  )
}

export default Searcher