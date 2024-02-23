

import { useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './Component/Pages/About/About'
import Home from './Component/Pages/Home/Home'
import Profile from './Component/Pages/Profile/Profile'
import ContactUS from './Component/Pages/ContactUS/ContactUS';
import Products from './Component/Pages/Products/Products'
import ForgetPassword from './Component/Pages/ForgetPassword/ForgetPassword';
import ForgetNewPassword from './Component/Pages/ForgetPassword/ForgetNewPassword'

import Header from './Component/Layout/Header';
import Footer from './Component/Layout/Footer';
import Headline from './Component/Layout/Headline';

import Login from './Component/LoginForm/Login'

import SingleProduct from './Component/Pages/Products/SingleProduct'
import CartProvider from './Component/ContextStore/CartProvider';
import AuthContext from './Component/ContextStore/Auth-Context';
import Order from './Component/Layout/Order';
import Invoice from './Component/Layout/Invoice';


function App() {

  const [checked, setChecked] = useState('All');
  const [invoiceOrdId, setInvoiceOrdId] = useState({})

  const AuthCtx = useContext(AuthContext);
  const Auth = AuthCtx.isLoggedIn


  return (
    <div className="App">

      <BrowserRouter>
        <CartProvider>
          <Header />
          <Headline setChecked={setChecked} checked={checked} />
          <Routes>
            <Route path='/' element={!Auth ? <Login /> : <Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={!Auth ? <Login /> : <Profile />} />
            <Route path='/store' element={!Auth ? <Login /> : <Products checked={checked} />} />
            <Route path='/About' element={<About />} />
            <Route path='/singleproduct/:prodId' element={Auth && <SingleProduct />} />
            <Route path='/contact' element={<ContactUS />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
            <Route path='/ForgetnewPassword/:prodId' element={<ForgetNewPassword />} />
            <Route path='/order' element={Auth && <Order setInvoiceOrdId={setInvoiceOrdId} />} />
            <Route path='/invoice' element={Auth && <Invoice invoiceOrdId={invoiceOrdId} />} />
            <Route path='*' element={<Login />} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>

    </div >
  );
}

export default App;
