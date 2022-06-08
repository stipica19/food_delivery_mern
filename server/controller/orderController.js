import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import ApiFeatures from "../models/apifeatures.js";
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, shippingPrice, totalPrice, dodaci } =
    req.body;

  console.log(req.body);

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
      shippingPrice,
      totalPrice,
      dodaci,
    });
    const createdOrder = await order.save();

    res.status(201).send({
      message: "Uspješno ste naručili :D",
      success: true,
    });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  console.log("order by id", req.params.id);
  const order = await Order.findById(req.params.id).populate(
    "user",
    "user_name first_name last_name tel"
  );

  if (order) {
    console.log(order);
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  console.log("myorders");
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "first_name"
  );

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const upripremi = "upripremi";
  const isDelivered = "isDelivered";

  let queryStr = req.query.query;

  if (queryStr === upripremi) {
    console.log("1");
    const orders = await Order.find({ upripremi: true, isDelivered: false });

    res.json(orders);
  } else if (queryStr === isDelivered) {
    console.log("2");
    const orders = await Order.find({ upripremi: true, isDelivered: true });

    res.json(orders);
  } else {
    console.log("3");
    console.log("first");
    const orders = await Order.find({ upripremi: false, isDelivered: false });
    res.json(orders);
  }
});

const updateOrderToPreparation = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.upripremi = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrderToPreparation,
  updateOrderToDelivered,
};
