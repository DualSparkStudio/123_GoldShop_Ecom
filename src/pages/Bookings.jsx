import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, Mail, X } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { format } from 'date-fns'

const Bookings = () => {
  const { bookings, cancelBooking } = useBooking()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'confirmed':
        return 'bg-green-100 text-green-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Calendar className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold mb-4">No Store Visits Booked</h2>
          <p className="text-slate-600 mb-2">
            You haven't scheduled any store appointments yet
          </p>
          <p className="text-sm text-blue-600 mb-8">
            Book a store visit to see jewelry in person and get expert assistance
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-serif font-bold mb-2">My Store Visit Bookings</h1>
          <p className="text-slate-600">
            {bookings.length} scheduled store {bookings.length === 1 ? 'appointment' : 'appointments'}
          </p>
          <p className="text-sm text-blue-600 mt-2">
            💡 These are appointments to visit our store, not online orders. Check "My Orders" for online purchases.
          </p>
        </motion.div>

        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={booking.product.image}
                      alt={booking.product.name}
                      className="w-full lg:w-48 h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-serif font-bold mb-2">
                          {booking.product.name}
                        </h3>
                        <p className="text-3xl font-bold text-gold-600">
                          ${booking.product.price.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Calendar className="w-5 h-5 flex-shrink-0" />
                          <span>
                            {format(new Date(booking.date), 'MMMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Clock className="w-5 h-5 flex-shrink-0" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-start space-x-3 text-slate-600">
                          <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                          <span>{booking.address}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Phone className="w-5 h-5 flex-shrink-0" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Mail className="w-5 h-5 flex-shrink-0" />
                          <span>{booking.email}</span>
                        </div>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold">Message:</span> {booking.message}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <p className="text-sm text-slate-500">
                        Booked on {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                      </p>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                'Are you sure you want to cancel this booking?'
                              )
                            ) {
                              cancelBooking(booking.id)
                            }
                          }}
                          className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-semibold transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel Booking</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bookings
