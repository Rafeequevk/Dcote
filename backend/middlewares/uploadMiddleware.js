import multer from 'multer'
import path from  'path';
// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +'Dcot'+path.extname(file.originalname)); // Unique file name
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit the file size to 5MB
  fileFilter: function (req, file, cb) {
    // Check file type
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
});
export default upload
