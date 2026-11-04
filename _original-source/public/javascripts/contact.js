let checkFrEn = document.querySelector(".catchphrase").innerHTML;

function sendContact() {
  let contactToSend = {
    email: document.querySelector('input[name="email"]').value,
    name: document.querySelector('input[name="name"]').value,
    message: document.querySelector('textarea[name="message"]').value,
  };

  let additionalMessage = document.querySelector("#contact-form .additional");
  if (
    contactToSend.email === "" ||
    contactToSend.name === "" ||
    contactToSend.message === ""
  ) {
    additionalMessage.innerHTML =
      checkFrEn === "Je suis à votre écoute"
        ? "<p>Veuillez renseigner tous les champs obligatoires</p>"
        : "Please enter every mandatory field";
    return;
  }
  axios
    .post("/send-contact", contactToSend)
    .then((success) => {
      additionalMessage.innerHTML =
        checkFrEn === "Je suis à votre écoute"
          ? `<p>${success.data.fr}</p>`
          : `<p>${success.data.en}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
}



// Event listeners

document.getElementById("send-contact").onclick = sendContact;
