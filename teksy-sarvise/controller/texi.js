const Taxi = require('../modal/texi');

// Create a new taxi
exports.createTaxi = async (req, res) => {
  try {
    const taxi = new Taxi(req.body);
    await taxi.save();
    res.status(201).json(taxi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all taxis
exports.getTaxis = async (req, res) => {
  try {
    const taxis = await Taxi.find();
    res.status(200).json(taxis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get nearby taxis for a user
// Get nearby taxis for a user and show the range (distance) for each taxi
// Get nearby taxis for a user and show the range (distance) in kilometers or meters
exports.getNearbyTaxis = async (req, res) => {
  const { longitude, latitude } = req.query;

  if (!longitude || !latitude || isNaN(longitude) || isNaN(latitude)) {
    return res.status(400).json({ message: 'Invalid or missing coordinates' });
  }

  const lon = parseFloat(longitude);
  const lat = parseFloat(latitude);

  // Validate longitude and latitude ranges
  if (lon < -180 || lon > 180 || lat < -90 || lat > 90) {
    return res.status(400).json({ message: 'Coordinates out of bounds' });
  }

  try {
   
    const taxis = await Taxi.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [lon, lat] },
          distanceField: 'distance',
          maxDistance: 10000, 
          spherical: true,
        },
      },
      {
        $project: {
          licensePlate: 1,
          driverName: 1,
          status: 1,
          ratings: 1,
        
          distance: {
            $cond: {
              if: { $lt: ["$distance", 1000] }, // If the distance is less than 1000 meters
              then: { $round: ["$distance", 2] }, // Keep distance in meters (round to 2 decimals)
              else: { $round: [{ $divide: ["$distance", 1000] }, 2] }, // Convert to kilometers (round to 2 decimals)
            },
          },
          distanceUnit: {
            $cond: {
              if: { $lt: ["$distance", 1000] },
              then: "meters", // If distance is less than 1000 meters, show in meters
              else: "kilometers", // Otherwise, show in kilometers
            },
          },
        },
      },
    ]);

    res.status(200).json(taxis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

