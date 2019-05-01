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

      // console.log(dataObjectGlobal.dataObject.items.slice(0, 10));
      console.log("=-=-=-=->", pageNo);
      const result = dataObjectGlobal.dataObject.items.slice(0, 10 * pageNo);
      console.log(result);
      res.send({ result });

      // if (pageNo === 1) {
      //   const result = dataObjectGlobal.dataObject.items.slice(0, 10);
      //   res.send({ result });
      // }
      // if (pageNo === 2) {
      //   const result = dataObjectGlobal.dataObject.items.slice(10, 19);
      //   res.send({ result });
      // }
      // if (pageNo === 3) {
      //   const result = dataObjectGlobal.dataObject.items.slice(20, 28);
      //   res.send({ result });
      // }
      // if (pageNo === 4) {
      //   const result = dataObjectGlobal.dataObject.items.slice(29, 37);
      //   res.send({ result });
      // }
      // if (pageNo === 5) {
      //   const result = dataObjectGlobal.dataObject.items.slice(0, 10);
      //   res.send({ result });
      // }
    } catch (err) {
      console.log(err);
    }
    //   const query = dataObjectGlobal.dataObject.items.map
    //     .sort(function(a, b) {
    //       return a.Variable1 < b.Variable1 ? 1 : -1;
    //     })
    //     .slice(0, 20);
    //   console.log(query);
  });
});

// app.get("/data", function(req, res) {
//   const lineReader = require("readline").createInterface({
//     input: fs.createReadStream("data.json")
//   });
//   lineReader.on("line", function(line) {
//     console.log("line from file: ", line);
//   });
// });

// app.get("/data/:pageNo", function(req, res) {
//   const pageNo = req.params.pageNo;
//   console.log(pageNo);
//   res.send({ dataObjectGlobal });
// });

app.post("/checkout", function(req, res) {
  const itemsArray = req.body;

  Item.create({ createEntry: itemsArray });
});

const stripe = new stripeLoader("sk_test_JUe3Utv107b5al5AvE8t0ty500b5I4Y1wP");

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
