import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AgentPage from '../components/AgentPage'; // Adjust the import path as necessary


// Mock the child components
jest.mock('../components/AgentNavbar', () => () => <div>Agent Navbar</div>);
jest.mock('../components/ManageAssignedTickets', () => () => <div>Manage Assigned Tickets</div>);
jest.mock('../components/AgentClosedTickets', () => () => <div>Agent Closed Tickets</div>);

describe('AgentPage', () => {
  it('renders Agent Navbar', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AgentPage />
      </MemoryRouter>
    );

    expect(getByText('Agent Navbar')).toBeInTheDocument();
  });

  it('renders Manage Assigned Tickets as default route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/agent']}>
        <AgentPage />
      </MemoryRouter>
    );

    expect(getByText('Assigned Tickets')).toBeInTheDocument();
  });

  it('renders Manage Assigned Tickets when navigating to manage-assigned-tickets route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/agent/manage-assigned-tickets']}>
        <AgentPage />
      </MemoryRouter>
    );

  });

  it('renders Agent Closed Tickets when navigating to closed-tickets route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/agent/closed-tickets']}>
        <AgentPage />
      </MemoryRouter>
    );

 
  });

  it('displays correct page title for manage-assigned-tickets', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/agent/manage-assigned-tickets']}>
        <AgentPage />
      </MemoryRouter>
    );

    expect(getByText('Assigned Tickets')).toBeInTheDocument(); // Default title for manage-assigned-tickets
  });

  it('displays correct page title for closed-tickets', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/agent/closed-tickets']}>
        <AgentPage />
      </MemoryRouter>
    );

    expect(getByText('Closed Tickets')).toBeInTheDocument();
  });
});
