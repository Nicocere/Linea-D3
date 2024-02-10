import React from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { Button } from '@mui/material'

const Item = ({ items }) => {

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
       { <Link to={`/detail/${items.id}`} className="link-producto">
            <Button variant='text' size='small' sx={{ color:'black', margin:'10px',fontSize:'9.50px', '&:hover':{color:'grey'}}}>Ver más opciones del producto</Button>
          </Link>
      } 
    </div>
  )
}

export default Item