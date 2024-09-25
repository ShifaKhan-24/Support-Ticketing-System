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

  test('displays error message if API request fails', async () => {
  api.get.mockRejectedValueOnce(new Error('API Error')); // Mock API failure

  render(<ViewTicketsPage />);

  const errorMessage = await screen.findByText(/You don't have any tickets. Go to create tickets to report an issue./i);
  expect(errorMessage).toBeInTheDocument();
});

test('displays tickets after fetching from API', async () => {
  const mockTickets = [
    { ticketId: 1, status: 'open', customerEmail: 'test1@example.com', subject: 'Issue 1' },
    { ticketId: 2, status: 'closed', customerEmail: 'test2@example.com', subject: 'Issue 2' }
  ];

  api.get.mockResolvedValueOnce({ data: mockTickets });

  render(<ViewTicketsPage />);

  const ticket1 = await screen.findByText(/Ticket #1/i);
  const ticket2 = await screen.findByText(/Ticket #2/i);

  expect(ticket1).toBeInTheDocument();
  expect(ticket2).toBeInTheDocument();
});

test('displays selected ticket details when clicked', async () => {
  const mockTickets = [
    { ticketId: 1, status: 'open', customerEmail: 'test1@example.com', subject: 'Issue 1', description: 'Description 1', categoryName: 'Network' }
  ];

  api.get.mockResolvedValueOnce({ data: mockTickets });

  render(<ViewTicketsPage />);

  const ticketCard = await screen.findByText(/Ticket #1/i);
  ticketCard.click();

  const ticketDetails = await screen.findByText(/Description 1/i);
  expect(ticketDetails).toBeInTheDocument();
});

  // it('renders tickets when the API call is successful', async () => {
  //   const tickets = [
  //     {
  //       ticketId: 1,
  //       customerEmail: 'customer@example.com',
  //       categoryName: 'Technical',
  //       subject: 'Issue with connection',
  //       description: 'I cannot connect to the internet.',
  //       status: 'open',
  //       created_at: '2024-01-01T10:00:00Z',
  //     },
  //   ];
  
  //   jest.mock('../services/api', () => ({
  //     get: jest.fn().mockResolvedValue({ data: tickets }),
  //   }));
  
  //   const { getByText } = render(<ViewTicketsPage />);
  
  //   await waitFor(() => {
  //     expect(getByText(/Ticket #1/i)).toBeInTheDocument();
  //     expect(getByText(/Technical/i)).toBeInTheDocument();
  //     expect(getByText(/Issue with connection/i)).toBeInTheDocument();
  //   });
  // });
});
