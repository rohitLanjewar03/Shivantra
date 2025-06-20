const API_BASE = 'http://localhost:5000/api'; // Change to your backend URL if needed

export async function getCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(data) {
  const res = await fetch(`${API_BASE}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategory(id, data) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_BASE}/categories/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}

// --- Menu Item Functions ---

export async function getItems() {
  const res = await fetch(`${API_BASE}/items`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function createItem(formData) {
  const res = await fetch(`${API_BASE}/items`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create item' }));
    throw new Error(errorData.error || errorData.message);
  }
  return res.json();
}

export async function updateItem(id, formData) {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update item' }));
    throw new Error(errorData.error || errorData.message);
  }
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/items/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
}

// --- Restaurant Settings Functions ---

export async function getRestaurant() {
  const res = await fetch(`${API_BASE}/restaurant`);
  if (res.status === 404) {
    throw new Error('Restaurant not found');
  }
  if (!res.ok) throw new Error('Failed to fetch restaurant settings');
  return res.json();
}

export async function updateRestaurant(id, formData) {
  const res = await fetch(`${API_BASE}/restaurant/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to update restaurant settings' }));
    throw new Error(errorData.error || errorData.message);
  }
  return res.json();
}

export async function createRestaurant(formData) {
  const res = await fetch(`${API_BASE}/restaurant`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: 'Failed to create restaurant settings' }));
    throw new Error(errorData.error || errorData.message);
  }
  return res.json();
}
