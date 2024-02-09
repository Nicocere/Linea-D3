import React from 'react'
import ItemListContainer from '../../componentes/ItemListContainer/ItemListContainer';
import './products.css'
import Categories from '../../componentes/Categories/Categories';
import { useMediaQuery } from '@mui/material';


const Products = () => {

    const isSmallScreen = useMediaQuery('(min-width:850px)');


    return (
        <div className='products'>
            <div className="products-content" >
                {isSmallScreen ? <Categories /> : null}
                
                <div className="products-list-container" >
                    <ItemListContainer />
                </div>
            </div>
        </div>
    );


};

export default Products