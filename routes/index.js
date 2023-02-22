let express = require("express");
let nodemailer = require("nodemailer");
let router = express.Router();
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", {
    styles: ["header", "home", "buttons"],
    scripts: ["home"],
    currentPage: "home",
  });
});

router.get(["/manifeste"], function (req, res, next) {
  res.render("manifeste", {
    styles: ["header", "buttons", "forms", "manifeste"],
    scripts: ["manifeste"],
    currentPage: "manifeste",
  });
});

router.get("/mission", function (req, res, next) {
  res.render("mission", {
    styles: ["mission", "header","team", "buttons"],
    currentPage: "mission",
  });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", {
    styles: ["header", "contact", "buttons", "forms"],
    scripts: ["contact"],
    currentPage: "contact",
  });
});

router.get(["/workshops"], function (req, res, next) {
  res.render("workshops", {
    styles: ["header", "team", "buttons"],
    currentPage: "workshops",
  });
});

router.get(["/sources1"], function (req, res, next) {
  res.render("sources1", {
    styles: ["header", "home"],
    currentPage: "sources1",
  });
});

// Contact and full invoice on contact page

router.post("/send-contact", function (req, res, next) {
  let { email, name, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: `demande contact <${email}>`,
      to: process.env.MY_EMAIL,
      subject: `< Lady H Society > Demande de contact de ${name}`,
      text: message,
      html: `
      <p><strong>Nom du client</strong>: ${name}</p>
      <p><strong>Email du client</strong>: ${email}</p>
      <p><strong>Message</strong>: ${message}</p>
      `,
    })
    .then(() => {
      console.log("hey it's a success");
      res.status(200).json({
        fr: "Votre demande a été envoyée avec succès",
        en: "Your email has been successfully sent",
      });
    })
    .catch(() =>
      res.json({
        fr: "Une erreur s'est produite, veuillez réessayer",
        en: "An error occured, please try again",
      })
    );
});

module.exports = router;
