import React from 'react';

function MenuCard({ item }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const imageUrl = item.image ? `http://localhost:5000${item.image}` : null;
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col ${!item.available ? 'opacity-60' : ''}`}>
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-xl overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-gray-400 dark:text-gray-500 text-4xl">🍽️</span>
        )}
      </div>
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h3>
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
        )}
      </div>
      {!item.available && (
        <div className="px-6 py-2 bg-gray-100 dark:bg-gray-700/50">
          <p className="text-sm font-semibold text-center text-red-600 dark:text-red-400">
            Currently Unavailable
          </p>
        </div>
      )}
    </div>
  );
}

export default MenuCard;
