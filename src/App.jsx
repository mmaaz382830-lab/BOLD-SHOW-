import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import About from './pages/About'

import { CartProvider } from './context/CartContext'

// Empty route placeholders
const Collections = () => <div className="p-24 text-center text-gray-400 font-sans">Collections Page (Placeholder)</div>
const Drops = () => <div className="p-24 text-center text-gray-400 font-sans">Drops Page (Placeholder)</div>

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen w-full bg-[#09090F] text-white font-sans">
          <Navbar />
          <Routes>
            <Route path="/" element={<div className="page-transition"><Hero /></div>} />
            <Route path="/shop" element={<div className="page-transition"><Shop /></div>} />
            <Route path="/collections" element={<div className="page-transition"><Collections /></div>} />
            <Route path="/product/:id" element={<div className="page-transition"><ProductDetail /></div>} />
            <Route path="/cart" element={<div className="page-transition"><Cart /></div>} />
            <Route path="/checkout" element={<div className="page-transition"><Checkout /></div>} />
            <Route path="/order-success" element={<div className="page-transition"><OrderSuccess /></div>} />
            <Route path="/about" element={<div className="page-transition"><About /></div>} />
            <Route path="/drops" element={<div className="page-transition"><Drops /></div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
