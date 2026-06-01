import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()

  // Form State
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const selectPaymentMethod = (method) => {
    setForm(prev => ({
      ...prev,
      paymentMethod: method
    }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    // Navigate to order success screen
    navigate('/order-success')
  }

  // Summary Calculations
  const subtotal = 32997
  const gstTax = 5939
  const total = 38936

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

        .cyber-input {
          width: 100%;
          background-color: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 14px 18px;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-size: 15px;
          transition: var(--transition);
        }
        .cyber-input:focus {
          border-color: var(--color-accent-cyan);
          outline: none;
          box-shadow: 0 0 0 3px var(--color-accent-glow);
        }
        .cyber-input::placeholder {
          color: var(--color-text-secondary);
        }

        .pay-card {
          border: 1px solid var(--color-border);
          border-radius: 12px;
          background-color: var(--color-surface);
          cursor: pointer;
          transition: var(--transition);
        }
        .pay-card:hover:not(.selected) {
          border-color: rgba(0, 245, 255, 0.3);
        }
        .pay-card.selected {
          border-color: var(--color-accent-cyan);
          background-color: rgba(0, 245, 255, 0.05);
        }

        .place-order-btn {
          transition: var(--transition);
        }
        .place-order-btn:hover {
          filter: brightness(1.15);
          box-shadow: 0 0 25px var(--color-accent-glow);
        }
      `}</style>

      {/* Main Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 flex flex-col">
        
        {/* Page Title & Progress Bar */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h1 
              className="text-white font-black tracking-wider uppercase text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              CHECKOUT
            </h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-6 relative max-w-[400px] w-full">
            {/* Step 1: DELIVERY */}
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: 'var(--color-accent-cyan)' }}
              />
              <span 
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-accent-cyan)'
                }}
              >
                DELIVERY
              </span>
            </div>

            {/* Connecting line 1 */}
            <div 
              className="flex-1 h-[1px]" 
              style={{ borderTop: '1px solid var(--color-border)' }}
            />

            {/* Step 2: PAYMENT */}
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: 'transparent', border: '1px solid var(--color-border)' }}
              />
              <span 
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                PAYMENT
              </span>
            </div>

            {/* Connecting line 2 */}
            <div 
              className="flex-1 h-[1px]" 
              style={{ borderTop: '1px solid var(--color-border)' }}
            />

            {/* Step 3: CONFIRM */}
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: 'transparent', border: '1px solid var(--color-border)' }}
              />
              <span 
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ 
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                CONFIRM
              </span>
            </div>
          </div>
        </div>

        {/* Form + Summary Layout */}
        <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN — Delivery Form */}
          <div className="anim-left-col w-full lg:w-[60%] flex flex-col">
            
            {/* Delivery Label */}
            <div 
              className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-accent-cyan)'
              }}
            >
              DELIVERY DETAILS
            </div>

            {/* Inputs Block */}
            <div className="flex flex-col gap-5">
              {/* Row 1: First + Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label 
                    htmlFor="firstName"
                    className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                  >
                    FIRST NAME
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>
                <div className="flex flex-col">
                  <label 
                    htmlFor="lastName"
                    className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                  >
                    LAST NAME
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="flex flex-col">
                <label 
                  htmlFor="email"
                  className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={handleInputChange}
                  className="cyber-input"
                />
              </div>

              {/* Row 3: Phone */}
              <div className="flex flex-col">
                <label 
                  htmlFor="phone"
                  className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                >
                  PHONE NUMBER
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  required
                  placeholder="Enter 10-digit number"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="cyber-input"
                />
              </div>

              {/* Row 4: Address */}
              <div className="flex flex-col">
                <label 
                  htmlFor="address"
                  className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                >
                  SHIPPING ADDRESS
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  required
                  placeholder="Enter complete address, block number, street"
                  value={form.address}
                  onChange={handleInputChange}
                  className="cyber-input"
                />
              </div>

              {/* Row 5: City + State + Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label 
                    htmlFor="city"
                    className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                  >
                    CITY
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    required
                    placeholder="Enter city"
                    value={form.city}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>
                <div className="flex flex-col">
                  <label 
                    htmlFor="state"
                    className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                  >
                    STATE
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    required
                    placeholder="Enter state"
                    value={form.state}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>
                <div className="flex flex-col">
                  <label 
                    htmlFor="pincode"
                    className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}
                  >
                    PINCODE
                  </label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    required
                    placeholder="6 digits"
                    value={form.pincode}
                    onChange={handleInputChange}
                    className="cyber-input"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Label */}
            <div 
              className="text-[11px] font-bold tracking-[0.25em] uppercase mt-10 mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-accent-cyan)'
              }}
            >
              PAYMENT METHOD
            </div>

            {/* Payment Options (Three Cards) */}
            <div className="grid grid-cols-3 gap-4">
              {/* CARD */}
              <div 
                onClick={() => selectPaymentMethod('card')}
                className={`pay-card p-5 flex flex-col items-center justify-center gap-1 text-center ${form.paymentMethod === 'card' ? 'selected' : ''}`}
              >
                <div 
                  className="text-xs font-black tracking-wider"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  CARD
                </div>
                <div className="text-xl">💳</div>
              </div>

              {/* UPI */}
              <div 
                onClick={() => selectPaymentMethod('upi')}
                className={`pay-card p-5 flex flex-col items-center justify-center gap-1 text-center ${form.paymentMethod === 'upi' ? 'selected' : ''}`}
              >
                <div 
                  className="text-xs font-black tracking-wider"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  UPI
                </div>
                <div className="text-xl">📱</div>
              </div>

              {/* COD */}
              <div 
                onClick={() => selectPaymentMethod('cod')}
                className={`pay-card p-5 flex flex-col items-center justify-center gap-1 text-center ${form.paymentMethod === 'cod' ? 'selected' : ''}`}
              >
                <div 
                  className="text-xs font-black tracking-wider"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  COD
                </div>
                <div className="text-xl">💵</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="place-order-btn w-full py-4.5 mt-10 text-xs font-black tracking-[0.2em] uppercase text-black cursor-pointer"
              style={{
                backgroundColor: 'var(--color-accent-cyan)',
                fontFamily: 'var(--font-display)',
                borderRadius: 'var(--border-radius)'
              }}
            >
              PLACE ORDER
            </button>

          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <div 
            className="anim-right-col w-full lg:w-[40%] p-8 flex flex-col gap-6"
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

            {/* Items List */}
            <div className="flex flex-col gap-4">
              {/* Item 1 */}
              <div className="flex justify-between items-center text-sm font-semibold">
                <div className="flex flex-col">
                  <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>Void Runner X1</span>
                  <span className="text-xs text-[var(--color-text-secondary)] font-medium" style={{ fontFamily: 'var(--font-body)' }}>UK 8 — x1</span>
                </div>
                <span className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>₹12,999</span>
              </div>

              {/* Item 2 */}
              <div className="flex justify-between items-center text-sm font-semibold">
                <div className="flex flex-col">
                  <span className="text-white" style={{ fontFamily: 'var(--font-display)' }}>Neon Drift Low</span>
                  <span className="text-xs text-[var(--color-text-secondary)] font-medium" style={{ fontFamily: 'var(--font-body)' }}>UK 9 — x2</span>
                </div>
                <span className="text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>₹19,998</span>
              </div>
            </div>

            {/* Divider */}
            <div 
              className="w-full" 
              style={{ borderTop: '1px solid var(--color-border)' }}
            />

            {/* Totals Table */}
            <div className="flex flex-col gap-4 font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              {/* Subtotal */}
              <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span>
                <span className="text-white font-semibold">₹{subtotal.toLocaleString()}</span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Shipping</span>
                <span className="font-bold" style={{ color: 'var(--color-accent-cyan)' }}>FREE</span>
              </div>

              {/* GST */}
              <div className="flex justify-between items-center text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
                <span>Tax (18% GST)</span>
                <span className="text-white font-semibold">₹{gstTax.toLocaleString()}</span>
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
                <span style={{ color: 'var(--color-accent-cyan)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* SSL Secured Badge */}
            <div 
              className="text-center mt-2 text-[11px] font-bold tracking-widest uppercase"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-secondary)'
              }}
            >
              🔒 SECURED BY SSL ENCRYPTION
            </div>

          </div>

        </form>

      </div>
    </div>
  )
}
