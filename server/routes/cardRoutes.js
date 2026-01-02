const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadCard,
  getCards,
  deleteCard
} = require("../controllers/cardControllers");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedMimes = /jpeg|jpg|png|gif|webp/;
    const mime = allowedMimes.test(file.mimetype);
    const ext = allowedMimes.test(path.extname(file.originalname).toLowerCase());

    if (mime && ext) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.post("/upload", upload.single("image"), uploadCard);
router.get("/", getCards);
router.delete("/:id", deleteCard);

module.exports = router;
