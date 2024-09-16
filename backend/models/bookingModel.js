import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the item
  quantity: { type: Number, required: true }, // Quantity of the item
  price: { type: Number, required: true }, // Price of the item
  imageUrl: { type: [String], required: true }, // URLS or path of the item image
});

const bookingSchema = new mongoose.Schema({
  billNo: { type: String, required: true, unique: true }, // Unique bill number
  mobileNumber:{type:Number, required:true, unique:true},
  customerName: { type: String, required: true }, // Name of the customer or person
  deliveryDate: { type: Date, required: true }, // Delivery date
  staffAttended:{type:String, required:true},
  items: [itemSchema], // Array of items (each item contains name, quantity, price, and image)
  
},{
    timestamps:true
});
const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
