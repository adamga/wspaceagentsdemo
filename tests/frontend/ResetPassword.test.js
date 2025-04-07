import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from '../../src/components/ResetPassword';

describe('ResetPassword Component', () => {
  test('renders reset password form', () => {
    render(<ResetPassword />);

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  test('displays error message for empty email field', () => {
    render(<ResetPassword />);

    fireEvent.click(screen.getByText(/Reset Password/i));

    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  test('submits the form with valid email', async () => {
    render(<ResetPassword />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.click(screen.getByText(/Reset Password/i));

    // Add assertions for form submission and success message
  });
});
