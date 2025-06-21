import React, { useState, useEffect } from 'react';

function RestaurantSettingsForm({ initialData, onSave, isCreateMode }) {
  const [formData, setFormData] = useState({ ...initialData });
  const [logoPreview, setLogoPreview] = useState(initialData?.logo);
  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({ ...initialData });
    setLogoPreview(initialData?.logo);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
        if (key !== 'logo') {
             submissionData.append(key, formData[key]);
        }
    });

    if (logoFile) {
      submissionData.append('logo', logoFile);
    } else if (initialData?.logo) {
      submissionData.append('logo', initialData.logo)
    }

    await onSave(submissionData);
    setIsSubmitting(false);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-[var(--admin-bg)] border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[var(--admin-primary)] focus:border-[var(--admin-primary)]";
  const labelClass = "block text-sm font-medium text-[var(--admin-text-secondary)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClass}>Restaurant Name</label>
        <input id="name" type="text" name="name" value={formData.name || ''} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>Address</label>
        <input id="address" type="text" name="address" value={formData.address || ''} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Phone</label>
        <input id="phone" type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>Logo</label>
        <div className="mt-2 flex items-center gap-4">
          {logoPreview && <img src={logoPreview} alt="Logo Preview" className="w-20 h-20 rounded-md object-cover" />}
          <input id="logo-upload" type="file" name="logo" onChange={handleFileChange} className="hidden" accept="image/*" />
          <label htmlFor="logo-upload" className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md hover:opacity-90">
            Change Logo
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea id="description" name="description" rows="3" value={formData.description || ''} onChange={handleChange} className={inputClass} />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {isSubmitting ? 'Saving...' : (isCreateMode ? 'Create Profile' : 'Save Settings')}
        </button>
      </div>
    </form>
  );
}

export default RestaurantSettingsForm; 