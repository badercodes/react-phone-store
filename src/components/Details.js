import React, { Component } from 'react';
import {ProductConsumer} from "../context";
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';

export default class Details extends Component {
    render() {
        return (
          <ProductConsumer>
            { (value) => {
                const {id, title, img, price, company, info, inCart} = 
                  value.details;
               return (
                <div className="container py-5">
                  {/* title */}
                   <div className="row">
                     <div className="col-10 mx-auto text-center text-blue my-5 text-slanted">
                      <h1>{title}</h1>

                     </div>
                   </div>
                   {/* end of title */}
                   {/* product info */}
                   <div className="row">
                     <div className="col-10 col-md-6 mx-auto my-3 text-center">
                      <img src={img} alt="product" className="img-fluid"/>
                     </div>
                     {/* product text */}
                     <div className="col-10 col-md-6 mx-auto my-3 text-capitalize">
                      <h2>Model : {title}</h2>
                      <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                        made: <span className="text-uppercasse">{company}</span>
                      </h4>
                      <h4 className="text-blue">
                        <strong>
                          price : 
                            <span> $</span>
                          {price}
                        </strong>
                      </h4>
                      <p className="text-capitalize font-weight-bold mt-3 mb-0"> some info on product </p>
                      <p className="text-muted lead">{info}</p>

                      {/* buttons on 2nd column of row for adding to cart */}
                      <div>
                       <Link to="/">
                        <ButtonContainer>
                          back to products
                        </ButtonContainer>
                       </Link>
                       <ButtonContainer
                        cart
                        disabled={inCart ? true : false} 
                        onClick={()=> {
                          value.addToCart(id);
                          value.openModal(id);
                          }
                          }
                          >
                        {inCart ? "inCart" : "Add to Cart"}  
                       </ButtonContainer>  
                      </div>
                     </div>
                    
                   </div>
                   {/* end of product info */}
                </div>
                );
              }
            }


          </ProductConsumer> 
        )
    }
}
