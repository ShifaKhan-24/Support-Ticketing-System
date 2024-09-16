import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // Use axios for HTTP requests
import TicketList from './TicketList';

const ClosedTickets = () => {

  const customerId = localStorage.getItem('id');

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClosedTickets = async () => {
      if (!customerId) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/customers/${customerId}/tickets/closed');
        setTickets(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching closed tickets:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchClosedTickets();
  }, [customerId]);

  if (loading) return <p>Loading closed tickets...</p>;
  if (error) return <p>Error loading closed tickets. Please try again later.</p>;

  return (
    <div>
      <h1>Closed Tickets</h1>
      <TicketList tickets={tickets} /> {/* Passing tickets to TicketList */}
    </div>
  );
};

export default ClosedTickets;
