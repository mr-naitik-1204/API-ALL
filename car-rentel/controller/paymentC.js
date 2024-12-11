const Payment = require('../modal/payment');
const Rental = require('../modal/rentel');
const Car = require('../modal/car'); // Assuming you have a Car model
const mongoose = require('mongoose');

exports.processPayment = async (req, res) => {
  const { rentalid, amount, paymentMethod } = req.body;
  console.log('Request data:', req.body);

  try {
    // Validate rentalid format
    if (!mongoose.Types.ObjectId.isValid(rentalid)) {
      return res.status(400).json({ message: 'Invalid rentalid format' });
    }

    // Find the rental by rentalid
    const rental = await Rental.findById(rentalid).populate('carid'); // Populate car details
    if (!rental) {
      return res.status(400).json({ message: 'Rental not found' });
    }

  

    // Create payment document
    const payment = new Payment({
      rentalid: rentalid,
      amount,
      paymentMethod
    });

    // Save payment
    await payment.save();

    // Set car availability to true
    const car = rental.carid;
    car.availability = true; // Assuming `availability` is a field in the Car model
    await car.save();

    // Update rental status to 'completed'
    rental.status = 'completed';
    await rental.save();

    // Respond with success message and populated payment details
    res.status(200).json({
      message: 'Payment processed successfully',
      paymentDetails: {
        rentalid: payment.rentalid,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.paymentDate,
        carDetails: rental.carid // Return populated car details
      }
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Error processing payment', error });
  }
};
