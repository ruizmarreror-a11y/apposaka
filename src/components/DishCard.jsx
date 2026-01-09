import './DishCard.css'

const DishCard = ({ dish, onClick }) => {
  return (
    <div className="dish-card" onClick={onClick}>
      <div className="dish-image-container">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="dish-image"
          onError={(e) => {
            // Si la imagen falla, usar una imagen de fallback
            e.target.src = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop&q=90';
          }}
        />
        <div className="dish-number">{dish.number}</div>
      </div>
      <div className="dish-info">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
      </div>
      <div className="dish-overlay">
        <span className="dish-overlay-text">Ver detalles</span>
      </div>
    </div>
  )
}

export default DishCard

