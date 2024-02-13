import React from 'react'
import ItemDetailContainer from '../ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import SuccessPage from '../MercadoPago/StatusPaymentsMP/SuccessPage';
import FailurePage from '../MercadoPago/StatusPaymentsMP/FailurePage';
import PendingPage from '../MercadoPago/StatusPaymentsMP/PendingPage'
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
import EditBanner from '../../admin/componentes/Banners/editBanners';
import AddBanners from '../../admin/componentes/Banners/addBanners';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Main = () => {

  return (
    <main className='main'>
      <ScrollToTop/>
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

        <Route path="/admin/banners/" element={<AddBanners />} />

        <Route path="/admin/edit/banner/:id" element={<EditBanner />} />


        <Route path="/presupuestos" element={<Presupuestos />} />

        {/* Rutas para los resultados de MercadoPago */}
        <Route path="/mercadopago/PagoExitoso" element={<SuccessPage />} />
        <Route path="/mercadopago/pago-fallido" element={<FailurePage />} />
        <Route path="/mercadopago/pago-pendiente" element={<PendingPage />} />

      </Routes>
    </main>
  );


};

export default Main