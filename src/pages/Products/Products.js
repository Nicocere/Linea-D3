import React from 'react'
import ItemListContainer from '../../componentes/ItemListContainer/ItemListContainer';
import './products.css'
import Categories from '../../componentes/Categories/Categories';


const Products = () => {

    return (
        <div className='products'>
            <div className="products-content" >
                <Categories />
                <div className="products-list-container" >
                    <ItemListContainer />
                </div>
            </div>
        </div>
    );


};

export default Products