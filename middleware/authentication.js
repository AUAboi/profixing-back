const catchAsyncErrors = require("./catchAsyncerror");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const Order = require("../model/ordermodel");

exports.isauthantication = catchAsyncErrors(async (req, res, next) => {
  console.log(req.cookies);
  const token1 = req.body.token;

  if (!token1) {
    return res.status(401).json("Please Login to access this resource");
  }

  const decodedData = jwt.verify(token1, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
});
exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.body.role)) {
      return res
        .status(403)
        .json(`Role ${req.body.role} is not allowed to handle this`);
    }
  };
};
exports.createOrders = async (req, res, next) => {
  try {
    const order = new Order({
      date: req.body.date,
      time: req.body.time,
      instruction: req.body.instruction,
      duration: req.body.duration,
      units: req.body.units,
      subTotal: req.body.subTotal,
      discount: req.body.discount,
      total: req.body.total,
      ServiceOrIssue: req.body.ServiceOrIssue,
      furnished: req.body.furnished,
      location: {
        address: req.body.location.address,
        city: req.body.location.city,
        country: req.body.location.country,
      },
      username: req.body.username,
    });
    order.save((err, odr) => {
      if (err) {
        res.status(400).json(err);
      } else {
        if (odr) {
          req.order = odr;
          next();
        }
      }
    });
  } catch (e) {
    return res.status(500).json(error);
  }
};
