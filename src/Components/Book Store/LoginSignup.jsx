import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate

const App = () => {
  const [formType, setFormType] = useState('login'); // 'login', 'signup', or 'forgotPassword'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmNewPassword: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Step 2: Initialize useNavigate

  // Handle form data changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log('Form Data:', formData); // Log the form data whenever it changes
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let apiEndpoint = '';
    let data = {};
  
    switch (formType) {
      case 'login':
        apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/login';
        data = {
          username: formData.username,
          password: formData.password,
        };
        break;
  
      case 'signup':
        apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/signup';
        data = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
        break;
  
      case 'forgotPassword':
        apiEndpoint = 'https://acajyyje6f.execute-api.us-east-1.amazonaws.com/stage1/forgot';
        data = {
          email: formData.email,
          new_password: formData.password,
          confirm_new_password: formData.confirmNewPassword,
        };
        break;
  
      default:
        break;
    }

    console.log('API Endpoint:', apiEndpoint);
    console.log('Data being sent:', data);
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      console.log('Raw response from API:', response);
    
      // Parse the response into JSON
      const result = await response.json();
      console.log('Parsed response:', result);
    
      // Check if the parsed response body contains a custom statusCode
      if (result.statusCode === 200) {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.message || 'Success');
        console.log('Success:', parsedBody.message || 'Success');
        
        // Step 3: Navigate to the BookStore page after successful login
        if (formType === 'login') {
          navigate('/home');  // Redirect to BookStore page
        }
      } else {
        const parsedBody = JSON.parse(result.body);
        setMessage(parsedBody.error || 'An error occurred');
        console.log('Error:', parsedBody.error || 'An error occurred');
      }
    
    } catch (error) {
      setMessage('Network error or no response from server');
      console.error('Network error:', error);
    }
  };

  // Reset form data and message when switching form types
  const changeFormType = (newFormType) => {
    setFormType(newFormType);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmNewPassword: '',
    });
    setMessage(''); // Clear the message when changing form types
  };

  return (
    <div style={styles.container}>
      <h1>{formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign Up' : 'Forgot Password'}</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        {(formType === 'signup' || formType === 'login') && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </>
        )}
        {(formType === 'signup' || formType === 'forgotPassword') && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </>
        )}
        <input
          type="password"
          name="password"
          placeholder={formType === 'forgotPassword' ? 'New Password' : 'Password'}
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {formType === 'forgotPassword' && (
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <button type="submit" style={styles.button}>
          {formType === 'login' ? 'Login' : formType === 'signup' ? 'Sign Up' : 'Reset Password'}
        </button>
      </form>

      <p style={styles.message}>{message}</p>

      <div style={styles.toggleContainer}>
        {formType !== 'login' && <button onClick={() => changeFormType('login')} style={styles.toggleButton}>Login</button>}
        {formType !== 'signup' && <button onClick={() => changeFormType('signup')} style={styles.toggleButton}>Sign Up</button>}
        {formType !== 'forgotPassword' && <button onClick={() => changeFormType('forgotPassword')} style={styles.toggleButton}>Forgot Password</button>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '20px',
    color: 'red',
  },
  toggleContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default App;
