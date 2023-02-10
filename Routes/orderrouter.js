const express = require("express");
const {
  isauthantication,
  authorizedRoles,
} = require("../middleware/authentication");
const Route = express.Router();
const Product = require("../model/productmodel");
const Order = require("../model/ordermodel");
const ErrorHandler = require("../utils/errorhandle");


// get Single Order
Route.get(
  "/order/:id",
  isauthantication,
  authorizedRoles,
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
      );

      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      } else {
        res.status(200).json({
          success: true,
          order,
        });
      }
    } catch (e) {
      return res.status(500).json(error);
    }
  }
);
// get logged in user  Orders
Route.get("/orders/me", isauthantication, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (e) {
    return res.status(500).json(error);
  }
});
// get all Orders -- Admin
Route.get("/admin/orders", async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (e) {
    return res.status(500).json(error);
  }
});
Route.put(
  "/admin/updateorder/:id",
  isauthantication,
  async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
      }

      if (order.orderStatus === "Delivered") {
        return next(
          new ErrorHandler("You have already delivered this order", 400)
        );
      }

      if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
          await updateStock(o.product, o.quantity);
        });
      }
      order.orderStatus = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
      });
      async function updateStock(id, quantity) {
        const product = await Product.findById(id);

        product.Stock -= quantity;

        await product.save({ validateBeforeSave: false });
      }
    } catch (e) {
      return res.status(500).json(error);
    }
  }
);
Route.delete("/admin/delete/:id", isauthantication, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    await order.remove();

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json(error);
  }
});

module.exports = Route;
