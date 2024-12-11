const Car = require('../modal/car');

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ 
        message: 'Failed to retrieve cars',
         error });
  }
};

// Create a car
exports.createCar = async (req, res) => {
    const { make, model, year, pricePerDay, description, imageUrl } = req.body;
 
  try {
    const car = new Car({ make, model, year, pricePerDay, description, imageUrl });
    await car.save();
    res.status(201).json({ message: 'Car created successfully', car });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create car', error });
  }
};
