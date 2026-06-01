import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../products.js'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { addToCart } = useCart()
  const { id } = useParams()
  const productId = parseInt(id, 10)
  const product = products.find(p => p.id === productId)

  const [selectedSize, setSelectedSize] = useState('UK 8')

  if (!product) {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center bg-[#09090F] text-white"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div 
          className="text-2xl font-black uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          PRODUCT NOT FOUND
        </div>
      </div>
    )
  }

  const sizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']

  const trustBadges = [
    { icon: '✓', text: 'Authentic Product' },
    { icon: '⚡', text: 'Fast Delivery' },
    { icon: '🔒', text: 'Secure Payment' }
  ]

  return (
    <div 
      className="min-h-screen w-full select-none pb-16"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        paddingTop: '72px'
      }}
    >
      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .anim-left-col {
          opacity: 0;
          animation: slideInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .anim-right-col {
          opacity: 0;
          animation: slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.15s;
        }

        .size-btn {
          transition: var(--transition);
        }
        .size-btn:hover:not(.active) {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
        }

        .action-btn-cart {
          transition: var(--transition);
        }
        .action-btn-cart:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 25px var(--color-accent-glow);
        }

        .action-btn-wish {
          transition: var(--transition);
        }
        .action-btn-wish:hover {
          border-color: var(--color-accent-red);
          color: var(--color-accent-red);
          box-shadow: 0 0 15px rgba(255, 45, 85, 0.15);
        }
      `}</style>

      {/* Two Column Layout container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* LEFT COLUMN — Product Display */}
        <div 
          className="anim-left-col w-full lg:w-[55%] h-[400px] md:h-[600px] relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--border-radius)'
          }}
        >
          {/* Tag badge top-left */}
          {product.tag && (
            <span 
              className="absolute top-6 left-6 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5"
              style={{
                backgroundColor: 'var(--color-accent-cyan)',
                color: '#000000',
                fontFamily: 'var(--font-display)'
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Centered product placeholder */}
          <div 
            className="text-[13px] uppercase tracking-[0.4em] text-center font-bold px-8 mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {product.name}
          </div>

          {/* 3D view label */}
          <div 
            className="text-[10px] uppercase tracking-[0.2em] font-extrabold"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-accent-cyan)'
            }}
          >
            3D VIEW COMING SOON
          </div>
        </div>

        {/* RIGHT COLUMN — Product Info */}
        <div className="anim-right-col w-full lg:w-[45%] flex flex-col justify-center gap-6">
          
          {/* Category */}
          <div 
            className="text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-accent-cyan)'
            }}
          >
            {product.category}
          </div>

          {/* Name */}
          <h1 
            className="text-white font-black uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1
            }}
          >
            {product.name}
          </h1>

          {/* Colorway */}
          <p 
            className="text-[15px] font-medium tracking-wide"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {product.colorway}
          </p>

          {/* Divider */}
          <div 
            className="w-full"
            style={{ borderTop: '1px solid var(--color-border)' }}
          />

          {/* Price & Shipping Info */}
          <div className="flex flex-col gap-1.5">
            <div 
              className="text-4xl font-black tracking-widest"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-accent-cyan)'
              }}
            >
              CR {product.price.toLocaleString()}
            </div>
            <div 
              className="text-xs font-semibold tracking-wide"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)'
              }}
            >
              Free shipping on orders above ₹999
            </div>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-3">
            <div 
              className="text-[11px] font-bold tracking-[0.2em] uppercase"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-text-secondary)'
              }}
            >
              SELECT SIZE
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((size) => {
                const isSelected = selectedSize === size
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`size-btn p-2.5 text-xs font-semibold text-center rounded-lg border bg-transparent cursor-pointer ${isSelected ? 'active' : ''}`}
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: isSelected ? '#000000' : '#FFFFFF',
                      backgroundColor: isSelected ? 'var(--color-accent-cyan)' : 'transparent',
                      borderColor: isSelected ? 'var(--color-accent-cyan)' : 'var(--color-border)'
                    }}
                  >
                    {size}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row gap-4 mt-4 w-full">
            <button
              type="button"
              className="action-btn-cart flex-1 py-4.5 text-xs font-black tracking-[0.2em] uppercase cursor-pointer text-black"
              onClick={() => addToCart(product, selectedSize)}
              style={{
                backgroundColor: 'var(--color-accent-cyan)',
                fontFamily: 'var(--font-display)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              ADD TO CART
            </button>

            <button
              type="button"
              className="action-btn-wish flex-1 py-4.5 text-xs font-black tracking-[0.2em] uppercase cursor-pointer bg-transparent border-2 text-white"
              style={{
                borderColor: 'var(--color-border)',
                fontFamily: 'var(--font-display)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              WISHLIST
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-row items-center justify-between gap-2 mt-4 pt-4 border-t border-[var(--color-border)]">
            {trustBadges.map((badge) => (
              <div 
                key={badge.text}
                className="flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)'
                }}
              >
                <span style={{ color: 'var(--color-accent-cyan)', fontWeight: 'bold' }}>
                  {badge.icon}
                </span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
