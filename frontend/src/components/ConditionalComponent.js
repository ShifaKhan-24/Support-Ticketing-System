// // import React from 'react';
// // import AgentDashboard from './AgentDashboard';
// // import CustomerPage from './CustomerPage'; // Updated import

// // const ConditionalComponent = ({ role, agentId, customerId }) => {
// //   console.log("ConditionalComponent customerId:", customerId);

// //   return (
// //     <div>
// //       {role === 'agent' && <AgentDashboard agentId={agentId} />}
// //       {role === 'customer' && <CustomerPage customerId={customerId} />} {/* Pass customerId here */}
// //     </div>
// //   );
// // };

// // export default ConditionalComponent;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import AgentDashboard from './AgentPage';

// const ConditionalComponent = ({ role, agentId, customerId }) => {
//   console.log("ConditionalComponent customerId:", customerId);

//   if (role === 'agent') {
//     return <AgentDashboard agentId={agentId} />;
//   }

//   if (role === 'customer') {
//     return <Navigate to={`/customer/${customerId}`} />;
//   }

//   return null; // or a fallback UI
// };

// export default ConditionalComponent;
