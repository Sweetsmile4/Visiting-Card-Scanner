import { useEffect, useState } from "react";
import UploadCard from "./components/UploadCard";
import CardList from "./components/CardList";
import API from "./services/api";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/");
      setCards(res.data || []);
    } catch (err) {
      console.error("Failed to fetch cards:", err);
      setError("Failed to load cards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }

    try {
      await API.delete(`/${cardId}`);
      setCards((prev) => prev.filter((card) => card._id !== cardId));
    } catch (err) {
      console.error("Failed to delete card:", err);
      setError("Failed to delete card. Please try again.");
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Visiting Card Scanner</h1>
        <p className="subtitle">
          Scan and digitize your business cards with OCR
        </p>
      </header>

      <main className="app-main">
        <UploadCard onUpload={fetchCards} />

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading">Loading cards...</div>
        ) : (
          <CardList cards={cards} onDelete={handleDeleteCard} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Visiting Card Scanner. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
