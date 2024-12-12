const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAILID,
        pass: process.env.EMAILPASSWORD,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAILID,
      to: email,
      subject: subject,
      text: text,
    });
    return {
      success: true,
      message: "mail Sent",
    };
  } catch (err) {
    return {
      success: false,
      message: "Email can't be sent, try again",
      error: err.message,
    };
  }
};
