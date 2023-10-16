import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import estilosDetail from './ItemDetail.module.css';

const ItemDetail = ({ item }) => {

  return (
   
<>
                <ItemCount
                  idProd={item._id} 
                  item={item}
                
                  />
                  </>

  );
};

export default ItemDetail;