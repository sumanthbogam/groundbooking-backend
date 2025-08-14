const {bookingModel} = require("../models/booking.js") ;


const bookSlot = async (req, res) => {
  try {
    console.log("jelllooooS")
    console.log(req.body);
    const { userId, groundId, date, timeslot } = req.body;

    const newBooking = new bookingModel({
      user: userId,
      groundId,
      date,
      timeslot,
    });

    await newBooking.save();
    res.status(200).json({ message: "Slot booked successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Slot already booked or invalid data" });
  }
};


const getBookedSlots = async (req, res) => {
  try {
    const { groundId, date } = req.query;

    const booked = await bookingModel.find({ groundId, date }).select("timeslot");
    const bookedSlots = booked.map((b) => b.timeslot);

    res.status(200).json({ bookedSlots });
  } catch (err) {
    res.status(500).json({ error: "Error fetching booked slots" });
  }
};


module.exports={bookSlot,getBookedSlots};