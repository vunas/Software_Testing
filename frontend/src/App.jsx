import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

export default function App(){
  return (
    <BrowserRouter>
      <nav style={{padding:10}}>
        <Link to='/'>Login</Link> | <Link to='/products'>Product form</Link> | <Link to='/product-list'>Products list</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/products' element={<ProductForm/>} />
        <Route path='/product-list' element={<ProductList/>} />
      </Routes>
    </BrowserRouter>
  );
}
