import "./CardList.css";

const CardList = ({ cards, onDelete }) => {
  if (!cards || cards.length === 0) {
    return (
      <div className="empty-state">
        <p>No cards saved yet. Upload one to get started!</p>
      </div>
    );
  }

  return (
    <div className="card-list">
      <h2>Saved Cards ({cards.length})</h2>
      <div className="cards-grid">
        {cards.map((card) => (
          <div key={card._id} className="card-item">
            <div className="card-image-wrapper">
              <img
                src={`${import.meta.env.VITE_API_URL}/${card.imageUrl}`}
                alt={card.name}
                className="card-image"
              />
            </div>
            <div className="card-content">
              {card.name && (
                <div className="card-field">
                  <strong>Name:</strong>
                  <span>{card.name}</span>
                </div>
              )}
              {card.phone && (
                <div className="card-field">
                  <strong>Phone:</strong>
                  <a href={`tel:${card.phone}`}>{card.phone}</a>
                </div>
              )}
              {card.email && (
                <div className="card-field">
                  <strong>Email:</strong>
                  <a href={`mailto:${card.email}`}>{card.email}</a>
                </div>
              )}
              {card.company && (
                <div className="card-field">
                  <strong>Company:</strong>
                  <span>{card.company}</span>
                </div>
              )}
              {card.address && (
                <div className="card-field">
                  <strong>Address:</strong>
                  <span>{card.address}</span>
                </div>
              )}
              {card.createdAt && (
                <div className="card-field">
                  <small>
                    {new Date(card.createdAt).toLocaleDateString()}
                  </small>
                </div>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(card._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
