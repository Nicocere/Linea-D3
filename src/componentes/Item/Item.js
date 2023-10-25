import React from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'

const Item = ({ items }) => {
  console.log("ITEM ", items)

  return (
    <div className="product-item">


      <Link to={`/detail/${items.id}`} className="link-producto">
        <img src={items.imagen} alt="" />
      </Link>

      <h4 className="tituloProducto">{items.nombre}</h4>
      <h3>${items.precio}</h3>
      <div className="div-prod-details-indx">

        {/* <p className="prod-details-index">Tamaño: <strong className='strong-prod-details'> {items.opciones[0].size} </strong></p> */}


      </div>

      <ItemCount
        optionId={items.id}
        optionSize={items.talla}
        optionPrecio={items.precio}
        item={items}
      />
      {/* {

        items.length > 1
          ? <Link to={`/detail/${items.id}`} className="link-producto">
            <button className='btn-verMas'>Ver más opciones del producto</button>
          </Link>
          : null
      } */}
    </div>
  )
}

export default Item