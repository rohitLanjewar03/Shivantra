const Restaurant = require('../models/Restaurant');

// Get restaurant info (public)
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne();
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create restaurant (admin)
exports.createRestaurant = async (req, res) => {
  try {
    const restaurantData = { ...req.body };
    if (req.file) {
      // Apply a transformation to the logo URL from Cloudinary
      // This creates a 200x200px square PNG, perfect for logos.
      const transformedLogoUrl = req.file.path.replace('/upload/', '/upload/w_200,h_200,c_fill,f_png/');
      restaurantData.logo = transformedLogoUrl;
    }
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update restaurant (admin)
exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      // Apply the same transformation on update
      const transformedLogoUrl = req.file.path.replace('/upload/', '/upload/w_200,h_200,c_fill,f_png/');
      updateData.logo = transformedLogoUrl;
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 