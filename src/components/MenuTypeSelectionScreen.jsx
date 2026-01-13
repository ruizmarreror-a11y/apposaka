import { useState } from 'react'
import { menuTypes } from '../data/menuData'
import './MenuTypeSelectionScreen.css'

const MenuTypeSelectionScreen = ({ onComplete, onBack }) => {
  const [selectedMenu, setSelectedMenu] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedMenu) {
      onComplete(selectedMenu)
    }
  }

  return (
    <div className="menu-type-selection-screen">
      <div className="menu-type-selection-container">
        <div className="menu-type-selection-header">
          <h1 className="menu-type-selection-title">🍱 Restaurante Japonés</h1>
          <p className="menu-type-selection-subtitle">Ver Carta - Selecciona el tipo de menú</p>
        </div>

        <form onSubmit={handleSubmit} className="menu-type-selection-form">
          <div className="form-section">
            <h2 className="section-title">Selecciona el tipo de menú</h2>
            <div className="menu-options">
              {Object.values(menuTypes).map((menu) => (
                <button
                  key={menu.id}
                  type="button"
                  className={`menu-option ${selectedMenu === menu.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMenu(menu.id)}
                >
                  <div className="menu-option-content">
                    <h3>{menu.name}</h3>
                    <p>{menu.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="back-button"
              onClick={onBack}
            >
              Volver
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={!selectedMenu}
            >
              Ver Carta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MenuTypeSelectionScreen
