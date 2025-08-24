const { bookingModel } = require("../models/booking.js");
const transporter = require("./config.js");
const { userModel } = require("../models/userModel.js");
const Ground = require("../models/ground.js");

const bookSlot = async (req, res) => {
  try {
    console.log("Booking request received:", req.body);
    const { userId, groundId, date, timeslot, name, image } = req.body;
    const newBooking = new bookingModel({
      user: userId,
      groundId,
      date,
      timeslot,
      image,
      name
    });

    await newBooking.save();
    console.log("Booking saved");


    
    const user = await userModel.findById(userId);
    const ground = await Ground.findById(groundId).populate("createdBy"); 
    const adminEmail = ground?.createdBy?.email;
    const userEmail = user?.email;
    console.log("Admin email:", userEmail);

    console.log("Admin email:", adminEmail);
 
    if (adminEmail) {
      try {
        await transporter.sendMail({
          from: `"Ground Booking App" <${process.env.EMAIL_USER}>`,
          to: adminEmail,
          replyTo: userEmail, 
          subject: "New Ground Booking",
          text: `Hello Admin,

You have a new booking:

Ground: ${name}
Date: ${date}
Timeslot: ${timeslot}
Booked by: ${userEmail}

Please reply directly to this email to communicate.`
        });
        console.log("Email sent to admin");
      } catch (err) {
        console.error("Failed to send email to admin:", err);
      }
    }

    if (userEmail) {
      try {
        await transporter.sendMail({
          from: `"Ground Booking App" <${process.env.EMAIL_USER}>`,
          to: userEmail,
          subject: "Booking Confirmation",
          text: `Hello ${user.name},

Your booking is confirmed:
Ground: ${name}
Date: ${date}
Timeslot: ${timeslot}

Thank you for booking!`
        });
        console.log("Email sent to user");
      } catch (err) {
        console.error("Failed to send email to user:", err);
      }
    }

    res.status(200).json({ message: "Slot booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);

    if (err.code === 11000) {
      return res.status(400).json({ error: "This timeslot is already booked" });
    }

    res.status(500).json({ error: "Something went wrong" });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    const { groundId, date } = req.query;
    const booked = await bookingModel.find({ groundId, date }).select("timeslot");
    const bookedSlots = booked.map(b => b.timeslot);

    res.status(200).json({ bookedSlots });
  } catch (err) {
    console.error("Error fetching booked slots:", err);
    res.status(500).json({ error: "Error fetching booked slots" });
  }
};

module.exports = { bookSlot, getBookedSlots };
