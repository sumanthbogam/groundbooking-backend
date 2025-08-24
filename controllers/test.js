require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTest() {
  try {
    await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: "bogamsumanth69@gmail.com",  // your Gmail
      subject: "Test Email",
      text: "Hello, this is a test from Nodemailer & Brevo",
    });
    console.log("Test email sent");
  } catch (err) {
    console.error("Failed to send test email:", err);
  }
}

sendTest();
