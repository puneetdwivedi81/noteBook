const express = require("express");
const router = express.Router();

const Contact = require("../schema/contact.model");
const AuthVerify = require("../middleware/authverify.middleware");
const AuthModel = require("../schema/auth.model");
const sendMail = require("../utils/sendMail"); // ✅ IMPORT HERE

router.post("/message", AuthVerify, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // logged-in user
    const user = await AuthModel.findById(req.user);

    // ✅ SAVE MESSAGE IN DB
    await Contact.create({
      name: user.name,
      email: user.email,
      message,
    });

    // ✅ EMAIL SEND HERE (IMPORTANT PLACE)
    await sendMail({
      to: "dwivedipuneet29@gmail.com", // admin email
      subject: "New Contact Message",
      text: `
New message received:

Name: ${user.name}
Email: ${user.email}
Message: ${message}
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("CONTACT ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;