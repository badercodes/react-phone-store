import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    details: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  handleDetail = (id) => {
    const product = this.getProduct(id);
    this.setState(() => {
      return { details: product };
    });
  };
  addToCart = (id) => {
    let tempProduct = [...this.state.products];
    const index = tempProduct.indexOf(this.getProduct(id));
    const product = tempProduct[index];

    // once I found the product, I will set incart to true and increment count
    product.inCart = true;
    product.count = 1;

    // setting price and totals (seems redundant to me)
    const price = product.price;
    product.total = price;

    // adding the item to state
    this.setState(
      () => ({ products: tempProduct, cart: [...this.state.cart, product] }),
      () => {
        this.addTotals();
      }
    );

    console.log(`hello id number ${id} added to card`);
  };
  print = () => {
    console.log("The value of source array is", storeProducts);
    console.log("The value of copied array is", this.state.products);
  };

  setProductsWayTwo = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const tempItem = { ...item };
      tempProducts = [...tempProducts, tempItem];
    });
    this.setState(() => ({ products: tempProducts }));
  };

  setProducts = () => {
    let y = [];
    for (let i = 0; i < storeProducts.length; i++) {
      let x, z;
      x = storeProducts[i];
      z = { ...x };
      y.push(z);
      this.setState({ products: y });
    }
    y[0].id = 100;
  };

  getProduct = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  componentDidMount() {
    // this.setProducts();
    this.setProductsWayTwo();
  }

  openModal = (id) => {
    const product = this.getProduct(id);
    this.setState(() => {
      return { modalOpen: true, modalProduct: product };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;

    this.setState(
      () => ({ cart: [...tempCart] }),
      () => this.addTotals()
    );
  };

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find((item) => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];

    product.count -= 1;

    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => ({ cart: [...tempCart] }),
        () => this.addTotals()
      );
    }
  };

  removeItem = (id) => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.products];

    tempCart = tempCart.filter((element) => {
      return element.id !== id;
    });

    const index = tempProducts.indexOf(this.getProduct(id));
    let itemToBeRemoved = tempProducts[index];

    itemToBeRemoved.inCart = false;
    itemToBeRemoved.count = 0;
    itemToBeRemoved.total = 0;

    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts],
        };
      },
      () => this.addTotals()
    );
    // I would find the item (array.find) in the cart array using ID
    // I would pop it
    // setState or as is since its direct mutation
  };

  clearCart = () => {
    this.setState(
      () => ({ cart: [] }),
      () => {
        this.setProductsWayTwo();
        this.addTotals();
      }
    );
    console.log(`hello from clear cart`);
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal = subTotal + item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => ({
      cartSubtotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    }));
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
