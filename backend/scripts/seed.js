const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const MenuCategory = require('../src/models/MenuCategory');
const MenuItem = require('../src/models/MenuItem');
const Restaurant = require('../src/models/Restaurant');

// Sample restaurant data
const restaurantData = {
  name: 'Shivantra Caterers',
  description: 'Authentic Indian cuisine with a modern twist. Experience the rich flavors and aromas of traditional Indian cooking.',
  address: '123 Main Street, Downtown, City - 123456',
  phone: '+91 98765 43210',
  email: 'info@spicegarden.com',
  logo: '', // Add logo URL here
  openingHours: 'Monday - Sunday: 11:00 AM - 11:00 PM',
  website: 'https://spicegarden.com',
  theme: {
    primaryColor: '#1f2937',
    accentColor: '#3b82f6'
  }
};

// Sample data
const categories = [
  {
    name: 'Starters',
    description: 'Appetizers and small plates to begin your meal'
  },
  {
    name: 'Main Course',
    description: 'Hearty main dishes with rice and breads'
  },
  {
    name: 'Breads',
    description: 'Freshly baked Indian breads'
  },
  {
    name: 'Rice & Biryani',
    description: 'Aromatic rice dishes and biryanis'
  },
  {
    name: 'Desserts',
    description: 'Sweet treats to end your meal'
  },
  {
    name: 'Beverages',
    description: 'Refreshing drinks and traditional beverages'
  }
];

const menuItems = [
  // Starters
  {
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese marinated in spices',
    price: 280,
    category: 'Starters',
    available: true
  },
  {
    name: 'Chicken 65',
    description: 'Spicy deep-fried chicken with curry leaves',
    price: 320,
    category: 'Starters',
    available: true
  },
  {
    name: 'Veg Spring Roll',
    description: 'Crispy rolls filled with mixed vegetables',
    price: 180,
    category: 'Starters',
    available: true
  },
  {
    name: 'Mushroom Manchurian',
    description: 'Crispy mushrooms in spicy Chinese-style sauce',
    price: 220,
    category: 'Starters',
    available: true
  },

  // Main Course
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato and butter gravy',
    price: 450,
    category: 'Main Course',
    available: true
  },
  {
    name: 'Palak Paneer',
    description: 'Cottage cheese in creamy spinach gravy',
    price: 320,
    category: 'Main Course',
    available: true
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils with cream',
    price: 280,
    category: 'Main Course',
    available: true
  },
  {
    name: 'Chicken Curry',
    description: 'Spicy chicken curry with onions and tomatoes',
    price: 380,
    category: 'Main Course',
    available: true
  },

  // Breads
  {
    name: 'Butter Naan',
    description: 'Soft leavened bread brushed with butter',
    price: 40,
    category: 'Breads',
    available: true
  },
  {
    name: 'Roti',
    description: 'Whole wheat flatbread',
    price: 25,
    category: 'Breads',
    available: true
  },
  {
    name: 'Garlic Naan',
    description: 'Naan topped with garlic and coriander',
    price: 60,
    category: 'Breads',
    available: true
  },

  // Rice & Biryani
  {
    name: 'Veg Biryani',
    description: 'Aromatic rice with mixed vegetables and spices',
    price: 280,
    category: 'Rice & Biryani',
    available: true
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant rice with tender chicken pieces',
    price: 380,
    category: 'Rice & Biryani',
    available: true
  },
  {
    name: 'Jeera Rice',
    description: 'Basmati rice flavored with cumin seeds',
    price: 120,
    category: 'Rice & Biryani',
    available: true
  },

  // Desserts
  {
    name: 'Gulab Jamun',
    description: 'Sweet milk solids in sugar syrup',
    price: 80,
    category: 'Desserts',
    available: true
  },
  {
    name: 'Rasmalai',
    description: 'Soft cheese patties in sweetened milk',
    price: 120,
    category: 'Desserts',
    available: true
  },
  {
    name: 'Kheer',
    description: 'Rice pudding with nuts and cardamom',
    price: 100,
    category: 'Desserts',
    available: true
  },

  // Beverages
  {
    name: 'Masala Chai',
    description: 'Spiced Indian tea with milk',
    price: 40,
    category: 'Beverages',
    available: true
  },
  {
    name: 'Lassi',
    description: 'Sweet yogurt-based drink',
    price: 60,
    category: 'Beverages',
    available: true
  },
  {
    name: 'Mango Lassi',
    description: 'Sweet mango and yogurt drink',
    price: 80,
    category: 'Beverages',
    available: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await MenuCategory.deleteMany({});
    await MenuItem.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Insert restaurant
    await Restaurant.create(restaurantData);
    console.log('Restaurant seeded successfully');

    // Insert categories
    const createdCategories = await MenuCategory.insertMany(categories);
    console.log('Categories seeded successfully');

    // Create a map of category names to IDs
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Update menu items with category IDs
    const itemsWithCategoryIds = menuItems.map(item => ({
      ...item,
      category: categoryMap[item.category]
    }));

    // Insert menu items
    await MenuItem.insertMany(itemsWithCategoryIds);
    console.log('Menu items seeded successfully');

    console.log('Database seeded successfully!');
    console.log(`Created ${createdCategories.length} categories and ${menuItems.length} menu items`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedDatabase();
