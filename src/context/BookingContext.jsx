import { createContext, useContext, useState, useEffect } from 'react'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider')
  }
  return context
}

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  const createBooking = (bookingData) => {
    const newBooking = {
      id: Date.now().toString(),
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setBookings(prev => [newBooking, ...prev])
    return newBooking
  }

  const cancelBooking = (bookingId) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' }
          : booking
      )
    )
  }

  const updateBookingStatus = (bookingId, status) => {
    console.log('updateBookingStatus called:', { bookingId, status })
    setBookings(prev => {
      const updated = prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status }
          : booking
      )
      console.log('Updated bookings:', updated)
      return updated
    })
  }

  const deleteBooking = (bookingId) => {
    console.log('deleteBooking called:', bookingId)
    setBookings(prev => {
      const filtered = prev.filter(booking => booking.id !== bookingId)
      console.log('Filtered bookings:', filtered)
      return filtered
    })
  }

  const getBookingById = (bookingId) => {
    return bookings.find(booking => booking.id === bookingId)
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        cancelBooking,
        getBookingById,
        updateBookingStatus,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}
