import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CustomerPage from '../components/CustomerPage'; // Adjust the import path as necessary

// Mock the child components
jest.mock('../components/Sidebar', () => () => <div>Sidebar</div>);
jest.mock('../components/ViewTicketsPage', () => () => <div>View Tickets</div>);
jest.mock('../components/CreateTicketForm', () => () => <div>Create Ticket Form</div>);
jest.mock('../components/ClosedTickets', () => () => <div>Closed Tickets</div>);
jest.mock('../components/FindStore', () => () => <div>Find Store</div>);
jest.mock('../components/Help', () => () => <div>Help</div>);
jest.mock('../components/About', () => () => <div>About</div>);
jest.mock('../components/PrivacyTerms', () => () => <div>Privacy Terms</div>);

describe('CustomerPage', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('renders Sidebar with customerId from localStorage', () => {
    localStorage.setItem('id', '123');

    const { getByText } = render(
      <MemoryRouter>
        <CustomerPage />
      </MemoryRouter>
    );

    expect(getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders ViewTicketsPage as default route', () => {
    localStorage.setItem('id', '123');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <CustomerPage />
      </MemoryRouter>
    );

    expect(getByText('View Tickets')).toBeInTheDocument();
  });

  it('renders CreateTicketForm when navigating to create-ticket route', () => {
    localStorage.setItem('id', '123');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/create-ticket']}>
        <CustomerPage />
      </MemoryRouter>
    );

    expect(getByText('Create Ticket Form')).toBeInTheDocument();
  });

  it('renders FindStore when navigating to find-store route', () => {
    localStorage.setItem('id', '123');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/find-store']}>
        <CustomerPage />
      </MemoryRouter>
    );

    expect(getByText('Find Store')).toBeInTheDocument();
  });

  // Add more tests for other routes as needed
});
