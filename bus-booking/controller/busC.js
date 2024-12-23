const Bus = require('../modal/bus');

// Create a new bus
module.exports.createBus = async (req, res) => {
  const { busNumber, busType, seats, departureTime, arrivalTime, source, destination, price } = req.body;
  try {
    const newBus = new Bus({
      busNumber,
      busType,
      seats,
      departureTime,
      arrivalTime,
      source,
      destination,
      price
    });
    await newBus.save();
    res.status(201).json({ message: 'Bus created successfully', bus: newBus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all buses
module.exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a bus by ID
module.exports.getBusById = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a bus
module.exports.updateBus = async (req, res) => {
  const { id } = req.params;
  const { busNumber, busType, seats, departureTime, arrivalTime, source, destination, price } = req.body;

  try {
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    bus.busNumber = busNumber || bus.busNumber;
    bus.busType = busType || bus.busType;
    bus.seats = seats || bus.seats;
    bus.departureTime = departureTime || bus.departureTime;
    bus.arrivalTime = arrivalTime || bus.arrivalTime;
    bus.source = source || bus.source;
    bus.destination = destination || bus.destination;
    bus.price = price || bus.price;

    await bus.save();
    res.json({ message: 'Bus updated successfully', bus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a bus
module.exports.deleteBus = async (req, res) => {
  const { id } = req.params;
  try {
    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    await bus.remove();
    res.json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
