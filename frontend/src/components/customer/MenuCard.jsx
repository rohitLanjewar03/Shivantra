import React from 'react';

const MenuCard = ({ item }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!item) {
    return null;
  }

  return (
    <div className={`flex items-start gap-6 py-6 border-b border-[var(--secondary-text)]/20 ${!item.available ? 'opacity-50' : ''}`}>
      {item.image && (
        <img 
          src={item.image.replace("http://localhost:5000/", "")} 
          alt={item.name} 
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-md flex-shrink-0" 
        />
      )}
      <div className="flex-1">
        <div className="flex justify-between items-start">
            <h3 className="text-xl md:text-2xl font-semibold">{item.name}</h3>
            <span className="text-xl md:text-2xl font-semibold text-[var(--primary)] pl-4 text-right">
              {formatPrice(item.price)}
            </span>
        </div>
        {item.description && (
          <p className="text-md text-[var(--secondary-text)] mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
