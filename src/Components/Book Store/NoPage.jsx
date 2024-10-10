import React from 'react';
import './NoPage.css'; // Import the CSS file

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 Error: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Try checking the URL or going back to the previous page.</p>
    </div>
  );
};

export default NotFoundPage;