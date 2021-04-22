const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "singhealthbot@outlook.com",
    pass: "Singhealthb0t",
  },
});

const options = {
  from: "singhealthbot@outlook.com",
  to: "tankaye@gmail.com",
  subject: "Sending email with node.js!",
  text: "wow! Tha's simple",
};

transporter.sendMail(options, function (err, info) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Sent: " + info.response);
});
