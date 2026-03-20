const nodemailer = require("nodemailer");
require("dotenv").config(); // make sure .env is loaded

// ✅ Reuse transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// ✅ Accept an object { to, subject, text }
const sendMail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: to || process.env.EMAIL_USER, // default to your email if 'to' not provided
    subject,
    text,
  });
};

module.exports = sendMail;