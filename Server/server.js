const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const stripeLoader = require("stripe");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/cartdb", { useNewUrlParser: true });

const cartSchema = new mongoose.Schema({
  createEntry: { type: Array }
});

const Item = new mongoose.model("Item", cartSchema);
const dataObjectGlobal = {};

app.get("/data/:pageNo", function(req, res) {
  const pageNo = req.params.pageNo;
  fs.readFile("./data.json", "utf-8", (err, dataInJson) => {
    if (err) {
      console.log(err);
    }
    try {
      const dataObject = JSON.parse(dataInJson);
      dataObjectGlobal.dataObject = dataObject;

      
      console.log("=-=-=-=->", pageNo);
      const result = dataObjectGlobal.dataObject.items.slice(0, 10 * pageNo);
      console.log(result);
      res.send({ result });

      
    } catch (err) {
      console.log(err);
    }
    
  });
});



app.post("/checkout", function(req, res) {
  const itemsArray = req.body;

  Item.create({ createEntry: itemsArray });
});

const stripe = new stripeLoader("Your API Key");

const charge = (token, amt) => {
  return stripe.charges.create({
    amount: amt * 100,
    currency: "usd",
    source: token,
    description: "Statement Description"
  });
};

app.post("/api/checkout", async (req, res, next) => {
  try {
    const data = await charge(req.body.token.id, req.body.amount);
    console.log(data);
    res.send("Charged!");
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

app.listen(5000, function() {
  console.log("Server started on port 5000");
});
