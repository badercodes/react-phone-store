import React, { Component } from 'react'
import {storeProducts, detailProduct} from "./data"

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        products : [],
        details : detailProduct,
        count: 7
    }
    handleDetail = () => {
        console.log("Hello from Details")
    }
    addToCart = () => {
        console.log('Hello from add to cart')
    }
    print = ()=> {
        console.log('The value of source array is',storeProducts);
        console.log('The value of copied array is', this.state.products);
    }

    setProductsWayTwo = () => {
        let tempProducts = [];
        storeProducts.forEach((item)=>{
            const tempItem = {...item};
            tempProducts=[...tempProducts,tempItem];
        })
        this.setState (()=> ({products:tempProducts}));
    }

    setProducts = () => {
        let y = [];
        for (let i =0 ; i < storeProducts.length; i++) {
            let x,z;
            x = storeProducts[i];
            z = {...x};
            y.push(z);
            this.setState({products: y});
        }
        y[0].id = 100;
    }

    componentDidMount() {
        // this.setProducts();
        this.setProductsWayTwo();
    }

    render() {
        return (
            
           <ProductContext.Provider value={{
               ...this.state,
               handleDetail : this.handleDetail,
               addToCart: this.addToCart

           }}>
               {this.props.children}
            </ProductContext.Provider>

        )
    }
}

const ProductConsumer = ProductContext.Consumer; 

export {ProductProvider,ProductConsumer}