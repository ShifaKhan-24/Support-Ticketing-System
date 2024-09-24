import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../components/Dashboard'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Dashboard', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear(); // Clear localStorage before each test
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('redirects to /agent if role is agent', () => {
    localStorage.setItem('role', 'agent');
    localStorage.setItem('id', '123');

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/agent');
  });

  it('redirects to /customer if role is customer', () => {
    localStorage.setItem('role', 'customer');

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/customer');
  });

  it('redirects to / if no role is found', () => {
    localStorage.setItem('role', null);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('redirects to / if role is not recognized', () => {
    localStorage.setItem('role', 'unknown');

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
