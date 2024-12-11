const User = require('../modal/user');
const Taxi = require('../modal/texi');

// Book a taxi
exports.bookTaxi = async (req, res) => {
  const { userId, longitude, latitude } = req.body;
  
  if (!userId || !longitude || !latitude) {
    return res.status(400).json({ message: 'User ID and coordinates are required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find the nearest available taxi
    const taxi = await Taxi.findOne({
      status: 'available',
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [longitude, latitude] },
          $maxDistance: 5000, // 5 km
        },
      },
    }).sort({ ratings: -1 }); // Optionally, you can sort by ratings or other criteria

    if (!taxi) return res.status(404).json({ message: 'No available taxis nearby' });

    // Calculate fare (simple example: 10 units per km)
    const distance = await calculateDistance(user.location.coordinates, taxi.location.coordinates); // In km
    const fare = distance * 10; // Fare calculation based on distance (e.g., 10 units per km)

    // Update taxi status to 'on_trip'
    taxi.status = 'on_trip';
    await taxi.save();

    // Add the trip to user's trip history
    const trip = {
      taxiId: taxi._id,
      startTime: new Date(),
      distance: distance,
      fare: fare,
    };
    user.tripHistory.push(trip);
    await user.save();

    res.status(200).json({
      message: 'Taxi booked successfully',
      taxi: taxi,
      trip: trip,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to calculate distance between two points using Haversine formula (in km)
const calculateDistance = (coords1, coords2) => {
  const R = 6371; // Radius of the Earth in km
  const lat1 = coords1[1] * (Math.PI / 180); // Convert latitude to radians
  const lon1 = coords1[0] * (Math.PI / 180); // Convert longitude to radians
  const lat2 = coords2[1] * (Math.PI / 180); // Convert latitude to radians
  const lon2 = coords2[0] * (Math.PI / 180); // Convert longitude to radians

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dlon / 2) * Math.sin(dlon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c; // Distance in km
  return distance;
};
