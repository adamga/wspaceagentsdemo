import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Picks = () => {
  const [players, setPlayers] = useState([]);
  const [picks, setPicks] = useState(Array(12).fill(''));
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('/api/players');
        setPlayers(response.data.players);
      } catch (error) {
        setErrors([error.response.data.message]);
      }
    };

    fetchPlayers();
  }, []);

  const validateForm = () => {
    const errors = [];
    const uniquePicks = new Set(picks);
    if (uniquePicks.size !== 12) errors.push('You must select 12 unique players');
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
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/picks',
        { picks },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setSuccessMessage('Picks submitted successfully');
      }
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  const handlePickChange = (index, value) => {
    const newPicks = [...picks];
    newPicks[index] = value;
    setPicks(newPicks);
  };

  return (
    <div>
      <h2>Register Your Picks</h2>
      <form onSubmit={handleSubmit}>
        {picks.map((pick, index) => (
          <div key={index}>
            <label>Pick {index + 1}:</label>
            <select
              value={pick}
              onChange={(e) => handlePickChange(index, e.target.value)}
            >
              <option value="">Select a player</option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        {errors.length > 0 && (
          <div>
            {errors.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>
                {error}
              </p>
            ))}
          </div>
        )}
        {successMessage && (
          <div>
            <p style={{ color: 'green' }}>{successMessage}</p>
          </div>
        )}
        <button type="submit">Submit Picks</button>
      </form>
    </div>
  );
};

export default Picks;
