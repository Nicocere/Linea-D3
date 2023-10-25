import React, { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import estilosDetail from './ItemDetail.module.css';
import './itemDetail.css'

const ItemDetail = ({ item }) => {

  const [count, setCount] = useState(1);


  const incrementar = () => {
    setCount(count + 1);
  };

  const disminuir = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (

    <div className="item-detail">
      <img src={item.imagen}></img>

      <div className="detail-content" >
        <h1>{item.nombre}</h1>
        <h2>${item.precio}</h2>
        <p>Descripción del producto</p>
        <h5>Talles disponibles: {item.talle}</h5>
        <div className="contador" >
          <button onClick={incrementar}>+</button>
          <p> {count}</p>
          <button onClick={disminuir}>-</button>
        </div>
        <ItemCount
          idProd={item.id}
          item={item}
          quantity={count}
        />
      </div>

    </div>

  );
};

export default ItemDetail;