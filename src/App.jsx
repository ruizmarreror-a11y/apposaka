import { useState } from 'react'
import InitialSelectionScreen from './components/InitialSelectionScreen'
import WelcomeScreen from './components/WelcomeScreen'
import MenuTypeSelectionScreen from './components/MenuTypeSelectionScreen'
import MenuScreen from './components/MenuScreen'
import MenuViewScreen from './components/MenuViewScreen'
import OrderSummary from './components/OrderSummary'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState('initial')
  const [orderData, setOrderData] = useState({
    menuType: null,
    tableNumber: null,
    items: []
  })
  const [viewMenuType, setViewMenuType] = useState(null)

  const handleSelectView = () => {
    setCurrentStep('menuTypeSelection')
  }

  const handleSelectOrder = () => {
    setCurrentStep('welcome')
  }

  const handleMenuTypeSelected = (menuType) => {
    setViewMenuType(menuType)
    setCurrentStep('menuView')
  }

  const handleWelcomeComplete = (menuType, tableNumber) => {
    setOrderData(prev => ({ ...prev, menuType, tableNumber }))
    setCurrentStep('menu')
  }

  const handleOrderComplete = (items) => {
    setOrderData(prev => ({ ...prev, items }))
    setCurrentStep('summary')
  }

  const handleNewOrder = () => {
    setOrderData({
      menuType: null,
      tableNumber: null,
      items: []
    })
    setCurrentStep('initial')
  }

  return (
    <div className="app">
      {currentStep === 'initial' && (
        <InitialSelectionScreen
          onSelectView={handleSelectView}
          onSelectOrder={handleSelectOrder}
        />
      )}
      {currentStep === 'menuTypeSelection' && (
        <MenuTypeSelectionScreen
          onComplete={handleMenuTypeSelected}
          onBack={() => setCurrentStep('initial')}
        />
      )}
      {currentStep === 'menuView' && (
        <MenuViewScreen
          menuType={viewMenuType}
          onBack={() => setCurrentStep('menuTypeSelection')}
        />
      )}
      {currentStep === 'welcome' && (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      )}
      {currentStep === 'menu' && (
        <MenuScreen
          orderData={orderData}
          onOrderComplete={handleOrderComplete}
          onBack={() => setCurrentStep('welcome')}
        />
      )}
      {currentStep === 'summary' && (
        <OrderSummary
          orderData={orderData}
          onNewOrder={handleNewOrder}
        />
      )}
    </div>
  )
}

export default App

