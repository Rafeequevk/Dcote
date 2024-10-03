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

    // This object will map each item to its associated images
    const imageMap = {};

    // For each uploaded file, we'll organize them by the item they belong to
    images.forEach((file) => {
      const itemIndex = file.fieldname.split("[")[1].split("]")[0]; // Extract the item index from the field name
      if (!imageMap[itemIndex]) {
        imageMap[itemIndex] = [];
      }
      imageMap[itemIndex].push(`/images/${file.filename}`); // Store the image paths for each item
    });

    const newBooking = {
      billNo,
      customerName,
      mobileNumber,
      deliveryDate,
      staffAttended,
      items: items.map((item, index) => ({
        ...item,
        imageUrl: imageMap[index] || [], // Associate each item with the corresponding image path
      })),
    };

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

// export async function editBooking(req, res) {
//   const { customerName, billNo, deliveryDate, items } = req.body;
//   try {
//     if (!customerName || !billNo || !deliveryDate || !items) {
//       return res.status(400).send({
//         message: "Send all required fields",
//       });
//     }
//     const { id } = req.params;

//     const newBooking = {
//       billNo,
//       customerName,
//       mobileNumber,
//       deliveryDate,
//       items,
//     };

//     const result = await Booking.findByIdAndUpdate(id, newBooking);
//     if (result === null) {
//       return res.status(404).json({ message: "Booking  Not Found" });
//     }
//     res
//       .status(201)
//       .json({ message: "Booking Upated Succesfully", Booking: result });
//   } catch (error) {
//     console.error("Error updating Booking:", error.message);
//     res.status(500).json({ error: "Failed to update Booking" });
//   }
// }


export async function editBooking(req, res) {

  const {id} = req.params

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

    // This object will map each item to its associated images
    const imageMap = {};

    // For each uploaded file, we'll organize them by the item they belong to
    images.forEach((file) => {
      const itemIndex = file.fieldname.split("[")[1].split("]")[0]; // Extract the item index from the field name
      if (!imageMap[itemIndex]) {
        imageMap[itemIndex] = [];
      }
      imageMap[itemIndex].push(`/images/${file.filename}`); // Store the image paths for each item
    });

    const existingBooking = await Booking.findById(id);
    if (!existingBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const updatedItems = items.map((item, index) => {
      const existingImages = existingBooking.items[index].imageUrl || [];
      const newImages = imageMap[index] || [];

      return {
        ...item,
        imageUrl: [...existingImages, ...newImages], // Merge existing and new images
      };
    });


    const newBooking = {
      billNo,
      customerName,
      mobileNumber,
      deliveryDate,
      staffAttended,
      items: updatedItems,
    };

    const result = await Booking.findByIdAndUpdate(id, newBooking);
    if (!result) {
      return response.status(404).json({ message: 'Booking not found' });
    }
    res.status(201).json({ message: "Booking Updated", Booking: result });
  } catch (error) {
    console.error("Error Updating Booking:", error.message);
    res.status(500).json({ error: "Failed to Update Booking" });
  }
}

export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking  Not Found" });
    }

    const images = [];
    booking.items.forEach((item) => {
      if (item.imageUrl && item.imageUrl.length > 0) {
        item.imageUrl.forEach((url) => {
          images.push(url);
        });
      }
    });

   

    images.forEach((img) => {
      deleteFile(img);
    });

    const result = await Booking.findByIdAndDelete(id);

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
