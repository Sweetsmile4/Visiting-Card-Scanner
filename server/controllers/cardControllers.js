const Card = require("../models/Card");
const extractTextFromImage = require("../utils/ocr");
const fs = require("fs");

/**
 * Cleans and normalizes extracted text
 */
const cleanText = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/\n+/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Email regex pattern for validation
 */
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

/**
 * Phone regex pattern - matches various phone formats
 */
const PHONE_REGEX = /(\+?\d[\d\s().-]{7,}\d)/g;

/**
 * Extracts contact details from OCR text
 */
const extractDetails = (text) => {
  const cleanedText = cleanText(text);
  const lines = cleanedText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const email = cleanedText.match(EMAIL_REGEX)?.[0] || "";
  const phoneMatches = cleanedText.match(PHONE_REGEX);
  const phone = phoneMatches ? phoneMatches[0].replace(/[\s()-]/g, "") : "";

  const name = lines[0] || "";
  const company = lines.find(
    (line) =>
      !line.includes("@") &&
      !line.match(/\d{6,}/) &&
      line.length > 3 &&
      line !== name
  ) || "";

  const address = lines
    .slice(2)
    .filter((line) => line !== email && line !== phone && line !== company)
    .join(", ")
    .substring(0, 500);

  return { name, phone, email, company, address };
};

/**
 * Upload and process a visiting card image
 */
exports.uploadCard = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imagePath = req.file.path;

    // Extract text using OCR
    const text = await extractTextFromImage(imagePath);
    const details = extractDetails(text);

    // Validate extracted data
    if (!details.name || details.name.length < 2) {
      return res.status(400).json({
        message: "Could not extract name from card. Please try another image."
      });
    }

    // Create card in database
    const card = await Card.create({
      ...details,
      imageUrl: imagePath
    });

    res.status(201).json(card);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: error.message || "Failed to process card"
    });
  }
};

/**
 * Retrieve all stored visiting cards
 */
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 }).limit(100);
    res.json(cards);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({
      message: "Failed to retrieve cards"
    });
  }
};

/**
 * Delete a visiting card
 */
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Delete associated image file
    if (card.imageUrl && fs.existsSync(card.imageUrl)) {
      fs.unlink(card.imageUrl, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete card" });
  }
};
