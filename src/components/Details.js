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
               console.log(price);
               return (
                <div className="container py-5">
                  {/* title */}
                   <div className="row">
                     
                   </div>
                   {/* end of title */}
                </div>
                )
              }
            }


          </ProductConsumer> 
        )
    }
}
