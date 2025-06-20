import React from 'react';

const Error = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
      <span className="font-medium">Error:</span> {message}
    </div>
  );
};

export default Error;
