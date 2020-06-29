import React, {Component} from "react";
import Product from "./Product";
import Title from "./Title"
import {ProductConsumer} from "../context";

export default class ProductList extends Component {

    render () {

        return (
            <>
            <div className="py5">
                <div className="container">
								<Title name='our ' title='products'/>
                    <div className="row">
											<ProductConsumer>
												{ (value)=> {
													return ( value.products.map ( (item) => { 
														return (<Product product={item} key={item.id}/>);} ) 
													)}
													}
												  
											</ProductConsumer>
                    </div>
                </div>
            </div>
                {/* <Product/> */}

            </>
            )


    }


}