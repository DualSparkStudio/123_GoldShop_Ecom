import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, Mail, CheckCircle, XCircle, Trash2, Filter } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import { format } from 'date-fns'

const AdminBookings = () => {
  const { bookings, updateBookingStatus, deleteBooking } = useBooking()
  const [filterStatus, setFilterStatus] = useState('all')

  // Debug logging
  console.log('AdminBookings rendered')
  console.log('Total bookings:', bookings.length)
  console.log('Functions available:', { 
    hasUpdateStatus: typeof updateBookingStatus === 'function',
    hasDeleteBooking: typeof deleteBooking === 'function'
  })

  const filteredBookings = bookings.filter(booking => {
    if (filterStatus === 'all') return true
    return booking.status === filterStatus
  })

  const handleConfirm = (bookingId) => {
    console.log('Confirm clicked for booking:', bookingId)
    if (window.confirm('Confirm this booking?')) {
      console.log('Confirming booking...')
      updateBookingStatus(bookingId, 'confirmed')
      console.log('Booking confirmed!')
    }
  }

  const handleCancel = (bookingId) => {
    console.log('Cancel clicked for booking:', bookingId)
    if (window.confirm('Cancel this booking?')) {
      console.log('Cancelling booking...')
      updateBookingStatus(bookingId, 'cancelled')
      console.log('Booking cancelled!')
    }
  }

  const handleDelete = (bookingId) => {
    console.log('Delete clicked for booking:', bookingId)
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      console.log('Deleting booking...')
      deleteBooking(bookingId)
      console.log('Booking deleted!')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold luxury-text mb-2">
            Store Visit Bookings
          </h1>
          <p className="text-slate-600">Manage customer store appointments</p>
        </div>
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-slate-600" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 focus:border-gold-500 text-slate-800 outline-none transition-all font-semibold"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Total Bookings</p>
              <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-slate-800">{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Confirmed</p>
              <p className="text-3xl font-bold text-slate-800">{stats.confirmed}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm mb-1">Cancelled</p>
              <p className="text-3xl font-bold text-slate-800">{stats.cancelled}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 relative"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={booking.product.image}
                    alt={booking.product.name}
                    className="w-full lg:w-32 h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-4" style={{ pointerEvents: 'auto' }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-slate-800 mb-1">
                        {booking.product.name}
                      </h3>
                      <p className="text-2xl font-bold text-gold-600">
                        ${booking.product.price.toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {format(new Date(booking.date), 'MMMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                      <div className="flex items-start space-x-2 text-slate-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span className="text-sm">{booking.address}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{booking.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{booking.email}</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold">Customer:</span> {booking.name}
                      </p>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold">Message:</span> {booking.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-2 relative z-10">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Confirm button clicked!')
                            handleConfirm(booking.id)
                          }}
                          style={{ pointerEvents: 'auto' }}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors cursor-pointer relative z-20"
                        >
                          <CheckCircle className="w-4 h-4 pointer-events-none" />
                          <span className="pointer-events-none">Confirm</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Cancel button clicked!')
                            handleCancel(booking.id)
                          }}
                          style={{ pointerEvents: 'auto' }}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors cursor-pointer relative z-20"
                        >
                          <XCircle className="w-4 h-4 pointer-events-none" />
                          <span className="pointer-events-none">Cancel</span>
                        </button>
                      </>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Cancel booking button clicked!')
                          handleCancel(booking.id)
                        }}
                        style={{ pointerEvents: 'auto' }}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors cursor-pointer relative z-20"
                      >
                        <XCircle className="w-4 h-4 pointer-events-none" />
                        <span className="pointer-events-none">Cancel Booking</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log('Delete button clicked!')
                        handleDelete(booking.id)
                      }}
                      style={{ pointerEvents: 'auto' }}
                      className="flex items-center space-x-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors cursor-pointer relative z-20"
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                      <span className="pointer-events-none">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="card p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              {filterStatus === 'all' ? 'No Bookings Yet' : `No ${filterStatus} bookings`}
            </h3>
            <p className="text-slate-600">
              {filterStatus === 'all' 
                ? 'Bookings will appear here when customers make reservations'
                : `There are no ${filterStatus} bookings at the moment`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBookings
