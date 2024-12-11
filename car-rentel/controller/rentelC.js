const Rental = require('../modal/rentel');
const Car = require('../modal/car');
const User = require('../modal/user');

// Create a rental
// Create a rental
exports.createRental = async (req, res) => {
  const { carid, startDate, endDate } = req.body;
  const userid = req.user ? req.user.userid : null; 
  
  if (!userid) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

  try {
    
    const car = await Car.findById(carid);
    if (!car || !car.availability) {
      return res.status(400).json({ message: 'Car not available' });
    }

    const rentalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
    if (rentalDays <= 0) {
      return res.status(400).json({ message: 'Invalid rental period' });
    }
    const totalPrice = rentalDays * car.pricePerDay;

    const rental = new Rental({
      userid: userid,  
      carid: carid, 
      startDate,
      endDate,
      totalPrice,
    });
    await rental.save();
    car.availability = false;
    await car.save();

    res.status(201).json({ message: 'Rental created successfully', rental });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Failed to create rental', error });
  }
};
