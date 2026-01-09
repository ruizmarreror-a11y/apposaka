import { useState } from 'react'
import { drinks, drinkCategories } from '../data/menuData'
import { FaArrowLeft } from 'react-icons/fa'
import './DrinkSelection.css'

const DrinkSelection = ({ onSelect, onBack }) => {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedDrink) {
      onSelect(selectedDrink)
    }
  }

  const groupedDrinks = drinkCategories.map(category => ({
    ...category,
    drinks: drinks.filter(drink => drink.category === category.id)
  }))

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  return (
    <div className="drink-selection-screen">
      <div className="drink-container">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>

        <div className="drink-header">
          <h1 className="drink-title">🍶 Selecciona tu Bebida</h1>
          <p className="drink-subtitle">La selección de bebida es obligatoria para este buffet</p>
        </div>

        <form onSubmit={handleSubmit} className="drink-form">
          <div className="drink-accordion">
            {groupedDrinks.map(category => {
              if (category.drinks.length === 0) return null
              
              const isExpanded = expandedCategories[category.id]
              
              // Agrupar por subcategoría si existe
              const subcategories = {}
              const drinksWithoutSubcategory = []
              
              category.drinks.forEach(drink => {
                if (drink.subcategory) {
                  if (!subcategories[drink.subcategory]) {
                    subcategories[drink.subcategory] = []
                  }
                  subcategories[drink.subcategory].push(drink)
                } else {
                  drinksWithoutSubcategory.push(drink)
                }
              })
              
              return (
                <div key={category.id} className="drink-accordion-item">
                  <button
                    type="button"
                    className="drink-accordion-header"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="accordion-icon">{category.icon}</span>
                    <span className="accordion-title">{category.name}</span>
                    <span className="accordion-arrow">{isExpanded ? '▼' : '▶'}</span>
                  </button>
                  
                  {isExpanded && (
                    <div className="drink-accordion-content">
                      {/* Mostrar subcategorías si existen */}
                      {Object.keys(subcategories).length > 0 && Object.entries(subcategories).map(([subcat, drinks]) => (
                        <div key={subcat} className="subcategory-group">
                          <h3 className="subcategory-title">{subcat}</h3>
                          <div className="drinks-grid">
                            {drinks.map(drink => (
                              <button
                                key={drink.id}
                                type="button"
                                className={`drink-option ${selectedDrink?.id === drink.id ? 'selected' : ''}`}
                                onClick={() => setSelectedDrink(drink)}
                              >
                                <img 
                                  src={drink.image} 
                                  alt={drink.name} 
                                  className="drink-image"
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=500&fit=crop&q=90';
                                  }}
                                />
                                <h3>{drink.name}</h3>
                                <p className="drink-price">{drink.price.toFixed(2)} €</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      {/* Mostrar bebidas sin subcategoría */}
                      {drinksWithoutSubcategory.length > 0 && (
                        <div className="drinks-grid">
                          {drinksWithoutSubcategory.map(drink => (
                            <button
                              key={drink.id}
                              type="button"
                              className={`drink-option ${selectedDrink?.id === drink.id ? 'selected' : ''}`}
                              onClick={() => setSelectedDrink(drink)}
                            >
                              <img 
                                src={drink.image} 
                                alt={drink.name} 
                                className="drink-image"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=500&fit=crop&q=90';
                                }}
                              />
                              <h3>{drink.name}</h3>
                              <p className="drink-price">{drink.price.toFixed(2)} €</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={!selectedDrink}
          >
            Continuar a la Carta
          </button>
        </form>
      </div>
    </div>
  )
}

export default DrinkSelection

