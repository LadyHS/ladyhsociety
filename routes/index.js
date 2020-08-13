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

router.get(["/prestations", "/services"], function (req, res, next) {
  res.render("presta", {
    styles: ["header", "presta", "buttons", "forms"],
    scripts: ["presta"],
    currentPage: "presta",
  });
});

router.get(["/transition", "/sustainability"], function (req, res, next) {
  res.render("transition", {
    styles: ["header", "transition", "full-page-list", "buttons"],
    currentPage: "transition",
  });
});

router.get("/about", function (req, res, next) {
  res.render("about", {
    styles: ["header", "about", "full-page-list"],
    currentPage: "about",
  });
});

router.get("/contact", function (req, res, next) {
  res.render("contact", {
    styles: ["header", "contact", "buttons", "forms"],
    scripts: ["contact"],
    currentPage: "contact",
  });
});

router.get(["/ressources", "/resources"], function (req, res, next) {
  res.render("ongoing", {
    styles: ["ongoing"],
    currentPage: "ressources",
  });
});

router.get(["/legal"], function (req, res, next) {
  res.render("legal", {
    styles: ["header", "legal", "full-page-list"],
    currentPage: "legal",
  });
});

router.post("/send-invoice", function (req, res, next) {
  let {
    email,
    name,
    number,
    type,
    quantity,
    message,
    hours,
    requestedService,
  } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  transporter
    .sendMail({
      from: `demande devis <${email}>`,
      to: process.env.MY_EMAIL,
      subject: `< FREQUENCE 440 > Demande de devis individuel de ${name}`,
      text: message,
      html: `
      <p><strong>Prestation demandée</strong>: ${requestedService}</p>
      <p><strong>Nom du client</strong>: ${name}</p>
      <p><strong>Email du client</strong>: ${email}</p>
      <p><strong>Numéro de téléphone</strong>: ${number}</p>
      <p><strong>Nom de l'Entreprise ou Ecole du supérieur</strong>: ${type}</p>
      <p><strong>Nombre de personnes</strong>:${quantity}</p>
      <p><strong>Message</strong>: ${message}</p>
      <p><strong>Horaires</strong>: ${hours}</p>
      `,
    })
    .then(() =>
      res.json([
        "Votre demande a été envoyée avec succès",
        "Your email has been successfully sent",
      ])
    )
    .catch(
      (error) => res.json(error)
      // res.json([
      //   "Une erreur s'est produite, veuillez réessayer",
      //   "An error occured, please try again",
      // ])
    );
});

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
      subject: `< FREQUENCE 440 > Demande de contact de ${name}`,
      text: message,
      html: `
      <p><strong>Nom du client</strong>: ${name}</p>
      <p><strong>Email du client</strong>: ${email}</p>
      <p><strong>Message</strong>: ${message}</p>
      `,
    })
    .then(() =>
      res.json([
        "Votre demande a été envoyée avec succès",
        "Your email has been successfully sent",
      ])
    )
    .catch(
      (error) => res.json(error)
      // res.json([
      //   "Une erreur s'est produite, veuillez réessayer",
      //   "An error occured, please try again",
      // ])
    );
});

router.post("/send-complete-invoice", function (req, res, next) {
  console.log(req.body);
  let { email, name, number, clientType, address, services } = req.body;
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  let servicesContent = "";
  services.forEach((service, index) => {
    servicesContent += `
    <div>
      <p>Prestation numéro ${index + 1}: </p>
      <ul>
        <li><strong>Type de prestation</strong>: ${service.type}</li>
        <li><strong>Nom de la prestation</strong>: ${service.name}</li>
        <li><strong>Nombre de personnes</strong>: ${service.quantity}</li>
        <li><strong>Message spécifique à cette prestation</strong>: ${
          service.message
        }</li>
      </ul>
    </div>`;
  });
  transporter
    .sendMail({
      from: `demande devis complet <${email}>`,
      to: process.env.MY_EMAIL,
      subject: `< FREQUENCE 440 > Demande de devis complet de ${name}`,
      text: name,
      html: `
      <p><strong>Nom du client</strong>: ${name}</p>
      <p><strong>Email du client</strong>: ${email}</p>
      <p><strong>Numéro de téléphone</strong>: ${number}</p>
      <p><strong>Nom de l'Entreprise ou Ecole du supérieur</strong>: ${clientType}</p>
      <p><strong>Adresse</strong>: ${address}</p>
      <p><strong>Services demandés</strong>:${servicesContent}</p>
      `,
    })
    .then(() =>
      res.json([
        "Votre demande a été envoyée avec succès",
        "Your email has been successfully sent",
      ])
    )
    .catch(
      (error) => res.json(error)
      // res.json([
      //   "Une erreur s'est produite, veuillez réessayer",
      //   "An error occured, please try again",
      // ])
    );
});

module.exports = router;
