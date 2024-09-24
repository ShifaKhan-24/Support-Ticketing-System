import React, { useState } from 'react';
import { Box, Button, IconButton, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Import the attachment icon
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'; // Import the remove icon
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Import the upload icon
import api from '../services/api'; // Adjust import according to your project structure

const FileUpload = ({ ticketId }) => {
  const [files, setFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const handleUpload = async () => {
    setUploadingFiles(true); // Show uploading status

    try {
      const formData = new FormData();
      formData.append('ticketId', ticketId);

      // Append files to formData
      for (const file of files) {
        formData.append('files', file);
      }
      console.log({ticketId});
      await api.post(`/tickets/${ticketId}/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set success message and clear the files
      setSuccessMessage('Files uploaded successfully!');
      setFiles([]);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Error uploading files:', err);
      setSuccessMessage('Error uploading files. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setUploadingFiles(false); // Hide uploading status
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        padding: '20px',
        bgcolor: '#FFFFFF', // White background for consistency
        borderRadius: '8px',
        border: '1px solid #E0E0E0', // Subtle border to define the area
        position: 'relative', // For positioning the loading indicator
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<AttachFileIcon sx={{ color: '#9E9E9E' }} />}
          sx={{
            borderColor: '#9E9E9E',
            color: '#9E9E9E',
            '&:hover': { borderColor: '#7D7D7D', color: '#7D7D7D' },
          }}
        >
          Select File
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            hidden
          />
        </Button>
        <Box sx={{ ml: 2 }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            sx={{
              bgcolor: '#FFFFFF',
              color: '#0033A0',
              minWidth: 'auto',
              padding: 0,
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #0033A0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                bgcolor: '#F0F0F0',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              },
              '&:active': {
                bgcolor: '#E0E0E0',
                boxShadow: 'none',
              },
            }}
            disabled={uploadingFiles} // Disable button while uploading
          >
            {uploadingFiles ? <CircularProgress size={24} sx={{ color: '#0033A0' }} /> : <UploadFileIcon sx={{ fontSize: '24px' }} />}
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: '#666' }}>
        Drag and drop files here or click "Select File" to upload
      </Typography>
      <Box sx={{ mt: 2 }}>
        {files.length > 0 && (
          <Typography variant="body2" sx={{ mb: 1, color: '#9E9E9E' }}>
            Attached files:
          </Typography>
        )}
        <ul style={{ paddingLeft: '20px', margin: 0, listStyle: 'none' }}>
          {files.map((file, index) => (
            <li key={index} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {file.name}
              <IconButton
                size="small"
                sx={{ ml: 2, color: '#FF3D00' }}
                onClick={() => handleRemoveFile(file.name)}
              >
                <RemoveCircleIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </Box>
      {uploadingFiles && (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <CircularProgress size={24} sx={{ mr: 2 }} />
          <Typography variant="body2">Uploading files...</Typography>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      >
        <Alert onClose={handleCloseSnackbar} severity={successMessage.includes('Error') ? 'error' : 'success'}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FileUpload;
