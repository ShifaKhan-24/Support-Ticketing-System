import { render } from '@testing-library/react';
import TicketList from '../components/TicketList'; // Adjust the import path as necessary
import TicketItem from '../components/TicketItem'; // Mock the TicketItem component

// Mock the TicketItem component
jest.mock('../components/TicketItem', () => () => <tr><td>Mocked Ticket Item</td></tr>);

describe('TicketList', () => {
  it('renders "No tickets assigned to you." when tickets list is empty', () => {
    const { getByText } = render(<TicketList tickets={[]} />);

    expect(getByText('No tickets assigned to you.')).toBeInTheDocument();
  });

  it('renders a table with tickets when tickets list is not empty', () => {
    const tickets = [
      { ticketId: 1, description: 'Issue 1', status: 'Open', createdAt: '2024-01-01' },
      { ticketId: 2, description: 'Issue 2', status: 'Closed', createdAt: '2024-01-02' },
    ];

    const { getByText, getAllByText } = render(<TicketList tickets={tickets} />);

    expect(getByText('Ticket ID')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('Status')).toBeInTheDocument();
    expect(getByText('Created At')).toBeInTheDocument();

    // Check if the mocked TicketItem is rendered for each ticket
    const ticketItems = getAllByText('Mocked Ticket Item');
    expect(ticketItems).toHaveLength(tickets.length); // Ensure the number of rendered items matches the number of tickets
  });
});
