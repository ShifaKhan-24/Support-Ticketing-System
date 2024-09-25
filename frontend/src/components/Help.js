import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography, Link, Container, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Help = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper 
        elevation={1} 
        sx={{
          p: 4, 
          borderRadius: 2,
          backgroundColor: '#FFFFFF', // Light background Subtle border for the card
        }}>
        
        {/* Page Title */}
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            color: '#0d47a1' // Industry-standard deep blue for main headings
          }}
        >
          Help & Support
        </Typography>

        {/* FAQ Section */}
        <Box my={4}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: '#37474f' // Muted dark gray for subheadings
            }}
          >
            Frequently Asked Questions (FAQs)
          </Typography>

          <Accordion sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq1-content" id="faq1-header">
              <Typography variant="h6" sx={{ color: '#212121' }}>How do I create a new ticket?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#616161' }}>
                To create a new ticket, navigate to the "Create Ticket" page, fill out the form with the required details, and submit it.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq2-content" id="faq2-header">
              <Typography variant="h6" sx={{ color: '#212121' }}>How can I track the status of my tickets?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#616161' }}>
                Go to the "View Tickets" page to view all your active and closed tickets, along with their statuses.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="faq3-content" id="faq3-header">
              <Typography variant="h6" sx={{ color: '#212121' }}>Who can I contact for additional support?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#616161' }}>
                If you need further assistance, feel free to reach out to our support team at 
                <Link href="mailto:support@example.com" underline="hover" sx={{ ml: 1, color: '#0d47a1' }}>support@example.com</Link>.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Contact Us Section */}
        <Box my={4}>
          <Typography variant="h5" gutterBottom sx={{ color: '#37474f' }}>
            Contact Us
          </Typography>
          <Typography sx={{ color: '#616161' }}>
            If you have any questions or need assistance, feel free to contact us:
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: '#212121' }}>
            <strong>Email:</strong> <Link href="mailto:support@example.com" underline="hover" sx={{ color: '#0d47a1' }}>support@example.com</Link>
          </Typography>
        </Box>
      </Paper>

      {/* Additional Resources Section - Placed at the Bottom */}
      <Box my={6}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: '#37474f' // Muted dark gray for subheadings
          }}
        >
          Additional Resources
        </Typography>
        <Typography 
          sx={{ 
            textAlign: 'center',
            color: '#616161' 
          }}>
          Explore more about our policies and services:
        </Typography>
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
          <li>
            <Link href="/privacy-terms" underline="hover" sx={{ color: '#0d47a1' }}>
              Privacy Terms
            </Link>
          </li>
          <li>
            <Link href="/about" underline="hover" sx={{ color: '#0d47a1' }}>
              About Us
            </Link>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default Help;
