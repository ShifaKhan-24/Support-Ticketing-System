const request = require('supertest');
const app = require('../server'); // Import the app
const mongoose = require('mongoose');
const sinon = require('sinon');
const Ticket = require('../src/models/ticketModel');
const axios = require('axios'); // Import axios

jest.mock('axios'); // Mock axios globally for all tests

let server;

describe('Ticket Controller', () => {
  beforeAll(() => {
    const port = process.env.TEST_PORT || 4000;
    server = app.listen(port);

    // Mock axios.post to always resolve successfully
    axios.post.mockResolvedValue({
      data: { message: 'Notification sent successfully' },
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {
    sinon.restore(); // Restore any stubs or mocks after each test
  });

  describe('Creating Tickets', () => {
    test('should create a new ticket and send notification', async () => {
      const newTicket = {
        subject: 'Test Ticket',
        description: 'This is a test ticket.',
        customerEmail: 'customer@example.com',
        categoryName: 'billing',
      };

      const saveStub = sinon.stub(Ticket.prototype, 'save').returns(Promise.resolve(newTicket));

      const response = await request(server)
        .post('/api/tickets')
        .send(newTicket);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('savedTicket');
      expect(response.body.savedTicket.subject).toBe(newTicket.subject);
      expect(saveStub.calledOnce).toBe(true);

      // Check that axios.post was called (for sending the notification)
      expect(axios.post).toHaveBeenCalledTimes(1); // Notification API call should be made
    });
  });

  describe('Retrieving Tickets', () => {
    test('should get a ticket by ID', async () => {
      const ticket = {
        _id: '60c72b2f9f1b2b001fbc3e58',
        subject: 'Another Test Ticket',
        description: 'Testing ticket retrieval.',
        customerEmail: 'customer@example.com',
        categoryName: 'billing',
      };

      sinon.stub(Ticket, 'findById').returns(Promise.resolve(ticket));

      const response = await request(server)
        .get(`/api/tickets/${ticket._id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('subject', 'Another Test Ticket');
      expect(Ticket.findById.calledOnce).toBe(true);
    });

    test('should return 404 if ticket not found', async () => {
      const ticketId = '60c72b2f9f1b2b001fbc3e58';

      sinon.stub(Ticket, 'findById').returns(Promise.resolve(null));

      const response = await request(server)
        .get(`/api/tickets/${ticketId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Ticket not found');
    });
  });

  describe('Deleting Tickets', () => {
    test('should delete a ticket', async () => {
      const ticketId = '60c72b2f9f1b2b001fbc3e58';

      sinon.stub(Ticket, 'findByIdAndDelete').returns(Promise.resolve({ _id: ticketId }));

      const response = await request(server)
        .delete(`/api/tickets/${ticketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Ticket deleted successfully');
      expect(Ticket.findByIdAndDelete.calledOnce).toBe(true);
    });

    test('should return 404 if ticket not found for deletion', async () => {
      const ticketId = '60c72b2f9f1b2b001fbc3e58';

      sinon.stub(Ticket, 'findByIdAndDelete').returns(Promise.resolve(null));

      const response = await request(server)
        .delete(`/api/tickets/${ticketId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Ticket not found');
    });
  });
});
