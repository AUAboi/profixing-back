const express = require("express");
const { isauthantication } = require("../middleware/authentication");
const Route = express.Router();
const Offer = require("../model/offers");

Route.post("/create", isauthantication, (req, res, next) => {
  try {
    const newOffer = new Offer({
      name: req.body.name,
      price: req.body.price,
      date: req.body.date,
      detail: {
        callout: req.body.detail.callout,
        ac: req.body.detail.ac,
        plumbing: req.body.detail.plumbing,
        electrical: req.body.detail.electrical,
        handyman: req.body.detail.handyman,
        spareParts: req.body.detail.spareParts,
      },
    });
    newOffer.save((err, offer) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(offer);
      }
    });
  } catch (e) {
    return res.status(500).json(e);
  }
});
Route.post("/getByName", isauthantication, (req, res) => {
  try {
    Offer.findOne({ name: req.body.name }).exec((err, data) => {
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
Route.post("/allOffers", (req, res) => {
  try {
    Offer.find().exec((err, data) => {
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
Route.delete("/:id/deleteOffers", isauthantication, (req, res) => {
  try {
    Offer.findOneAndDelete({ _id: req.params.id }).exec((err, data) => {
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
Route.put("/:id/updateOffers", isauthantication, (req, res) => {
  console.log(req.body)
  try {
    Offer.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: req.body,
      },
      {
        new: true,
        userFindAndModify: false,
      },
      (err, data) => {
        if (err) return res.status(400).json(err);
        return res.json(data);
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = Route;