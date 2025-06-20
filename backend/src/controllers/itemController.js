const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');

// Create a new menu item
exports.createItem = async (req, res) => {
  try {
    const itemData = { ...req.body };
    if (req.file) {
      itemData.image = req.file.path;
    }
    const cat = await MenuCategory.findById(itemData.category);
    if (!cat) return res.status(400).json({ error: 'Invalid category' });
    
    const item = new MenuItem(itemData);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all menu items
exports.getAllItems = async (req, res) => {
  try {
    const items = await MenuItem.find().populate('category');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id).populate('category');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a menu item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
    }
    
    if (updateData.category) {
      const cat = await MenuCategory.findById(updateData.category);
      if (!cat) return res.status(400).json({ error: 'Invalid category' });
    }

    const item = await MenuItem.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a menu item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get items by category (optional)
exports.getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await MenuItem.find({ category: categoryId, available: true }).populate('category');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 