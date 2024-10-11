import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginSignup.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [showResetLink, setShowResetLink] = useState(false); // State to handle reset link display

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/login';
    const data = {
      username: formData.username,
      password: formData.password,
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
        setMessage(parsedBody.message || 'Success');
        setShowResetLink(false); // Hide reset link if login is successful

        // Add a delay before navigating to the home page
        setTimeout(() => {
          navigate('/home');  // Redirect to BookStore page
        }, 750); // 750 ms delay for Login Successful message on screen

      } else if (result.statusCode === 404) {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'Please Sign up');
        setShowResetLink(false); // Hide reset link

        // Navigate to the signup page if status code is 404
        setTimeout(() => {
          navigate('/signup');
        }, 900); 

      } else if (result.statusCode === 403) {
        // Handle incorrect password
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'Incorrect password');
        setShowResetLink(true); // Show reset link
      } else {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'An error occurred');
        setShowResetLink(false); // Hide reset link
      }
    } catch (error) {
      setMessage('Network error or no response from server');
      setShowResetLink(false); // Hide reset link
    }
  };

  // Function to navigate to forgot password page
  const handleResetPassword = () => {
    navigate('/forgot');
  };

  // Function to navigate to signup page
  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">Login</button>
      </form>

      <p className="message">{message}</p>

      {/* Conditionally render the "Reset Password" link */}
      {showResetLink && (
        <p className="reset-link">
          <a href="#" onClick={handleResetPassword}>Reset Password</a>
        </p>
      )}

      {/* Signup link at the bottom right */}
      <p className="signup-link" onClick={handleSignup}>
        <span>Don't have an account? <a href="#">Signup</a></span>
      </p>
    </div>
  );
};

export default Login;
