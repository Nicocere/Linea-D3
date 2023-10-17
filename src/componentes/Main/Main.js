import React from 'react'
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import { Routes, Route } from 'react-router-dom'
import Cart from '../Cart/Cart';
import Home from '../Home/Home';

const Main = () => {

  return (
    <main className='main'>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/categoria/:categoryName' element={<ItemListContainer />} />

        <Route path='/detail/:prodId' element={<ItemDetailContainer />} />

        <Route path="/cart" element={<Cart />} />

      </Routes>
    </main>
  );


};

export default Main