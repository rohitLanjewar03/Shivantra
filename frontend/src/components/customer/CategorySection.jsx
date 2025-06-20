import React from 'react';
import MenuCard from './MenuCard';

function CategorySection({ category }) {
  if (!category.items || category.items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {category.name}
        </h2>
        {category.description && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
