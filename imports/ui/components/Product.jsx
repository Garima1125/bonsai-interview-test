// Framework
import React, { PureComponent } from "react";

// Components
import Button from "../components/Button.jsx";
import { Meteor } from "meteor/meteor";

class Product extends PureComponent {
  handleBuyProduct = (name, price) => {
    Meteor.call(
      "orders.saveNewOrder",
      name,
      price,
      localStorage.getItem("Meteor.userId")
    );
    this.props.updateCounter();
    window.alert(`Your cart has been updated.\n`);
  };

  render() {
    const {
      name = "Product",
      image,
      brand,
      color,
      description,
      price,
      size
    } = this.props;

    const info = [
      { label: "Brand", value: brand },
      { label: "Name", value: name },
      { label: "Description", value: description },
      { label: "Color", value: color },
      { label: "Size", value: size },
      { label: "Price", value: price }
    ];

    return (
      <div className="product">
        <img alt={name} src={image} />
        <div className="details">
          <div className="info">
            {info.map(({ label, value }) =>
              <div className="info-row" key={`${name}-${label}-${value}`}>
                <div className="label">
                  {label}:
                </div>
                <div className="value">
                  {value}
                </div>
              </div>
            )}
          </div>
          <Button onClick={() => this.handleBuyProduct(name, price)}>
            Buy {name}
          </Button>
        </div>
      </div>
    );
  }
}

export default Product;
