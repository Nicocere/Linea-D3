import React from 'react'
import Item from '../Item/Item';


const ItemList = ({ items, prodEncontrado }) => {

  return (
    <div className='listadeproductos'>
      {
        items.length === 0 ?  (
<div style={{margin:'100px 0'}}>
          <h2> Lo sentimos! </h2>
          <h4>Por el momento no tenemos este producto en venta!</h4>
          <span>Puedes volver seleccionar alguna de las categorias que se encuentran a la derecha de tu pantalla,
            en la seccion "Categorias" para ver todos los productos que tenemos para vos!
          </span>
</div>
        )
          :
          items?.map((items) => {
            return (
              <Item items={items} key={items.id} />
            )
          })
    
      }
    </div>
  )
};

export default ItemList;