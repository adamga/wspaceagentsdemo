import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import VerifyAccount from '../../src/components/VerifyAccount';

const mock = new MockAdapter(axios);

describe('VerifyAccount Component', () => {
  test('displays verification success message', async () => {
    const token = 'valid-token';
    mock.onGet(`/api/verify-account?token=${token}`).reply(200, {
      message: 'Account verified successfully',
    });

    render(
      <MemoryRouter initialEntries={[`/verify-account?token=${token}`]}>
        <Route path="/verify-account">
          <VerifyAccount />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Account verified successfully/i)).toBeInTheDocument();
    });
  });

  test('displays verification error message', async () => {
    const token = 'invalid-token';
    mock.onGet(`/api/verify-account?token=${token}`).reply(400, {
      message: 'Verification failed',
    });

    render(
      <MemoryRouter initialEntries={[`/verify-account?token=${token}`]}>
        <Route path="/verify-account">
          <VerifyAccount />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Verification failed/i)).toBeInTheDocument();
    });
  });

  test('displays invalid verification link message', async () => {
    render(
      <MemoryRouter initialEntries={['/verify-account']}>
        <Route path="/verify-account">
          <VerifyAccount />
        </Route>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Invalid verification link/i)).toBeInTheDocument();
    });
  });
});
