import React from 'react';

function MenuCard({ item }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={`flex justify-between items-start pb-4 border-b border-[var(--secondary-text)]/20 ${!item.available ? 'opacity-50' : ''}`}>
      <div className="flex-1 pr-4">
        <h3 className="text-2xl font-semibold">{item.name}</h3>
        {item.description && (
          <p className="text-md text-[var(--secondary-text)] mt-1">{item.description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        <span className="text-2xl font-semibold text-[var(--primary)]">
          {formatPrice(item.price)}
        </span>
      </div>
    </div>
  );
}

export default MenuCard;
