import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../products.js'
import { useCart } from '../context/CartContext'

export default function Shop() {
  const { addToCart } = useCart()
  const [activeFilter, setActiveFilter] = useState('All')
  
  const categories = ['All', 'Running', 'Basketball', 'Lifestyle', 'Training']

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter(product => product.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div 
      className="min-h-screen w-full select-none"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        paddingTop: '72px'
      }}
    >
      <style>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .product-card-anim {
          opacity: 0;
          animation: cardFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .cyber-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          transition: var(--transition);
        }
        .cyber-card:hover {
          border-color: var(--color-accent-cyan);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }

        .cart-btn {
          background-color: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: var(--transition);
        }
        .cart-btn:hover {
          background-color: var(--color-accent-cyan);
          color: #000000;
          border-color: var(--color-accent-cyan);
        }
      `}</style>

      {/* FILTER BAR */}
      <div 
        className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 md:px-16 py-6"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        {/* Left Side */}
        <div 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.25em'
          }}
        >
          ALL DROPS
        </div>

        {/* Right Side - Category Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((category) => {
            const isActive = activeFilter === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-300 border"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderRadius: '24px',
                  backgroundColor: isActive ? 'var(--color-accent-cyan)' : 'transparent',
                  color: isActive ? '#000000' : 'var(--color-text-secondary)',
                  borderColor: isActive ? 'var(--color-accent-cyan)' : 'var(--color-border)',
                }}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="px-6 md:px-16 py-12">
        {filteredProducts.length === 0 ? (
          <div 
            className="w-full py-24 text-center text-sm tracking-wider"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)'
            }}
          >
            NO PRODUCTS RETRIEVED IN THIS SECTOR
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="product-card-anim cyber-card flex flex-col overflow-hidden relative"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  textDecoration: 'none'
                }}
              >
                {/* TOP SECTION (image area) */}
                <div 
                  className="w-full h-[280px] relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg))'
                  }}
                >
                  {/* Tag Badge */}
                  {product.tag && (
                    <span 
                      className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 z-10"
                      style={{
                        backgroundColor: 'var(--color-accent-cyan)',
                        color: '#000000',
                        fontFamily: 'var(--font-display)'
                      }}
                    >
                      {product.tag}
                    </span>
                  )}

                  {/* Placeholder Name */}
                  <div 
                    className="text-[11px] uppercase tracking-[0.3em] px-4 text-center font-bold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {product.name}
                  </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 
                    className="text-white font-bold text-sm tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {product.name}
                  </h3>

                  <div 
                    className="text-[13px] mt-1 font-medium tracking-wide"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    {product.colorway}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div 
                      className="text-base font-black tracking-widest"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-accent-cyan)'
                      }}
                    >
                      CR {product.price.toLocaleString()}
                    </div>

                    <button
                      type="button"
                      className="cart-btn text-[10px] font-black tracking-wider uppercase px-4 py-2 rounded-lg cursor-pointer"
                      style={{
                        fontFamily: 'var(--font-display)'
                      }}
                      onClick={(e) => { e.preventDefault(); addToCart(product, 'UK 8') }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
