import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const navigate = useNavigate()

  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart()

  const cartItems = cart

  // Calculations
  const subtotal = cartTotal
  const gstTax = Math.round(subtotal * 0.18)
  const total = subtotal + gstTax

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div 
      className="min-h-screen w-full select-none pb-16"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        paddingTop: '72px'
      }}
    >
      <style>{`
        @keyframes rowFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes summarySlideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .cart-item-anim {
          opacity: 0;
          animation: rowFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .summary-anim {
          opacity: 0;
          animation: summarySlideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .qty-btn {
          transition: var(--transition);
        }
        .qty-btn:hover {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
        }

        .remove-btn {
          transition: var(--transition);
        }
        .remove-btn:hover {
          filter: brightness(1.2);
          text-shadow: 0 0 8px rgba(255, 45, 85, 0.3);
        }

        .checkout-btn {
          transition: var(--transition);
        }
        .checkout-btn:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 25px var(--color-accent-glow);
        }
      `}</style>

      {/* Cart Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 flex flex-col">
        
        {/* Title Block */}
        <div className="mb-10">
          <h1 
            className="text-white font-black tracking-wider uppercase text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            YOUR CART
          </h1>
          <div 
            className="text-sm uppercase tracking-widest mt-1 font-semibold"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)'
            }}
          >
            {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div 
            className="py-24 text-center border border-[var(--color-border)] rounded-2xl flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <div 
              className="text-lg font-bold tracking-widest text-gray-400"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              YOUR CARGO BAY IS EMPTY
            </div>
            <Link
              to="/shop"
              className="px-8 py-3.5 text-xs font-black tracking-widest uppercase text-black"
              style={{
                backgroundColor: 'var(--color-accent-cyan)',
                borderRadius: 'var(--border-radius)',
                fontFamily: 'var(--font-display)',
                textDecoration: 'none'
              }}
            >
              RETRIEVE KICKS
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* LEFT COLUMN — Cart Items */}
            <div className="w-full lg:w-[65%] flex flex-col">
              {cartItems.map((item, index) => (
                <div 
                  key={`${item.productId}-${item.size}`}
                  className="cart-item-anim flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-[var(--color-border)]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    borderColor: 'var(--color-border)' 
                  }}
                >
                  {/* Left: Placeholder box */}
                  <div className="flex items-center gap-6">
                    <div 
                      className="w-[100px] h-[100px] shrink-0 flex items-center justify-center text-center p-2 overflow-hidden border border-[var(--color-border)]"
                      style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderRadius: '12px'
                      }}
                    >
                      <span 
                        className="text-[10px] font-bold tracking-wider uppercase leading-snug line-clamp-3"
                        style={{
                          fontFamily: 'var(--font-display)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        {item.product.name}
                      </span>
                    </div>

                    {/* Middle: Info */}
                    <div className="flex flex-col gap-1.5">
                      <Link 
                        to={`/product/${item.productId}`}
                        className="text-white hover:text-[var(--color-accent-cyan)] font-bold text-sm tracking-wider uppercase transition-colors"
                        style={{ fontFamily: 'var(--font-display)', textDecoration: 'none' }}
                      >
                        {item.product.name}
                      </Link>
                      
                      <div 
                        className="text-[13px] font-medium tracking-wide"
                        style={{
                          fontFamily: 'var(--font-body)',
                          color: 'var(--color-text-secondary)'
                        }}
                      >
                        {item.product.colorway}
                      </div>

                      <div>
                        <span 
                          className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 text-white border border-[var(--color-border)]"
                          style={{
                            backgroundColor: 'var(--color-surface)',
                            fontFamily: 'var(--font-display)',
                            borderRadius: '4px'
                          }}
                        >
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity + Price + Remove */}
                  <div className="flex items-center justify-between md:justify-end gap-8 md:gap-12 w-full md:w-auto">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, -1)}
                        className="qty-btn w-[28px] h-[28px] rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs font-bold text-white bg-transparent cursor-pointer"
                      >
                        -
                      </button>
                      <span 
                        className="text-sm font-black w-6 text-center text-white"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.size, 1)}
                        className="qty-btn w-[28px] h-[28px] rounded-full border border-[var(--color-border)] flex items-center justify-center text-xs font-bold text-white bg-transparent cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div 
                      className="text-base font-black tracking-widest text-right shrink-0"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-accent-cyan)',
                        minWidth: '80px'
                      }}
                    >
                      CR {(item.product.price * item.quantity).toLocaleString()}
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId, item.size)}
                      className="remove-btn text-[10px] font-black tracking-wider uppercase cursor-pointer p-1 bg-transparent border-0"
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-accent-red)'
                      }}
                    >
                      REMOVE
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* RIGHT COLUMN — Order Summary */}
            <div 
              className="summary-anim w-full lg:w-[35%] cyber-card p-8 flex flex-col gap-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              <h2 
                className="text-white font-black tracking-widest text-sm uppercase pb-3 border-b border-[var(--color-border)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                ORDER SUMMARY
              </h2>

              <div className="flex flex-col gap-4 font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                {/* Subtotal */}
                <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">CR {subtotal.toLocaleString()}</span>
                </div>
                
                {/* Shipping */}
                <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>Shipping</span>
                  <span className="font-bold" style={{ color: 'var(--color-accent-cyan)' }}>FREE</span>
                </div>

                {/* GST */}
                <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>Tax (18% GST)</span>
                  <span className="text-white font-semibold">CR {gstTax.toLocaleString()}</span>
                </div>

                {/* Divider */}
                <div 
                  className="w-full my-2" 
                  style={{ borderTop: '1px solid var(--color-border)' }}
                />

                {/* Total */}
                <div 
                  className="flex justify-between items-center text-[22px] font-black"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: '#FFFFFF'
                  }}
                >
                  <span>TOTAL</span>
                  <span style={{ color: 'var(--color-accent-cyan)' }}>CR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="checkout-btn w-full py-4.5 text-xs font-black tracking-[0.2em] uppercase text-black cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-accent-cyan)',
                  fontFamily: 'var(--font-display)',
                  borderRadius: 'var(--border-radius)'
                }}
              >
                PROCEED TO CHECKOUT
              </button>

              {/* Continue shopping */}
              <div className="text-center mt-2">
                <Link
                  to="/shop"
                  className="inline-block text-[13px] hover:underline font-semibold"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = 'underline'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = 'none'
                  }}
                >
                  CONTINUE SHOPPING
                </Link>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  )
}
