import React from 'react';
import MenuCard from './MenuCard';

function CategorySection({ category }) {
  if (!category.items || category.items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold">
          {category.name}
        </h2>
        {category.description && (
          <p className="mt-2 text-lg text-[var(--secondary-text)] max-w-xl mx-auto">
            {category.description}
          </p>
        )}
      </div>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        {category.items.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
