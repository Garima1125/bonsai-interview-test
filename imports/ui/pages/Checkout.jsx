// Framework
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Table } from "react-bootstrap";

// Components
import Page from "../components/Page.jsx";
import Product from "../components/Product";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: null,
      totalQuantity: 0,
      totalAmount: 0
    };
  }

  goBack = () => this.props.history.push("/shop");

  componentWillMount() {
    Meteor.call(
      "orders.getOrders",
      localStorage.getItem("Meteor.userId"),
      (error, response) => {
        if (error) {
          this.setState(() => ({ error: error }));
        } else {
          this.setState(
            {
              orders: response
            },
            () => {
              let quantity = this.state.totalQuantity;
              let amount = this.state.totalAmount;
              this.state.orders.forEach(order => {
                quantity += order.quantity;
                amount += order.unit_price;
              });
              this.setState({
                totalQuantity: quantity,
                totalAmount: amount
              });
            }
          );
        }
      }
    );
  }

  render() {
    const { orders, totalAmount, totalQuantity } = this.state;
    return (
      <Page pageTitle="Checkout" history goBack={this.goBack}>
        <div>
          <div>
            <Table striped bordered condensed hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Time</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order, index) =>
                    <tr key={order._id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {order.name}
                      </td>
                      <td>
                        {order.quantity}
                      </td>
                      <td>
                        {order.unit_price}
                      </td>
                      <td>
                        {order.time.toDateString()}
                      </td>
                      <td>
                        {order.order_status}
                      </td>
                    </tr>
                  )}
              </tbody>
            </Table>
          </div>
          <br />
          <br />
          <div className="orderDetails">
            <Table striped bordered condensed hover className="detailsTable">
              <tbody>
                <tr>
                  <td>Amount:</td>
                  <td>
                    {totalAmount.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>
                    {totalQuantity}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Page>
    );
  }
}

export default Checkout;
