const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');

// Get full menu grouped by category (only available items)
exports.getMenu = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    const menu = await Promise.all(
      categories.map(async (category) => {
        const items = await MenuItem.find({ category: category._id, available: true });
        return {
          _id: category._id,
          name: category.name,
          description: category.description,
          items,
        };
      })
    );
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 