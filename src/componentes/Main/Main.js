import React from 'react'
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import { Routes, Route } from 'react-router-dom'
import Cart from '../Cart/Cart';
import Home from '../Home/Home';
import Products from '../../pages/Products/Products';
import Login from '../Login/Session-Login/login';
import RegistroUser from '../Login/Registro/registro';
import PerfilUser from '../Login/Perfil/perfilUser';
import Admin from '../../admin/componentes/AdminSesion/sessionAdmin';
import AddProds from '../../admin/componentes/Productos/addProds';
import EditProds from '../../admin/componentes/Productos/editProds';
import Presupuestos from '../../Presupuestos/presupuestos';

const Main = () => {

  return (
    <main className='main'>

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/productos/:categoryName?' element={<Products />} />

        <Route path='/busqueda/:searchParam' element={<Products />} />

        <Route path='/detail/:prodId' element={<ItemDetailContainer />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/login" element={<Login />} />

        <Route path="/sigin" element={<RegistroUser />} />

        <Route path="/perfil" element={<PerfilUser />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/admin/addProds" element={<AddProds />} />

        <Route path="/admin/editProds/:productId" element={<EditProds />} />

        <Route path="/presupuestos" element={<Presupuestos />} />

      </Routes>
    </main>
  );


};

export default Main