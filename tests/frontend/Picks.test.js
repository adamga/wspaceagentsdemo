import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Picks from '../../src/components/Picks';

jest.mock('axios');

describe('Picks Component', () => {
  const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { players } });
  });

  test('renders picks form', async () => {
    render(
      <MemoryRouter>
        <Picks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Register Your Picks/i)).toBeInTheDocument();
    });

    players.forEach((player) => {
      expect(screen.getByText(player.name)).toBeInTheDocument();
    });
  });

  test('displays error message for duplicate picks', async () => {
    render(
      <MemoryRouter>
        <Picks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Register Your Picks/i)).toBeInTheDocument();
    });

    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: '1' },
    });
    fireEvent.change(screen.getAllByRole('combobox')[1], {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/Submit Picks/i));

    expect(screen.getByText(/You must select 12 unique players/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    render(
      <MemoryRouter>
        <Picks />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Register Your Picks/i)).toBeInTheDocument();
    });

    players.forEach((player, index) => {
      fireEvent.change(screen.getAllByRole('combobox')[index], {
        target: { value: player.id.toString() },
      });
    });

    fireEvent.click(screen.getByText(/Submit Picks/i));

    await waitFor(() => {
      expect(screen.getByText(/Picks submitted successfully/i)).toBeInTheDocument();
    });
  });
});
