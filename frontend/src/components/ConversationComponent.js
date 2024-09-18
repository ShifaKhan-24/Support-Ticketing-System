import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField, Button } from '@mui/material';
import api from '../services/api';

const Conversation = ({ ticketId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/tickets/${ticketId}/communications`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching communications:', error);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchMessages();
    }
  }, [ticketId]);

  useEffect(() => {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await api.post(`/tickets/${ticketId}/communications`, {
        sender: currentUser, // Use the current user as sender
        message: newMessage,
      });
      setMessages((prev) => [...prev, { sender: currentUser, message: newMessage, timestamp: new Date() }]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '60vh', // Adjust height dynamically
        bgcolor: '#F4F6F9',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        id="messageContainer"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: msg.sender === currentUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === currentUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {msg.sender}
                </Typography>
                <Box
                  sx={{
                    display: 'inline-block',
                    padding: 1.5,
                    borderRadius: '16px',
                    bgcolor: msg.sender === currentUser ? '#00ACC1' : '#E0E0E0',
                    color: msg.sender === currentUser ? '#fff' : '#000',
                    wordBreak: 'break-word',
                  }}
                >
                  <Typography variant="body2">{msg.message}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No conversation yet.</Typography>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 1,
          borderTop: '1px solid #E0E0E0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <TextField
          fullWidth
          placeholder="Type your message here..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending}
          sx={{ marginRight: 1 }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};

export default Conversation;
