import './InitialSelectionScreen.css'

const InitialSelectionScreen = ({ onSelectView, onSelectOrder }) => {
  return (
    <div className="initial-selection-screen">
      <div className="initial-selection-container">
        <div className="initial-selection-header">
          <h1 className="initial-selection-title">🍱 Restaurante Japonés</h1>
          <p className="initial-selection-subtitle">Bienvenido</p>
        </div>

        <div className="selection-options">
          <button
            className="selection-option view-menu"
            onClick={onSelectView}
          >
            <div className="selection-option-icon">📋</div>
            <h2 className="selection-option-title">Ver Carta</h2>
            <p className="selection-option-description">
              Explora todos nuestros platos disponibles
            </p>
          </button>

          <button
            className="selection-option make-order"
            onClick={onSelectOrder}
          >
            <div className="selection-option-icon">🛒</div>
            <h2 className="selection-option-title">Hacer Pedido</h2>
            <p className="selection-option-description">
              Realiza tu pedido seleccionando buffet y mesa
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InitialSelectionScreen
