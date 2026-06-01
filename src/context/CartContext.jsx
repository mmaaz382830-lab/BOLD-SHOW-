import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (product, size) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.productId === product.id && item.size === size
      )
      if (existing) {
        return prev.map(item =>
          item.productId === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { productId: product.id, size, quantity: 1, product }]
    })
  }

  const removeFromCart = (productId, size) => {
    setCart(prev => prev.filter(
      item => !(item.productId === productId && item.size === size)
    ))
  }

  const updateQuantity = (productId, size, change) => {
    setCart(prev =>
      prev.map(item =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
