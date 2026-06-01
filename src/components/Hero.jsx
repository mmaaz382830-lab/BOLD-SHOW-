import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import HeroCanvas from './HeroCanvas'
import { products } from '../products.js'
import { useCart } from '../context/CartContext'

export default function Hero() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  return (
    <>
      <section 
        className="relative w-full h-screen min-h-[600px] flex items-center justify-between px-8 md:px-16 select-none"
        style={{ backgroundColor: 'var(--color-bg)', overflowX: 'clip', overflowY: 'visible' }}
      >
        <style>{`
          @keyframes slideUp {
            from {
              transform: translateY(40px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
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
          .animate-slide-up {
            opacity: 0;
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.2s;
          }
          .animate-fade-in-subheading {
            opacity: 0;
            animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.4s;
          }
          .animate-fade-in-buttons {
            opacity: 0;
            animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            animation-delay: 0.6s;
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

        {/* Radial Gradient Glow on the right side */}
        <div 
          className="absolute top-0 right-0 w-[50%] h-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 60% 50%, var(--color-accent-glow) 0%, transparent 65%)'
          }}
        />

        {/* Left Content Column (50% width) */}
        <div className="relative w-full md:w-[50%] flex flex-col justify-center z-10">
          <h1 
            className="animate-slide-up leading-[0.95] tracking-tighter"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(48px, 8vw, 120px)',
              fontWeight: 900,
              color: '#FFFFFF',
            }}
          >
            <span>BOLD SHOW</span>
            <span 
              className="block text-white mt-2"
              style={{
                textShadow: '0 0 20px var(--color-accent-cyan), 0 0 40px rgba(0, 245, 255, 0.3)'
              }}
            >
              NEXT GEN KICKS
            </span>
          </h1>

          <p 
            className="animate-fade-in-subheading mt-6 text-lg md:text-xl font-medium tracking-wide"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Where Street Culture Meets the Future
          </p>

          {/* Action Buttons */}
          <div className="animate-fade-in-buttons mt-8 flex flex-row items-center gap-4">
            <button 
              type="button"
              className="px-8 py-3.5 text-sm font-black tracking-widest uppercase cursor-pointer"
              onClick={() => navigate('/shop')}
              style={{
                fontFamily: 'var(--font-display)',
                backgroundColor: 'var(--color-accent-cyan)',
                color: '#000000',
                borderRadius: 'var(--border-radius)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.15)';
                e.currentTarget.style.boxShadow = '0 0 25px var(--color-accent-glow)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              SHOP NOW
            </button>
            
            <button 
              type="button"
              className="px-8 py-3.5 text-sm font-black tracking-widest uppercase bg-transparent cursor-pointer"
              onClick={() => navigate('/shop')}
              style={{
                fontFamily: 'var(--font-display)',
                border: '2px solid var(--color-accent-cyan)',
                color: '#FFFFFF',
                borderRadius: 'var(--border-radius)',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 245, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              EXPLORE
            </button>
          </div>
        </div>

        {/* Right Column (50% width, empty / reserved slot) */}
        <div 
          id="hero-3d-slot" 
          className="w-[50%] h-full hidden md:block relative z-10"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <HeroCanvas />
        </div>

        {/* Bottom-left metadata indicator */}
        <div 
          className="absolute bottom-8 left-8 md:left-16 text-xs font-semibold tracking-widest uppercase z-10"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-secondary)'
          }}
        >
          SEASON 01 / DROP 001
        </div>

        {/* Bottom-right scroll indicator (vertical 90deg text) */}
        <div 
          className="absolute bottom-16 right-4 md:right-8 text-xs font-semibold tracking-widest uppercase z-10"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-secondary)',
            transform: 'rotate(90deg)',
            transformOrigin: 'bottom right',
            whiteSpace: 'nowrap'
          }}
        >
          SCROLL TO DISCOVER
        </div>
      </section>

      {/* SECTION 1 — Scrolling Ticker Strip */}
      <div 
        style={{
          width: '100%',
          backgroundColor: 'var(--color-accent-cyan)',
          padding: '12px 0',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <style>{`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: flex;
            width: max-content;
            animation: ticker 20s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="ticker-track">
          {[...Array(10)].map((_, i) => (
            <span 
              key={i}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '11px',
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '0.2em',
                paddingRight: '48px',
                whiteSpace: 'nowrap'
              }}
            >
              FREE SHIPPING &nbsp;·&nbsp; NEW DROP &nbsp;·&nbsp; BOLD SHOW &nbsp;·&nbsp; AUTHENTIC KICKS &nbsp;·&nbsp; SEASON 01
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Featured Products */}
      <section style={{ 
        backgroundColor: 'var(--color-bg)', 
        padding: '100px 64px 80px',
        position: 'relative'
      }}>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '48px'
        }}>
          <div>
            <div style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '11px', 
              color: 'var(--color-accent-cyan)',
              letterSpacing: '0.25em',
              marginBottom: '12px'
            }}>
              FEATURED DROPS
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1
            }}>
              THIS SEASON'S HEAT
            </div>
          </div>
          <Link 
            to="/shop"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              color: 'var(--color-accent-cyan)',
              letterSpacing: '0.2em',
              textDecoration: 'none',
              borderBottom: '1px solid var(--color-accent-cyan)',
              paddingBottom: '4px'
            }}
          >
            VIEW ALL DROPS →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {products.slice(0, 3).map((product, index) => (
            <div 
              key={product.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                transition: 'var(--transition)',
                animationDelay: `${index * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'
                e.currentTarget.style.boxShadow = '0 0 30px var(--color-accent-glow)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  height: '260px',
                  background: 'linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {product.tag && (
                    <span style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      backgroundColor: 'var(--color-accent-cyan)',
                      color: '#000',
                      fontFamily: 'var(--font-display)',
                      fontSize: '10px',
                      fontWeight: 900,
                      padding: '4px 12px',
                      letterSpacing: '0.1em'
                    }}>
                      {product.tag}
                    </span>
                  )}
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '11px',
                    color: 'var(--color-text-secondary)',
                    letterSpacing: '0.3em',
                    textAlign: 'center',
                    padding: '0 24px'
                  }}>
                    {product.name}
                  </div>
                </div>
              </Link>

              <div style={{ padding: '20px' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '0.1em',
                  marginBottom: '6px'
                }}>
                  {product.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '16px'
                }}>
                  {product.colorway}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '16px',
                    fontWeight: 900,
                    color: 'var(--color-accent-cyan)'
                  }}>
                    ₹{product.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => addToCart(product, 'UK 8')}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '10px',
                      fontWeight: 900,
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      letterSpacing: '0.1em',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-cyan)'
                      e.currentTarget.style.color = '#000'
                      e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = 'var(--color-text-secondary)'
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Brand Banner */}
      <section style={{
        width: '100%',
        padding: '80px 64px',
        background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '11px',
            color: 'var(--color-accent-cyan)',
            letterSpacing: '0.25em',
            marginBottom: '16px'
          }}>
            THE BOLD MANIFESTO
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(24px, 3vw, 42px)',
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.1,
            maxWidth: '500px'
          }}>
            SNEAKERS ARE NOT<br/>
            <span style={{ color: 'var(--color-accent-cyan)' }}>JUST SHOES.</span><br/>
            THEY ARE IDENTITY.
          </div>
        </div>
        <Link
          to="/about"
          style={{
            backgroundColor: 'transparent',
            border: '2px solid var(--color-accent-cyan)',
            color: 'white',
            fontFamily: 'var(--font-display)',
            fontSize: '12px',
            fontWeight: 900,
            padding: '18px 40px',
            borderRadius: 'var(--border-radius)',
            textDecoration: 'none',
            letterSpacing: '0.2em',
            transition: 'var(--transition)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent-cyan)'
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = 'white'
          }}
        >
          OUR STORY →
        </Link>
      </section>
    </>
  )
}
