import { render, screen, waitFor } from '@testing-library/react';
import ViewTicketsPage from '../components/ViewTicketsPage'; // Adjust the import path as necessary
import api from '../services/api';

// Mock the api service
jest.mock('../services/api');

// Mock localStorage
const mockLocalStorage = (role, id) => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn((key) => {
        if (key === 'id') return id;
        return null;
      }),
    },
    writable: true,
  });
};

describe('ViewTicketsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage('customer', '123'); // Mock customer ID
  });

  it('renders loading state initially', () => {
    render(<ViewTicketsPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // Check for loading spinner
  });

  it('renders an error message when the API call fails', async () => {
    api.get.mockRejectedValue(new Error('API Error'));

    render(<ViewTicketsPage />);

    await waitFor(() => {
      expect(screen.getByText(/You dont have any tickets go to create tickets to report a problem./i)).toBeInTheDocument();
    });
  });

  it('renders tickets when the API call is successful', async () => {
    const tickets = [
      {
        ticketId: 1,
        customerEmail: 'customer@example.com',
        categoryName: 'Technical',
        subject: 'Issue with connection',
        description: 'I cannot connect to the internet.',
        created_at: '2024-01-01T10:00:00Z',
        status: 'open',
      },
      {
        ticketId: 2,
        customerEmail: 'customer@example.com',
        categoryName: 'Billing',
        subject: 'Question about invoice',
        description: 'I have a question regarding my last invoice.',
        created_at: '2024-01-02T10:00:00Z',
        status: 'closed',
      },
    ];

    api.get.mockResolvedValue({ data: tickets });

    render(<ViewTicketsPage />);

    await waitFor(() => {
      expect(screen.getByText(/My Tickets/i)).toBeInTheDocument();
      expect(screen.getByText(/Ticket #1/i)).toBeInTheDocument();
      expect(screen.getByText(/Issue with connection/i)).toBeInTheDocument();
      expect(screen.getByText(/Ticket #2/i)).toBeInTheDocument();
      expect(screen.getByText(/Question about invoice/i)).toBeInTheDocument();
    });
  });
});
