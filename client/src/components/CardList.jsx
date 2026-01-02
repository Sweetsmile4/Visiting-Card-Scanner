const CardList = ({ cards }) => {
  return (
    <div>
      {cards.map((card) => (
        <div key={card._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <p><b>Name:</b> {card.name}</p>
          <p><b>Phone:</b> {card.phone}</p>
          <p><b>Email:</b> {card.email}</p>
          <p><b>Company:</b> {card.company}</p>
          <p><b>Address:</b> {card.address}</p>
          <img src={`http://localhost:5000/${card.imageUrl}`} width="200" />
        </div>
      ))}
    </div>
  );
};

export default CardList;
