import { useState } from "react";
import API from "../services/api";

const UploadCard = ({ onUpload }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    const res = await API.post("/upload", formData);
    onUpload(res.data);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">
        {loading ? "Scanning..." : "Upload Card"}
      </button>
    </form>
  );
};

export default UploadCard;
