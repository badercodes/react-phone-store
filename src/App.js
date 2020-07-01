import React from 'react';
import {Switch,Route} from 'react-router-dom'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// Custom created components for this project
import Cart from "./components/Cart";
import Default from "./components/Default";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import ProductList from "./components/ProductList";
import Modal from "./components/Modal";




function App() {
  

  return (

    <React.Fragment>
      
      <Navbar/>
      <Switch>
        <Route exact path="/" component={ProductList}/>
        <Route path="/details" component={Details}/>
        <Route path="/cart" component={Cart}/> 
        <Route component={Default}/>
      </Switch>
      <Modal/>
    </React.Fragment>

  );
}

export default App;
