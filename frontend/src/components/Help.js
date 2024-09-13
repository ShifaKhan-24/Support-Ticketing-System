import React from 'react';

const Help = () => {
  return (
    <div>
      <h1>Help & Support</h1>
      <section>
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>
            <strong>How do I create a new ticket?</strong>
            <p>To create a new ticket, go to the 'Create Ticket' page, fill out the form, and submit it.</p>
          </li>
          <li>
            <strong>How can I track the status of my tickets?</strong>
            <p>Visit the 'View Tickets' page to see all your active and closed tickets.</p>
          </li>
          <li>
            <strong>Who can I contact for additional support?</strong>
            <p>If you need further assistance, please contact our support team at support@example.com.</p>
          </li>
        </ul>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>If you have any questions or need help, feel free to reach out to us:</p>
        <p><strong>Email:</strong> support@example.com</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <ul>
          <li><a href="/privacy-terms">Privacy Terms</a></li>
          <li><a href="/about">About Us</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
