// Loader.jsx

import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      {/* Example loader - Customize this as per your design */}
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader; // Make sure this line is present to export the component
