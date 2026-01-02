import { useState } from "react";
import API from "../services/api";
import "./UploadCard.css";

const UploadCard = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setImage(file);
      setError(null);

      // Show preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await API.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setExtractedData(res.data);
      setImage(null);
      setImagePreview(null);
      onUpload();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to process card. Please try again."
      );
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="image-input">Upload Card Image</label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
          />
        </div>

        {imagePreview && (
          <div className="preview-container">
            <img src={imagePreview} alt="Preview" className="preview-image" />
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={!image || loading}
          className="submit-button"
        >
          {loading ? "Scanning..." : "Upload Card"}
        </button>
      </form>

      {extractedData && (
        <div className="extracted-data">
          <h3>Extracted Data</h3>
          <div className="data-grid">
            {extractedData.name && (
              <div className="data-item">
                <strong>Name:</strong>
                <span>{extractedData.name}</span>
              </div>
            )}
            {extractedData.phone && (
              <div className="data-item">
                <strong>Phone:</strong>
                <span>{extractedData.phone}</span>
              </div>
            )}
            {extractedData.email && (
              <div className="data-item">
                <strong>Email:</strong>
                <span>{extractedData.email}</span>
              </div>
            )}
            {extractedData.company && (
              <div className="data-item">
                <strong>Company:</strong>
                <span>{extractedData.company}</span>
              </div>
            )}
            {extractedData.address && (
              <div className="data-item">
                <strong>Address:</strong>
                <span>{extractedData.address}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
