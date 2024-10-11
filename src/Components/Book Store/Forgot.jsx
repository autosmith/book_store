import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginSignup.css'; 

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmNewPassword: '',
  });
  const [message, setMessage] = useState('');
  const [showLoginLink, setShowLoginLink] = useState(false); // State to control the visibility of the login link

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/forgot';
    const data = {
      email: formData.email,
      new_password: formData.password,
      confirm_new_password: formData.confirmNewPassword,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.message || 'Password reset successful');
        setShowLoginLink(true); // Show the login link on success
      } else {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'An error occurred');
        setShowLoginLink(false); // Hide the login link on error
      }
    } catch (error) {
      setMessage('Network error or no response from server');
      setShowLoginLink(false); // Hide the login link on error
    }
  };

  return (
    <div className="container">
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">Reset Password</button>
      </form>

      <p className="message">{message}</p>

      {/* Conditionally render the Login link if the password reset was successful */}
      {showLoginLink && (
        <p className="login-link">
          <span>Login to continue: </span>
          <a href="#" onClick={() => navigate('/login')}>Login</a>
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
