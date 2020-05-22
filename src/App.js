import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// Custom created components for this project
import Cart from "./components/Cart";
import Default from "./components/Default";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import ProductList from "./components/ProductList";




function App() {
  

  return (

    <React.Fragment>
      
      <Navbar/>
      <ProductList> </ProductList>
      <Details></Details>
      <Cart></Cart>
      <Default></Default>
      
    </React.Fragment>

  );
}

export default App;
