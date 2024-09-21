import React, { useState } from 'react';
import TicketOverview from './TicketOverview';
import TeamPerformance from './TeamPerformance';

const ManagerDashboard = () => {
  const [view, setView] = useState('ticketOverview'); // default to 'Ticket Overview'

  return (
    <div>
      {/* Simple Navigation for Switching Views */}
      <nav>
        <button onClick={() => setView('ticketOverview')}>Ticket Overview</button>
        <button onClick={() => setView('teamPerformance')}>Team Performance</button>
      </nav>

      {/* Conditionally Render Based on Selected View */}
      {view === 'ticketOverview' && <TicketOverview />}
      {view === 'teamPerformance' && <TeamPerformance />}
    </div>
  );
};

export default ManagerDashboard;
