import React, { Component } from 'react'
import {storeProducts, detailProduct} from "./data"

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        products : [],
        details : detailProduct,
				cart : [],
				modalOpen : true,
				modalProduct: detailProduct,
			}
    handleDetail = (id) => {
				const product = this.getProduct(id);
				this.setState( ()=> {
					return {details: product}
				});
    }
    addToCart = (id) => {
				let tempProduct = [...this.state.products];
				const index = tempProduct.indexOf(this.getProduct(id));
				const product = tempProduct[index];
				
				// once I found the product, I will set incart to true and increment count
				product.inCart = true;
				product.count = 1

				// setting price and totals (seems redundant to me)
				const price = product.price;
				product.total = price;

				// adding the item to state
				this.setState(()=>({products: tempProduct, cart: [...this.state.cart, product] }) , ()=> { console.log(this.state) } )

        console.log(`hello id number ${id} added to card`)
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

    getProduct =(id) => {
        const product =  this.state.products.find((item)=> item.id === id )
        return product;
    }

    componentDidMount() {
        // this.setProducts();
        this.setProductsWayTwo();
		}
		
	openModal = id => {
			const product = this.getProduct(id);
			this.setState (() => {
				return {modalOpen: true, modalProduct:product}
			})
		}

	closeModal = () => {
			this.setState (
				()=> {
					return {modalOpen:false}
				}
			)
		}

    render() {
        return (
            
           <ProductContext.Provider value={{
               ...this.state,
               handleDetail : this.handleDetail,
							 addToCart: this.addToCart,
							 openModal: this.openModal,
							 closeModal: this.closeModal

           }}>
               {this.props.children}
            </ProductContext.Provider>

        )
    }
}

const ProductConsumer = ProductContext.Consumer; 

export {ProductProvider,ProductConsumer}