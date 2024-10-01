import express from 'express'
import { createBooking,deleteBooking,editBooking,showBooking, showBookingById, } from '../controllers/bookingController.js'
import upload from '../middlewares/uploadMiddleware.js'

const router = express.Router()

router.get('/', showBooking)
router.get('/:id', showBookingById)
router.delete('/:id',deleteBooking)

// Handle file uploads and booking creation
// router.post('/',upload.array('images', 10) ,createBooking)
router.post('/',upload.any() ,createBooking)

// Handle file uploads and booking updates
router.put('/:id', upload.any(),editBooking); // Allow image updates

export default router;