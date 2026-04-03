import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, User, Mail, Phone, MapPin, CreditCard, Calendar, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useOrder } from '../context/OrderContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, getCartTotal, clearCart } = useCart()
  const { createOrder } = useOrder()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [testMode, setTestMode] = useState(true) // Enable test mode by default

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be 10 digits'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRazorpayPayment = () => {
    const total = getCartTotal()
    const shipping = total > 5000 ? 0 : 50
    const tax = total * 0.1
    const grandTotal = total + shipping + tax
    
    // Convert to paise (Razorpay uses smallest currency unit)
    const amountInPaise = Math.round(grandTotal * 100)

    const options = {
      key: 'rzp_test_YOUR_KEY_ID', // ⚠️ IMPORTANT: Replace with your actual Razorpay Key ID from https://dashboard.razorpay.com/app/keys
      amount: amountInPaise,
      currency: 'INR',
      name: 'Luxe Gold & Silver Shop',
      description: 'Jewelry Purchase',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&q=80',
      handler: function (response) {
        // Payment successful
        const orderData = {
          items: cart,
          total: grandTotal,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          paymentInfo: {
            paymentId: response.razorpay_payment_id,
            method: 'Razorpay',
            status: 'Paid',
          },
          notes: formData.notes,
        }

        const order = createOrder(orderData)
        clearCart()
        setIsProcessing(false)
        
        alert(`Payment successful! Order Number: ${order.orderNumber}`)
        navigate('/orders')
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      },
      theme: {
        color: '#D4AF37',
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false)
          alert('Payment cancelled. You can try again when ready.')
        },
        escape: true,
        backdropclose: false,
      }
    }

    try {
      const razorpay = new window.Razorpay(options)
      
      razorpay.on('payment.failed', function (response) {
        setIsProcessing(false)
        console.error('Payment failed:', response.error)
        alert(`Payment failed: ${response.error.description || 'Please try again'}`)
      })
      
      razorpay.open()
    } catch (error) {
      setIsProcessing(false)
      console.error('Razorpay error:', error)
      alert('Unable to open payment gateway. Please check your internet connection and try again.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) {
      alert('Please fill in all required fields correctly.')
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setIsProcessing(true)
    
    // Test mode - simulate payment without Razorpay
    if (testMode) {
      handleTestPayment()
      return
    }
    
    // Check if Razorpay script is loaded
    if (!window.Razorpay) {
      alert('Payment gateway is loading. Please wait a moment and try again.')
      setIsProcessing(false)
      return
    }
    
    // Open Razorpay payment gateway
    try {
      handleRazorpayPayment()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Failed to initialize payment. Please refresh the page and try again.')
      setIsProcessing(false)
    }
  }

  const handleTestPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      const total = getCartTotal()
      const shipping = total > 5000 ? 0 : 50
      const tax = total * 0.1
      const grandTotal = total + shipping + tax
      
      const orderData = {
        items: cart,
        total: grandTotal,
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
        paymentInfo: {
          paymentId: 'TEST_' + Date.now(),
          method: 'Test Payment',
          status: 'Paid',
        },
        notes: formData.notes,
      }

      const order = createOrder(orderData)
      clearCart()
      setIsProcessing(false)
      
      alert(`✅ Test Payment Successful!\n\nOrder Number: ${order.orderNumber}\n\nThis is a simulated payment. Enable real Razorpay payments by:\n1. Getting your key from https://dashboard.razorpay.com/app/keys\n2. Replacing the key in Checkout.jsx\n3. Setting testMode to false`)
      navigate('/orders')
    }, 1500)
  }

  const total = getCartTotal()
  const shipping = total > 5000 ? 0 : 50
  const tax = total * 0.1
  const grandTotal = total + shipping + tax

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
            <p className="text-slate-600 mb-8">Add some items to your cart before checkout</p>
            <button
              onClick={() => navigate('/shop')}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold luxury-text mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-gold-600" />
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.name ? 'border-red-500' : 'border-slate-200'
                      } focus:border-gold-500 outline-none transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.email ? 'border-red-500' : 'border-slate-200'
                      } focus:border-gold-500 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.phone ? 'border-red-500' : 'border-slate-200'
                      } focus:border-gold-500 outline-none transition-all`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-gold-600" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.address ? 'border-red-500' : 'border-slate-200'
                      } focus:border-gold-500 outline-none transition-all`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.city ? 'border-red-500' : 'border-slate-200'
                        } focus:border-gold-500 outline-none transition-all`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.state ? 'border-red-500' : 'border-slate-200'
                        } focus:border-gold-500 outline-none transition-all`}
                        placeholder="NY"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                          errors.zipCode ? 'border-red-500' : 'border-slate-200'
                        } focus:border-gold-500 outline-none transition-all`}
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Additional Notes</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-gold-500 outline-none transition-all"
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>
                  {isProcessing 
                    ? 'Processing...' 
                    : testMode 
                      ? `Test Payment - ₹${grandTotal.toLocaleString()}`
                      : `Proceed to Payment - ₹${grandTotal.toLocaleString()}`
                  }
                </span>
              </button>
              
              <p className="text-center text-sm text-slate-500">
                By placing this order, you agree to our Terms & Conditions
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{item.name}</h3>
                      <p className="text-slate-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gold-600">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-xl font-bold text-slate-800">
                  <span>Total</span>
                  <span className="text-gold-600">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {total < 5000 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Add ₹{(5000 - total).toLocaleString()} more for FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
