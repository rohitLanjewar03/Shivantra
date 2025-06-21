import React, { useState } from 'react';

function CategoryForm({ initialValues, onSubmit, onCancel }) {
  const [name, setName] = useState(initialValues.name || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ name, description });
    setSubmitting(false);
  };

  const isEditing = initialValues && initialValues._id;
  const inputClass = "mt-1 block w-full px-3 py-2 bg-[var(--admin-bg)] border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]";
  const labelClass = "block text-sm font-medium text-[var(--admin-text-secondary)]";

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-4 font-serif">
        {isEditing ? 'Edit Category' : 'Add New Category'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            className={inputClass}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <input
            id="description"
            className={inputClass}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
