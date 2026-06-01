import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Self-contained scroll animation hook using IntersectionObserver
function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target) // Trigger once and clean up
        }
      },
      { threshold: 0.15 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return ref
}

export default function About() {
  // refs for scroll reveal animations
  const heroRef = useScrollReveal()
  const statsRef = useScrollReveal()
  const missionRef = useScrollReveal()
  const cardsRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  const stats = [
    { number: '2024', label: 'FOUNDED' },
    { number: '6+', label: 'SNEAKER DROPS' },
    { number: '10K+', label: 'CUSTOMERS' },
    { number: '100%', label: 'AUTHENTIC' }
  ]

  const values = [
    {
      icon: '⚡',
      title: 'AUTHENTIC ONLY',
      description: 'Every sneaker is verified and sourced directly from authorized retailers and brand partners.'
    },
    {
      icon: '🎯',
      title: 'DROP CULTURE',
      description: 'We live and breathe limited drops. Be the first to know, first to cop.'
    },
    {
      icon: '🔥',
      title: 'COMMUNITY FIRST',
      description: 'BOLD SHOW is more than a store. It is a movement built by sneakerheads, for sneakerheads.'
    }
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
        .reveal-sec {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        
        .reveal-sec.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .about-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          transition: var(--transition);
        }
        .about-card:hover {
          border-color: var(--color-accent-cyan);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }

        .cta-btn {
          transition: var(--transition);
        }
        .cta-btn:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 25px var(--color-accent-glow);
        }
      `}</style>

      {/* SECTION 1 — Hero Banner */}
      <section 
        ref={heroRef}
        className="reveal-sec w-full h-[400px] flex items-center justify-center border-b"
        style={{
          background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%)',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="flex flex-col items-center text-center px-6">
          {/* Label */}
          <div 
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-accent-cyan)'
            }}
          >
            OUR STORY
          </div>
          
          {/* Heading */}
          <h1 
            className="text-white font-black leading-none uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 72px)'
            }}
          >
            WE DON'T FOLLOW
            <span className="block mt-2">
              TRENDS. WE SET{' '}
              <span 
                style={{
                  color: 'white',
                  textShadow: '0 0 20px var(--color-accent-cyan), 0 0 40px rgba(0, 245, 255, 0.3)'
                }}
              >
                THEM.
              </span>
            </span>
          </h1>
        </div>
      </section>

      {/* SECTION 2 — Brand Stats */}
      <section 
        ref={statsRef}
        className="reveal-sec w-full px-6 md:px-16 py-12 md:py-16"
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, idx) => (
            <div 
              key={stat.label}
              className="flex flex-col items-center text-center justify-center relative py-4"
            >
              {/* Stat number */}
              <div 
                className="text-4xl md:text-5xl font-black tracking-wider"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-accent-cyan)'
                }}
              >
                {stat.number}
              </div>

              {/* Stat label */}
              <div 
                className="text-[13px] mt-2 font-bold tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                {stat.label}
              </div>

              {/* Vertical divider for larger viewports */}
              {idx < 3 && (
                <div 
                  className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[1px]" 
                  style={{ borderLeft: '1px solid var(--color-border)' }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Mission Statement */}
      <section 
        ref={missionRef}
        className="reveal-sec w-full px-6 md:px-16 py-16 text-center max-w-[800px] mx-auto"
      >
        <div 
          className="text-[11px] font-black uppercase tracking-[0.25em]"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-accent-cyan)'
          }}
        >
          OUR MISSION
        </div>

        <p 
          className="text-base md:text-lg font-medium tracking-wide mt-6 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.8'
          }}
        >
          BOLD SHOW was born from the streets of India. We believe sneakers are not just footwear — they are identity, culture, and self-expression. Every drop we curate is a statement.
        </p>
      </section>

      {/* SECTION 4 — Three Value Cards */}
      <section 
        ref={cardsRef}
        className="reveal-sec w-full px-6 md:px-16 py-12"
      >
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val) => (
            <div 
              key={val.title}
              className="about-card p-10 flex flex-col items-start gap-4"
            >
              {/* Icon */}
              <div className="text-4xl leading-none">
                {val.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-white font-bold text-sm tracking-widest uppercase mt-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {val.title}
              </h3>

              {/* Description */}
              <p 
                className="text-sm font-medium tracking-wide leading-relaxed"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: '1.7'
                }}
              >
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — CTA Banner */}
      <section 
        ref={ctaRef}
        className="reveal-sec w-full px-6 md:px-16 py-20 border-t border-b flex flex-col md:flex-row md:items-center justify-between gap-8"
        style={{
          background: 'linear-gradient(90deg, var(--color-bg-secondary), var(--color-bg))',
          borderColor: 'var(--color-border)'
        }}
      >
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left CTA text */}
          <h2 
            className="text-white font-black tracking-wider uppercase text-3xl md:text-4xl leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            READY TO STEP UP?
          </h2>

          {/* Right Shop CTA Button */}
          <Link
            to="/shop"
            className="cta-btn px-10 py-4 text-xs font-black tracking-[0.2em] uppercase text-black text-center"
            style={{
              backgroundColor: 'var(--color-accent-cyan)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--border-radius)',
              textDecoration: 'none',
              minWidth: '180px'
            }}
          >
            SHOP NOW
          </Link>
        </div>
      </section>

    </div>
  )
}
