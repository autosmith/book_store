import React, { useState } from 'react';
import './LoginSignup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/signup';
    const data = {
      username: formData.username,
      email: formData.email,
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
        setMessage(parsedBody.message || 'Signup successful');
      } else {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'An error occurred');
      }
    } catch (error) {
      setMessage('Network error or no response from server');
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>

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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input"
        />
        <button type="submit" className="button">Sign Up</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
};

export default Signup;
