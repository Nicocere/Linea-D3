import React from 'react'
import ItemListContainer from '../../componentes/ItemListContainer/ItemListContainer';
import './products.css'
import Categories from '../../componentes/Categories/Categories';


const Products = () => {

    return (
        <main className='products'>
            <div className="products-content" >
                <Categories />
                <div className="products-list-container" >
                    <ItemListContainer />
                </div>
            </div>
        </main>
    );


};

export default Products