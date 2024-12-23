const Booking = require('../modal/booking');
const Bus = require('../modal/bus');
const User = require('../modal/user');

// Create a new booking
module.exports.createBooking = async (req, res) => {
  const { user, bus, numberOfSeats, totalAmount } = req.body;
  try {
    // Check if the bus and user exist
    const foundBus = await Bus.findById(bus);
    const foundUser = await User.findById(user);
    if (!foundBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new booking
    const newBooking = new Booking({
      user,
      bus,
      numberOfSeats,
      totalAmount,
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all bookings
module.exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email') // Populate user info
      .populate('bus', 'busNumber source destination price'); // Populate bus info  
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific booking by ID
module.exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id)
      .populate('user', 'name email')
      .populate('bus', 'busNumber source destination price');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update booking status (e.g., cancel or complete)
module.exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Ensure the status is one of the allowed values
    if (!['booked', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true } // This will return the updated document
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking status updated successfully', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a booking
module.exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
