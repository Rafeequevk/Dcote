import Booking from "../models/bookingModel.js";
import deleteFile from "../utils/deleteFile.js";

export async function createBooking(req, res) {
  const {
    billNo,
    customerName,
    mobileNumber,
    deliveryDate,
    staffAttended,
    items,
  } = req.body;

  try {
    if (
      !customerName ||
      !billNo ||
      !deliveryDate ||
      !items ||
      !mobileNumber ||
      !staffAttended
    ) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }

    const images = req.files;
    console.log(images);

    const imagePaths = images.map((file) => `/images/${file.filename}`);

    console.log(imagePaths);

    const newBooking = {
      billNo,
      customerName,
      mobileNumber,
      deliveryDate,
      staffAttended,
      items: items.map((item, index) => ({
        ...item,
        imageUrl: imagePaths[index] || null, // Associate each item with the corresponding image path
      })),
    };
    console.log(newBooking);

    const booking = await Booking.create(newBooking);
    res.status(201).json({ message: "Booked", Booking: booking });
  } catch (error) {
    console.error("Error saving Booking:", error.message);
    res.status(500).json({ error: "Failed to create Booking" });
  }
}

export async function showBooking(req, res) {
  try {
    const booking = await Booking.find({});
    return res.status(200).json({
      message: "success",

      count: booking.length,
      data: booking,
    });
  } catch (error) {
    console.error("Error saving Booking:", error.message);
    res.status(500).json({ error: "Failed to create Booking" });
  }
}

export async function showBookingById(req, res) {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    return res.status(200).json(booking);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to Find Booking" });
  }
}

export async function editBooking(req, res) {
  const { customerName, billNo, deliveryDate, items } = req.body;
  try {
    if (!customerName || !billNo || !deliveryDate || !items) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = req.params;

    const newBooking = {
      billNo,
      customerName,
      mobileNumber,
      deliveryDate,
      items,
    };

    const result = await Booking.findByIdAndUpdate(id, newBooking);
    if (result === null) {
      return res.status(404).json({ message: "Booking  Not Found" });
    }
    res
      .status(201)
      .json({ message: "Booking Upated Succesfully", Booking: result });
  } catch (error) {
    console.error("Error updating Booking:", error.message);
    res.status(500).json({ error: "Failed to update Booking" });
  }
}

export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    const items =  Booking.findById(id)
    .then(items =>{

      const images= items.items.imageUrl

      images.forEach(img => {
        deleteFile(img)

      });


      
    })



    const result = await Booking.findByIdAndDelete(id);
    console.log(id);

    if (result === null) {
      return res.status(404).json({ message: "Booking  Not Found" });
    }
    res
      .status(201)
      .json({ message: "Booking Deleted Succesfully", Booking: result });
  } catch (error) {
    console.error("Error Deleted Booking:", error.message);
    res.status(500).json({ error: "Failed to Delete Booking" });
  }
}
