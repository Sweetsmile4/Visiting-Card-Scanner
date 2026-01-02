const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");

const OCR_CONFIG = {
  language: "eng",
  tessedit_char_whitelist:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.-+() "
};

/**
 * Extracts text from an image file using Tesseract OCR
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<string>} Extracted text from the image
 * @throws {Error} If file doesn't exist or OCR fails
 */
const extractTextFromImage = async (imagePath) => {
  // Validate file exists
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image file not found: ${imagePath}`);
  }

  try {
    const result = await Tesseract.recognize(imagePath, OCR_CONFIG.language, {
      tessedit_char_whitelist: OCR_CONFIG.tessedit_char_whitelist
    });

    if (!result.data.text) {
      throw new Error("No text extracted from image");
    }

    return result.data.text;
  } catch (error) {
    throw new Error(`OCR processing failed: ${error.message}`);
  }
};

module.exports = extractTextFromImage;
