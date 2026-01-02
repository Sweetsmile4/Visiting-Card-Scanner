import { useEffect, useState } from "react";
import UploadCard from "./components/UploadCard";
import CardList from "./components/CardList";
import API from "./services/api";

function App() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    const res = await API.get("/");
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div>
      <h1>Visiting Card Scanner</h1>
      <UploadCard onUpload={() => fetchCards()} />
      <CardList cards={cards} />
    </div>
  );
}

export default App;
