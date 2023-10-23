import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import estilosDetail from './ItemDetail.module.css';
import './itemDetail.css'

const ItemDetail = ({ item }) => {

  return (

    <div className="item-detail">
      <img src={item.imagen}></img>

      <div className="detail-content" >
        <h1>{item.nombre}</h1>
        <p>Descripción del producto</p>
        <h5>Talles disponibles: {item.talle}</h5>
        <h4>${item.precio}</h4>
        <ItemCount
          idProd={item.id}
          item={item}
        />
      </div>

    </div>

  );
};

export default ItemDetail;