import { useState } from 'react'
import { menuItems, categories, menuTypes } from '../data/menuData'
import { FaArrowLeft } from 'react-icons/fa'
import DishCard from './DishCard'
import './MenuViewScreen.css'

const MenuViewScreen = ({ menuType, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('ensaladas')
  const [selectedDish, setSelectedDish] = useState(null)

  // Filtrar por categoría y tipo de buffet
  const filteredItems = menuItems.filter(item => {
    const categoryMatch = item.category === selectedCategory
    if (!categoryMatch) return false
    
    // Si no hay buffet seleccionado, mostrar todos
    if (!menuType) return true
    
    // Filtrar por tipo de buffet
    // Si es buffet de día, solo mostrar platos de buffetDia
    if (menuType === 'buffetDia') {
      return item.buffetType?.includes('buffetDia')
    }
    
    // Si es buffet de noche, mostrar platos de buffetDia, buffetNoche y complementarios
    if (menuType === 'buffetNoche') {
      return item.buffetType?.includes('buffetDia') || item.buffetType?.includes('buffetNoche') || item.buffetType?.includes('complementarios')
    }
    
    // Si es buffet fin de semana, mostrar platos de buffetDia, buffetNoche y buffetFinSemana
    if (menuType === 'buffetFinSemana') {
      return item.buffetType?.includes('buffetDia') || item.buffetType?.includes('buffetNoche') || item.buffetType?.includes('buffetFinSemana')
    }
    
    return true
  })

  const menuTypeName = menuType ? menuTypes[menuType]?.name : 'Todos los platos'

  return (
    <div className="menu-view-screen">
      <header className="menu-view-header">
        <button className="back-button" onClick={onBack}>
          <FaArrowLeft /> Volver
        </button>
        <div className="header-info">
          <h1 className="menu-view-title">🍱 Carta Digital</h1>
          <p className="menu-view-subtitle">
            {menuTypeName}
          </p>
        </div>
      </header>

      <div className="menu-view-content">
        <aside className="categories-sidebar">
          <h2 className="categories-title">Categorías</h2>
          <div className="categories-list">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="dishes-section">
          <h2 className="section-category-title">
            {categories.find(c => c.id === selectedCategory)?.icon}{' '}
            {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="dishes-grid">
            {filteredItems.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={() => setSelectedDish(dish)}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedDish && (
        <div className="modal-overlay" onClick={() => setSelectedDish(null)}>
          <div className="modal-content-view" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedDish(null)}
            >
              ×
            </button>
            <div className="modal-header-view">
              <div className="modal-image-container-view">
                <img 
                  src={selectedDish.image} 
                  alt={selectedDish.name} 
                  className="modal-image-view"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&h=500&fit=crop&q=90';
                  }}
                />
                <div className="modal-number-view">{selectedDish.number}</div>
              </div>
              <div className="modal-title-section-view">
                <h2 className="modal-title-view">{selectedDish.name}</h2>
                <p className="modal-description-view">{selectedDish.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuViewScreen
