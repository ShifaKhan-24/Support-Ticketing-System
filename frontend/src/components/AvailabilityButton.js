import React, { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Badge } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';  // For available (green)
// import CancelIcon from '@mui/icons-material/Cancel';  // For busy (red)
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';  // For offline (grey)
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; 
import api from'../services/api';

const AvailabilityButton = ({ agentId }) => {
  const [status, setStatus] = useState(null); // Track current status
  const [anchorEl, setAnchorEl] = useState(null);  // Anchor element for dropdown
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any error in fetching data

  const open = Boolean(anchorEl);

  // Status mapping with corresponding icons and colors
  const statusIcons = {
    available: <CheckCircleIcon style={{ color: 'green' }} />,
    busy: <FiberManualRecordIcon style={{ color: 'red' }} />,
    offline: <RemoveCircleIcon style={{ color: 'grey' }} />,
    undefined: <FiberManualRecordIcon style={{ color: 'grey' }} />,
  };

  // Fetch availability status when the component mounts
  useEffect(() => {
    const fetchAvailabilityStatus = async () => {
      try {
        const response = await api.get(`/agent/${agentId}/availability`);
        setStatus(response.data.availabilityStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching availability status:', error);
        setError('Failed to fetch availability status');
        setLoading(false);
      }
    };

    fetchAvailabilityStatus();
  }, [agentId]);

  // Handle button click to open dropdown
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    setAnchorEl(null); // Close dropdown
    setStatus(newStatus); // Update local status

    try {
      // Make API call to update the status
      await api.put(`/agent/${agentId}/availability`, {
        availabilityStatus: newStatus
      });
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Handle closing of dropdown
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* Availability Status Button */}
      <IconButton onClick={handleClick} size="small">
        {/* Show appropriate icon based on status */}
        <Badge>{statusIcons[status || 'undefined']}</Badge>
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 150,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={() => handleStatusChange('available')}>
          <CheckCircleIcon style={{ color: 'green', marginRight: 8 }} /> Available
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('busy')}>
          <FiberManualRecordIcon style={{ color: 'red', marginRight: 8 }} /> Busy
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('offline')}>
          <RemoveCircleIcon  style={{ color: 'grey', marginRight: 8 }} /> Offline
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvailabilityButton;
