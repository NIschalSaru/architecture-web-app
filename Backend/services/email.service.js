const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const EmailService = {
  async sendMail(to, subject, text) {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
      console.log(process.env.REFRESH_TOKEN);
      oAuth2Client.setCredentials({
        refresh_token: process.env.REFRESH_TOKEN,
      });

      const accessToken = await oAuth2Client.getAccessToken();
      console.log(accessToken);
      // console.log(accessToken.token);
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_FROM,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
      };

      const result = await transport.sendMail(mailOptions);
      console.log("Email sent successfully:", result);
      return result;
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw error;
    }
  },
};

module.exports = EmailService;
