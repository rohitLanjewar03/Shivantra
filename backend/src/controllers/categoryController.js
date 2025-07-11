const MenuCategory = require('../models/MenuCategory');
const MenuItem = require('../models/MenuItem');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new MenuCategory({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await MenuCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await MenuCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await MenuCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Delete all menu items in this category
    await MenuItem.deleteMany({ category: id });

    // Delete the category
    await MenuCategory.findByIdAndDelete(id);

    res.json({ message: 'Category and all associated items deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 