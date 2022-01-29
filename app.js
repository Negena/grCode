const express = require("express");
const app = express();
const ejs = require("ejs");
const qrcode = require("qrcode");


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", 'ejs');


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req,res) => {
  const input = req.body.text;
  qrcode.toDataURL(input, (err, src)  => {
    res.render("scan", {qr_src: src})
  })
});



app.listen(3000, () => {
  console.log("works...");
});
