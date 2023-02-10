const express = require("express");
const Route = express.Router();
const nodemailer = require("nodemailer");
const { createOrders } = require("../middleware/authentication");
const {
  isauthantication,
  authorizedRoles,
} = require("../middleware/authentication");

var mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "profixinga@gmail.com",
    pass: "qmgxaqqspysldqet",
  },
});

Route.post("/SndEmail", createOrders, (req, res, next) => {
  let userEmail = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      .email-container {
        background-color: #e6e8f4;
        padding: 10px;
      }
      .data-container {
        display: flex;
        border-bottom: 1px solid #e6e8f4;
        padding: 5px;
      }
      .data-head {
        flex: 1;
        padding: 5px;
        font-weight: 500;
      }
      .data-values {
        flex: 1;
        padding: 5px;
          margin-left: 30%;
      }
      .footer-container {
        padding: 10px;
        text-align: center;
      }
      .footer-container button {
        padding: 10px 18px;
        border: none;
        background-color: #50d1c0;
        color: white;
        border-radius: 5px;
      }
      .footer-container button:hover {
        cursor: pointer;
      }
      #main {
        margin-left: 10%;
        margin-right: 10%;
      }
    </style>
  </head>
  <body>
    <div id="main">
      <div class="email-container">
        <h3>Booking Summary</h3>
      </div>
      <div class="data-container">
        <div class="data-head">Data & Time</div>
        <div class="data-values">${new Date(req.body.date).toLocaleDateString(
          "en-PK",
          {
            timeZone: "Asia/Karachi",
          }
        )}  ${req.body.time} </div>
      </div>
      <div class="data-container">
        <div class="data-head">Instructions</div>
        <div class="data-values">${
          req && req.body && req.body.instruction
        }</div>
      </div>
      <div class="data-container">
        <div class="data-head">Duration</div>
        <div class="data-values">${req && req.body && req.body.duration}</div>
      </div>
      <div class="data-container">
        <div class="data-head">Number of Units</div>
        <div class="data-values">${req && req.body && req.body.units}</div>
      </div>
      <div class="data-container">
        <div class="data-head">Subtotal</div>
        <div class="data-values">${req && req.body && req.body.subTotal}</div>
      </div>
      <div class="data-container">
        <div class="data-head">Discount</div>
        <div class="data-values">${req && req.body && req.body.discount}</div>
      </div>
      <div class="data-container">
        <div class="data-head">Total amount after discount</div>
        <div class="data-values">${req && req.body && req.body.total}</div>
      </div>
      <div class="data-container">
        <div class="data-head">Client's Location</div>
        <div class="data-values">${
          req && req.body && req.body.location.address
        } ${req && req.body && req.body.location.city} ${
      req && req.body && req.body.location.country
    }</div>
      </div>
      <div class="footer-container">
        <button>Accept</button>
      </div>
    </div>
  </body>
</html>
`,
  };

  console.log(userEmail);
  mailTransporter.sendMail(userEmail, function (err, data) {
    if (err) {
      res.status(400).json(err);
    } else {
      if (data !== null) {
        res.json(req.order);
      }
    }
  });
});

module.exports = Route;
