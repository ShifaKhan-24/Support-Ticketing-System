import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TicketItem from '../components/TicketItem';

const mockTicket = {
  _id: '1',
  description: 'Network issue reported by customer.',
  status: 'Open',
  createdAt: '2024-09-20T10:17:51.797Z',
};

describe('TicketItem Component', () => {
  it('renders correctly with ticket data', () => {
    render(<TicketItem ticket={mockTicket} />);

    expect(screen.getByText(mockTicket._id)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.description)).toBeInTheDocument();
    expect(screen.getByText(mockTicket.status)).toBeInTheDocument();
    const formattedDate = new Date(mockTicket.createdAt).toLocaleDateString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
  it('applies hover styles on mouse over', () => {
    render(<TicketItem ticket={mockTicket} />);
    const row = screen.getByRole('row');

    // Simulate hover by setting the class or directly testing using getComputedStyle
    fireEvent.mouseOver(row);
    expect(row).toHaveStyle({
      backgroundColor: '#E0E0E0',
    });
  });
  
});
