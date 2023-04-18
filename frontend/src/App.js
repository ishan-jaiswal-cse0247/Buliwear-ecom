import './App.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Header from './HeaderComponent/Header';
import Main1 from './Main1Component/Main1';
import Main2 from './Main2Component/Main2';
import Footer from './FooterComponent/Footer';
import Navbar from './NavbarComponent/Navbar';
import About from './AboutComponent/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './ContactComponent/Contact';
import Login from './LoginComponent/Login';
import Register from './RegisterComponent/Register';
import Privacy from './PrivacyComponent/Privacy';
import Product from './ProductComponent/Product';
import Dashbord from './DashbordComponent/Dashbord';
import ProductDetails from './ProductDetailsComponent/ProductDetails';
import Buyproduct from './BuyComponent/Buyproduct';
import ForgotPass from './ForgotPassComponent/ForgotPass';
function App() {
  return (
    <div id="page">
      <ToastContainer position="bottom-center" limit={1} />
      <Header />
      <Navbar />

      <div id="main">
        <Routes>
          <Route path="/" element={<Main1 />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Privacy" element={<Privacy />}></Route>
          <Route path="/Dashbord" element={<Dashbord />}></Route>
          <Route path="/Buyproduct/:id" element={<Buyproduct />}></Route>
          <Route path="/ForgotPass" element={<ForgotPass />}></Route>
          <Route path="/ForgotPass/:emlid" element={<ForgotPass />}></Route>
          <Route
            path="/ProductDetails/:id"
            element={<ProductDetails />}
          ></Route>
          <Route path="/Product" element={<Product />}></Route>
        </Routes>
      </div>
      <Main2 />
      <Footer />
    </div>
  );
}

export default App;
