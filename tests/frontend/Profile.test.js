import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Profile from '../../src/components/Profile';

jest.mock('axios');

describe('Profile Component', () => {
  it('should display user profile information', async () => {
    const user = { username: 'testuser', email: 'testuser@example.com' };
    axios.get.mockResolvedValueOnce({ data: { user } });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText('Username: testuser')).toBeInTheDocument();
      expect(screen.getByText('Email: testuser@example.com')).toBeInTheDocument();
    });
  });

  it('should display an error message if there is an error', async () => {
    const errorMessage = 'Failed to fetch profile';
    axios.get.mockRejectedValueOnce({ response: { data: { message: errorMessage } } });

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should display loading message while fetching profile', () => {
    render(<Profile />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
