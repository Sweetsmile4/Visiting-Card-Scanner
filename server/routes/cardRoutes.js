const express = require("express");
const multer = require("multer");
const {
  uploadCard,
  getCards
} = require("../controllers/cardController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadCard);
router.get("/", getCards);

module.exports = router;
