import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartCount } = useCart()
  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Drops', path: '/drops' }
  ]

  return (
    <nav 
      className="animate-navbar fixed top-0 left-0 w-full h-[72px] flex items-center justify-between px-8 md:px-16 z-50 transition-all select-none"
      style={{
        backgroundColor: 'rgba(9, 9, 15, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)'
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-72px);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes navFadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-navbar {
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-nav-item {
          opacity: 0;
          animation: navFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .nav-item-1 { animation-delay: 0.3s; }
        .nav-item-2 { animation-delay: 0.4s; }
        .nav-item-3 { animation-delay: 0.5s; }
        .nav-item-4 { animation-delay: 0.6s; }
        .nav-item-5 { animation-delay: 0.7s; }
        .nav-item-6 { animation-delay: 0.8s; }
        .nav-item-7 { animation-delay: 0.9s; }
      `}</style>

      {/* LEFT - Logo */}
      <div className="flex items-center">
        <Link 
          to="/" 
          className="text-white hover:opacity-90 transition-opacity"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '2px'
          }}
        >
          <span>B</span>
          <span style={{ color: 'var(--color-accent-cyan)' }}>O</span>
          <span>LD SHOW</span>
        </Link>
      </div>

      {/* CENTER - Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, idx) => (
          <Link
            key={link.name}
            to={link.path}
            className={`animate-nav-item nav-item-${idx + 1} text-sm font-semibold tracking-widest uppercase pb-1 border-b border-transparent hover:text-white transition-all duration-300`}
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent-cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <button
          type="button"
          className="animate-nav-item nav-item-5 p-1 bg-transparent border-0 cursor-pointer transition-colors duration-300"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Cart Icon Container with Badge */}
        <Link
          to="/cart"
          className="animate-nav-item nav-item-6 relative p-1 bg-transparent border-0 cursor-pointer transition-colors duration-300 flex items-center justify-center"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFFFFF'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)'
          }}
          aria-label="Cart"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span 
            className="absolute -top-1.5 -right-1.5 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#09090F]"
            style={{
              backgroundColor: 'var(--color-accent-cyan)',
              color: '#000000',
              fontFamily: 'var(--font-display)',
            }}
          >
            {cartCount > 0 ? cartCount : '0'}
          </span>
        </Link>
      </div>
    </nav>
  )
}
