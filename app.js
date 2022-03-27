const express = require("express");
const app = express();
const ejs = require("ejs");
const qrcode = require("qrcode");
const fs = require("fs");
const id = require("shortid");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", 'ejs');


app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", async(req,res) => {
  const input = req.body.text;

  await qrcode.toDataURL(input, (err, src)  => {
    let ids = id.generate();

    fs.writeFile(`user${ids}.pdf`, `decoding is: ${input}, SOURCES is ${src}`, function(errs, data) {
      if (errs) throw errs;
      console.log(data)
     res.render("scan", {qr_src: src, input, data, ids})
    })
  })
});





app.get("/user/:id", async(req, res) => {
  const file = `${__dirname}/user${req.params.id}.pdf`
  await res.download(file)
  res.redirect('/')
})


app.listen(3000, () => {
  console.log("works...");
});
