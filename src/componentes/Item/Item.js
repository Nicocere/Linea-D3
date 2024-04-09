import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { Button } from '@mui/material'

const Item = ({ items }) => {

  return (
    <div className="product-item">


      <NavLink to={`/detail/${items.id}`} className="link-producto">
        <img src={items.imagen} alt="" />
      </NavLink>
      <span style={{color:'silver', fontSize:'x-small'}}>Vendidos: {items.vendidos}</span>
      <h4 className="tituloProducto">{items.nombre}</h4>
      <h3>${items.precio}</h3>
      <div className="div-prod-details-indx">

        {/* <p className="prod-details-index">Tamaño: <strong className='strong-prod-details'> {items.opciones[0].size} </strong></p> */}


      </div>

      { <NavLink to={`/detail/${items.id}`} className="link-producto">
           <Button variant='text' size='small' sx={{ color:'black', margin:'10px',fontSize:'9.50px', '&:hover':{color:'grey'}}}>Ver opciones</Button>
         </NavLink>
     } 
      <ItemCount
        id={items.id || items._id}
        size={items?.size[1]}
        optionPrecio={items.precio}
        item={items}
      />
    </div>
  )
}

export default Item