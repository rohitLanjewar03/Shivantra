const API_BASE = 'http://localhost:5000/api';

export async function getMenu() {
  try {
    const res = await fetch(`${API_BASE}/menu`);
    if (!res.ok) throw new Error('Failed to fetch menu');
    return res.json();
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
}

export async function getRestaurant() {
  try {
    const res = await fetch(`${API_BASE}/restaurant`);
    if (!res.ok) throw new Error('Failed to fetch restaurant info');
    return res.json();
  } catch (error) {
    console.error('Error fetching restaurant info:', error);
    throw error;
  }
}
