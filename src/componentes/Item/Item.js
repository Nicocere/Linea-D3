import React from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'

const Item = ({ items }) => {

  return (
    <div className="product-item">


      <Link to={`/detail/${items._id}`} className="link-producto">
        <img src={items.img} alt="" />
      </Link>

      <h4 className="tituloProducto">{items.nombre}</h4>
      <div className="div-prod-details-indx">

        <p className="prod-details-index">Tamaño: <strong className='strong-prod-details'> {items.opciones[0].size} </strong></p>


      </div>

      <ItemCount
        optionId={items.opciones[0]._id}
        optionSize={items.opciones[0].size}
        optionPrecio={items.opciones[0].precio}
        item={items}
         />
      {


        items.opciones.length > 1
          ? <Link to={`/detail/${items._id}`} className="link-producto">
            <button className='btn-verMas'>Ver más opciones del producto</button>
          </Link>
          : null
      }
    </div>
  )
}

export default Item