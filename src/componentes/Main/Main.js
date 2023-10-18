import React from 'react'
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import { Routes, Route } from 'react-router-dom'
import Cart from '../Cart/Cart';
import Home from '../Home/Home';
import Products from '../../pages/Products/Products';

const Main = () => {

  return (
    <main className='main'>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/productos' element={<Products />} />

        <Route path='/categoria/:categoryName' element={<ItemListContainer />} />

        <Route path='/detail/:prodId' element={<ItemDetailContainer />} />

        <Route path="/cart" element={<Cart />} />

      </Routes>
    </main>
  );


};

export default Main