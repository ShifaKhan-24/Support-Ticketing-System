import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login'; // Adjust the import path as necessary
import api from '../services/api';

// Mock the api service
jest.mock('../services/api');

// Mock localStorage
const mockLocalStorage = () => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: jest.fn(),
    },
    writable: true,
  });
};

// Mock window.alert
global.alert = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage(); // Mock localStorage
  });

  it('renders the login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    api.post.mockResolvedValue({
      data: {
        token: 'mockToken',
        role: 'customer',
        id: '123',
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockToken');
      expect(localStorage.setItem).toHaveBeenCalledWith('role', 'customer');
      expect(localStorage.setItem).toHaveBeenCalledWith('id', '123');
    });
    expect(window.location.pathname).toBe('/dashboard'); // Adjust based on your routing
  });

  it('handles login failure', async () => {
    api.post.mockRejectedValue({
      response: {
        data: {
          message: 'Invalid email or password',
        },
      },
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Invalid email or password');
    });
  });
});
