import React, { useState, useEffect } from 'react';

function MenuItemForm({ initialValues, categories, onSubmit, onCancel }) {
  const [values, setValues] = useState({
    name: initialValues.name || '',
    description: initialValues.description || '',
    price: initialValues.price || '',
    category: initialValues.category?._id || '',
    available: initialValues.available !== undefined ? initialValues.available : true,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setValues({
      name: initialValues.name || '',
      description: initialValues.description || '',
      price: initialValues.price || '',
      category: initialValues.category?._id || '',
      available: initialValues.available !== undefined ? initialValues.available : true,
    });
    if (initialValues.image) {
      setImagePreview(`http://localhost:5000${initialValues.image}`);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData();
    Object.keys(values).forEach(key => formData.append(key, values[key]));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    await onSubmit(formData);
    setSubmitting(false);
  };

  const isEditing = initialValues && initialValues._id;
  const inputClass = "mt-1 block w-full px-3 py-2 bg-[var(--admin-bg)] border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]";
  const labelClass = "block text-sm font-medium text-[var(--admin-text-secondary)]";

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4 font-serif">
        {isEditing ? 'Edit Menu Item' : 'Add New Menu Item'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" value={values.name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Menu Image</label>
          <div className="mt-2 flex items-center gap-4">
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="w-20 h-20 rounded-md object-cover" />}
            <input id="image-upload" type="file" name="image" onChange={handleFileChange} className="hidden" accept="image/*" />
            <label htmlFor="image-upload" className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:opacity-90">
              {imagePreview ? 'Change Image' : 'Upload Image'}
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="price" className={labelClass}>Price</label>
          <input id="price" name="price" type="number" value={values.price} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea id="description" name="description" value={values.description} onChange={handleChange} rows="3" className={inputClass} />
        </div>
        <div>
          <label htmlFor="category" className={labelClass}>Category</label>
          <select id="category" name="category" value={values.category} onChange={handleChange} required className={inputClass + ' max-h-48 overflow-y-auto'}>
            <option value="" disabled>Select a category</option>
            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
        </div>
        <div className="flex items-center">
          <input id="available" name="available" type="checkbox" checked={values.available} onChange={handleChange} className="h-4 w-4 text-[var(--admin-primary)] focus:ring-[var(--admin-primary)] border-gray-300 dark:border-gray-600 rounded" />
          <label htmlFor="available" className="ml-2 block text-sm">
            Available
          </label>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default MenuItemForm;
