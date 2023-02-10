const express = require("express");
const Route = express.Router();
const SubCategory = require("../model/subCategory");

Route.post("/create", (req, res, next) => {
  try {
    const servicesData = req.body.arrayOfSubCate.map((data) => {
      const newSubCategory = new SubCategory(data);
      return newSubCategory.save();
    });
    Promise.all(servicesData).then((data1) => {
      res.json(data1);
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});
Route.post("/getByName", (req, res) => {
  try {
    SubCategory.findOne({ name: req.body.name }).exec((err, data) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(data);
      }
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = Route;
