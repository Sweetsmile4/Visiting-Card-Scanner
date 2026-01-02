const Card = require("../models/Card");
const extractTextFromImage = require("../utils/ocr");

const extractDetails = (text) => {
  return {
    email: text.match(/\S+@\S+\.\S+/)?.[0] || "",
    phone: text.match(/(\+91)?\s?\d{10}/)?.[0] || "",
    name: text.split("\n")[0] || "",
    company: text.split("\n")[1] || "",
    address: text
  };
};

exports.uploadCard = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const text = await extractTextFromImage(imagePath);
    const details = extractDetails(text);

    const card = await Card.create({
      ...details,
      imageUrl: imagePath
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
