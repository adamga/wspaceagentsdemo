import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const errors = [];
    if (!email) errors.push('Email is required');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post('/api/request-password-reset', { email });
      if (response.status === 200) {
        setMessage('Password reset link has been sent to your email');
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>
                {error}
              </p>
            ))}
          </div>
        )}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
