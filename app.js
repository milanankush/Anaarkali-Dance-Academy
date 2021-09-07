const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/contactDance");
}
//Define mongoose scheema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});
const Contact = mongoose.model("Contact", contactSchema);
//express specefic stuff
app.use("/static", express.static("static"));
app.use(express.urlencoded());

//pug specefic stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const params = {};
  res.render("home.pug", params);
});
app.get("/contact", (req, res) => {
  const params = {};
  res.render("contact.pug", params);
});
app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("Your response has has been saved successfully...");
  }).catch(()=>{
    res.status(400).send("Sorry! we were unable to save your responce...");
  });
  
  //res.render("contact.pug");
});

app.listen(80, () => {
  console.log(`Listening at port 80...`);
});
