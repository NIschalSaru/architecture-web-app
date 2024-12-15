const fs = require("fs");
const handlebars = require("handlebars");
const EmailService = require("../services/email.service.js");

const readHTMLFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, html) => {
      if (err) {
        return reject(err);
      }
      resolve(html);
    });
  });
};

const sendContactFormEmail = async (req, res) => {
  try {
    const html = await readHTMLFile("resource/contactFormSubmission.hbs");
    const template = handlebars.compile(html);
    const htmlToSend = template(req.body);

    await EmailService.sendMail(
      req.body.email,
      process.env.EMAIL_FROM,
      "Contact Form Submission",
      "",
      htmlToSend
    );
    return res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error in sendContactFormEmail:", error.message);
    return res.status(500).send("Failed to send email.");
  }
};

module.exports = { sendContactFormEmail };
