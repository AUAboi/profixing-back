const express = require("express");
const App = express();
const Product = require("./Routes/productrouter");
const User = require("./Routes/userrouter");
const mongoose = require("mongoose");
const uri = require("./config/key");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const Order = require("./Routes/orderrouter");
const payment = require("./Routes/paymentrouter");
const subCategory = require("./Routes/subCategory");
const orderMail = require("./Routes/orderMail");
const offers = require("./Routes/offers");

var cors = require("cors");
App.use(cors());
App.use(cookieParser());
mongoose.connect("mongodb+srv://Rizwan:Rizwanmirza1@cluster0.lv75msq.mongodb.net/profixingDB?retryWrites=true&w=majority").then(console.log("Your Connection is Successful"));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./server/config/.env" });
}
const PORT = 8080 || process.env.PORT;
App.use(express.json());
App.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
App.use("/product", Product);
App.use("/subCategory", subCategory);
App.use("/orderMail", orderMail);
App.use("/offers", offers);
App.use("/user", User);
App.use("/order", Order);
App.use("/payment", payment);
App.use(errorHandler);

const server = App.listen(PORT, () => {
  console.log(`⚡Your Server is running on port ${PORT}⚡`);
});
App.get("/test", (req, res) => {
  res.json("test succeed");
});
// Unhandled promise Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    "Shutting Down the Server due to Unhandle Promise rejection Error"
  );
  server.close(() => {
    process.exit(1);
  });
});
