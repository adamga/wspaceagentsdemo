import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const VerifyAccount = () => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const verifyAccount = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      if (!token) {
        setError('Invalid verification link');
        return;
      }

      try {
        const response = await axios.get(`/api/verify-account?token=${token}`);
        setVerificationStatus(response.data.message);
      } catch (err) {
        setError(err.response.data.message || 'Verification failed');
      }
    };

    verifyAccount();
  }, [location.search]);

  return (
    <div>
      <h2>Account Verification</h2>
      {verificationStatus && <p>{verificationStatus}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyAccount;
