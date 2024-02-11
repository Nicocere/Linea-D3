import React from 'react'
import Item from '../Item/Item';


const ItemList = ({items, prodEncontrado}) => {

  return (   
    <div className='listadeproductos'>   
            {

              
              //  prodEncontrado.length === undefined || prodEncontrado.length === 0  ?
              items?.map((items)=>{
                return (
                  <Item items={items} key={items.id}/>
                )
              }) 
              // : prodEncontrado?.map(itemFilter=>{
              //   return (
              //     <Item items={itemFilter} key={itemFilter._id}/>
              //   )
              // })
            }
      </div>
 )
};

export default ItemList;