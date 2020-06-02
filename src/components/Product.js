import React, { Component } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ProductConsumer} from "../context";

export default class Product extends Component {
    render() {
        const {id,title,img,price,inCart,company,info} = this.props.product;
        return (
            <ProductWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    
                {/* image-container is a custom class */}
                  <div className="image-container p-5" onClick={()=> console.log(`hi from product`) }>
                    <Link to="/details">
                      {/* card-image-top from bootstrap to palce image in top section of card */}
                      <img src={img} alt="product image" className="card-img-top"/>
                    </Link>
                  </div>
                  {/* cart-btn is a custom class  */}
                  <button className="cart-btn" disabled={inCart ? true : false} 
                  onClick={()=>console.log('Added to Cart')}> 
                    {inCart ? (<p className="text-capitalize mb-0">in Cart</p>) 
                    : (
                      <i className="fas fa-cart-plus"></i>
                      )}
                  </button>
                  {/* This will be the card footer; card-footer, d-flex, and justify from bootstrap */}
                  <div className="card-footer d-flex justify-content-between">
                        {/* align from Bootstrap, used so that price stays on same line even though its font size is bigger */}
                        <p className="align-self-center mb-0">
                          {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                          <span className="mr-1">$</span>
                           {price}
                        </h5>
                  </div>
                </div>                
            </ProductWrapper>
        )
    }
}

const ProductWrapper = styled.div`
.card {
  border-color: transparent;
  transition: all 1s linear;
}
.card-footer {
  background: transparent;
  border-top: transparent;
  transition: all 1s linear;
}
/* The ampersand indicated that the hovering happens on parent (the styled div) */
&:hover {
  .card{
    border: 0.04rem solid rgba(0,0,0,0.2);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
  }
  .card-footer {
    background: rgba(247,247,247);
  }
}
.image-container {
  /* Needed position relative so that button can hvae position absolute */
  position: relative; 
  
  /* Should the image overflow - don't spill out */
  overflow: hidden;
}

/* This is so that hovering effect hapens on image container */
.image-container:hover .card-img-top {

  transform: scale(1.2);
}

.card-img-top {
  transition: all 0.5s linear;
}

`

