import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  return (
    <div 
      className="min-h-screen w-full select-none"
      style={{ 
        backgroundColor: 'var(--color-bg)',
        paddingTop: '72px'
      }}
    >
      <style>{`
        @keyframes bounceScale {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon-anim {
          opacity: 0;
          animation: bounceScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.1s;
        }

        .fade-up-item {
          opacity: 0;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .item-label { animation-delay: 0.3s; }
        .item-heading { animation-delay: 0.4s; }
        .item-order { animation-delay: 0.5s; }
        .item-card { animation-delay: 0.6s; }
        .item-buttons { animation-delay: 0.7s; }
        .item-email { animation-delay: 0.8s; }

        .track-btn {
          transition: var(--transition);
        }
        .track-btn:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 25px var(--color-accent-glow);
        }

        .continue-btn {
          transition: var(--transition);
        }
        .continue-btn:hover {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.2);
        }
      `}</style>

      {/* Centered success container */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] w-full text-center px-6 py-12 max-w-[800px] mx-auto">
        
        {/* 1. Success Icon */}
        <div 
          className="success-icon-anim w-[120px] h-[120px] rounded-full flex items-center justify-center border-2"
          style={{
            borderColor: 'var(--color-accent-cyan)',
            boxShadow: '0 0 40px var(--color-accent-glow), 0 0 80px var(--color-accent-glow)'
          }}
        >
          <span 
            className="font-bold select-none leading-none"
            style={{
              fontSize: '48px',
              color: 'var(--color-accent-cyan)'
            }}
          >
            ✓
          </span>
        </div>

        {/* 2. Order Confirmed label */}
        <div 
          className="fade-up-item item-label mt-8 text-[11px] font-black uppercase tracking-[0.25em]"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-accent-cyan)'
          }}
        >
          ORDER CONFIRMED
        </div>

        {/* 3. Main heading */}
        <h1 
          className="fade-up-item item-heading mt-4 text-white font-black leading-none uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 72px)'
          }}
        >
          YOUR KICKS ARE
          <span className="block mt-2">ON THE WAY</span>
        </h1>

        {/* 4. Order number */}
        <div 
          className="fade-up-item item-order mt-4 text-sm font-semibold tracking-wider"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-secondary)'
          }}
        >
          ORDER #BS-2024-00142
        </div>

        {/* 5. Delivery estimate card */}
        <div 
          className="fade-up-item item-card border p-5 md:px-10 mt-8 w-full max-w-[500px]"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            borderRadius: 'var(--border-radius)'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* packed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-lg">📦</span>
              <span 
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                PACKED
              </span>
            </div>

            {/* divider 1 */}
            <div 
              className="h-8 w-[1px]" 
              style={{ borderLeft: '1px solid var(--color-border)' }}
            />

            {/* dispatched (current) */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-lg">🚚</span>
              <span 
                className="text-[10px] font-black tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-accent-cyan)'
                }}
              >
                DISPATCHED
              </span>
            </div>

            {/* divider 2 */}
            <div 
              className="h-8 w-[1px]" 
              style={{ borderLeft: '1px solid var(--color-border)' }}
            />

            {/* delivered */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <span className="text-lg">✅</span>
              <span 
                className="text-[10px] font-bold tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                DELIVERED
              </span>
            </div>
          </div>
        </div>

        {/* 6. Two buttons side by side */}
        <div className="fade-up-item item-buttons flex flex-row items-center gap-4 mt-12 w-full justify-center">
          <button
            type="button"
            className="track-btn px-8 py-4 text-xs font-black tracking-[0.2em] uppercase text-black cursor-pointer"
            style={{
              backgroundColor: 'var(--color-accent-cyan)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--border-radius)'
            }}
          >
            TRACK ORDER
          </button>

          <Link
            to="/shop"
            className="continue-btn px-8 py-4 text-xs font-black tracking-[0.2em] uppercase text-white bg-transparent border-2 cursor-pointer"
            style={{
              borderColor: 'var(--color-border)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none'
            }}
          >
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* 7. Bottom text */}
        <div 
          className="fade-up-item item-email mt-8 text-[13px] font-semibold tracking-wide"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-secondary)'
          }}
        >
          A confirmation has been sent to your email
        </div>

      </div>
    </div>
  )
}
