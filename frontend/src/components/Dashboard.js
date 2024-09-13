import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id'); // Assuming you might store customerId too
  
  useEffect(() => {
    if (role === 'agent') {
      console.log(id);
      navigate(`/agent`);
    } 
    else if (role === 'customer') {
      if (role === 'customer') {
        navigate(`/customer`);
      } else {
        navigate('/'); // Redirect to login if no customerId is found
      }
    } else {
      navigate('/'); // Redirect to login if no role is found
    }
  }, [navigate, role, id]);

  return null; // This component just handles redirection
};

export default Dashboard;
