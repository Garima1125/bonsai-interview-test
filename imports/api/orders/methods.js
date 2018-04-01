// @flow

// Framework
import { Meteor } from "meteor/meteor";

// Collections
import { Orders } from "./collection";
import { Random } from "meteor/random";

/**
 * Get the most recently created order, not safe for production
 *
 * @returns {Object} A single order object.
 */
export const getLastOrder = () => {
  const options = {sort: {createdAt: -1}, limit: 1};
  try {
    const lastOrderCursor = Products.find({}, options);
    const lastOrder = lastOrderCursor.fetch()[0];
    return lastOrder;
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getLastOrder.findOrFetchError`,
      `Could not find or fetch product. Got error: ${error}`,
      error
    );
  }
};

/**
 * Get an order by id
 *
 * @returns {Object} A single order object.
 */
export const getOrderById = orderId => {
  try {
    return Products.findOne(orderId);
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrderById.findOrFetchError`,
      `Could not find or fetch product with order id: '${orderId}'`,
      error
    );
  }
};

export const saveNewOrder = (name, price) => {
  try {
    let document;
    let order = Orders.findOne({
      name: name
    });
    if (!order) {
      document = {
        product_id: Random.id(),
        name: name,
        unit_price: price,
        time: new Date(),
        quantity: 1,
        order_status: "pending"
      };
      return Orders.insert(document);
    } else {
      return Orders.update(
        { name: order.name },
        {
          $inc: { quantity: 1 }
        }
      );
    }
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:saveNewOrder`,
      `Could not save new order`,
      error
    );
  }
};

export const getOrders = () => {
  let orderData;
  try {
    orderData = Orders.find({}).fetch();
  } catch (error) {
    throw new Meteor.Error(
      `${__filename}:getOrders`,
      `Could not get all order`,
      error
    );
  }
  return orderData;
};

// Register meteor methods.
Meteor.methods({
  "orders.getLastOrder": getLastOrder,
  "orders.getOrderById": getOrderById,
  "orders.saveNewOrder": saveNewOrder,
  "orders.getOrders": getOrders
});
