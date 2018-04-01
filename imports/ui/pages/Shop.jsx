// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";

// Components
import { Alert, Row, Col } from "reactstrap";
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchants: [],
      error: null,
      itemsAdded: 0
    };
  }

  updateCounter =() =>{
    Meteor.call("orders.getOrders", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        let itemsAdded = 0;
        response.forEach(order => {
          itemsAdded += order.quantity;
        });
        this.setState({
          itemsAdded: itemsAdded
        });
      }
    });
  };
  componentWillMount() {
    Meteor.call("merchants.getMerchants", (error, response) => {
      if (error) {
        this.setState(() => ({ error: error }));
      } else {
        this.setState(() => ({ merchants: response }));
      }
    });
    this.updateCounter();
  }

  goBack = () => this.props.history.push("/");

  render() {
    const { merchants, error } = this.state;
    const getProductsFromMerchant = ({ products, brands }) =>
      products.map(({ belongsToBrand, ...product }) => ({
        ...product,
        brand: brands[belongsToBrand]
      }));

    const products = merchants.reduce(
      (acc, merchant) => [...acc, ...getProductsFromMerchant(merchant)],
      []
    );

    return (
      <Page pageTitle="shop" history goBack={this.goBack} cart={true} itemsAdded={ this.state.itemsAdded }>
        <div className="shop-page">
          {products.map(({ id, ...product }) =>
            <Product {...product} key={id} updateCounter={() => this.updateCounter()} />
          )}
        </div>
      </Page>
    );
  }
}

export default Shop;
