const request = require('supertest');
const app = require('../server'); // Import the app
const mongoose = require('mongoose');
const sinon = require('sinon');
const Ticket = require('../src/models/ticketModel'); // Adjust the path to your Ticket model

let server;

describe('Communication Controller', () => {
  beforeAll(() => {
    const port = process.env.TEST_PORT || 4000;
    server = app.listen(port);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {
    sinon.restore();
  });

  describe('Adding Communications', () => {
    test('should add a communication to the ticket', async () => {
      const ticketId = 1; // Example ticket ID
      const newCommunication = {
        sender: 'customer@example.com',
        message: 'Hello, I need help!',
        attachments: [],
      };

      const mockTicket = {
        ticketId: ticketId,
        communications: [],
        save: sinon.stub().returns(Promise.resolve(true)), // Mock save function
      };

      sinon.stub(Ticket, 'findOne').returns(Promise.resolve(mockTicket));

      const response = await request(server)
        .post(`/api/tickets/${ticketId}/communications`)
        .send(newCommunication);

      expect(response.statusCode).toBe(200);
      expect(mockTicket.communications.length).toBe(1);
      expect(mockTicket.communications[0].sender).toBe(newCommunication.sender);
      expect(mockTicket.save.calledOnce).toBe(true);
    });

    test('should return 404 if the ticket is not found', async () => {
      const ticketId = 1; // Example ticket ID

      sinon.stub(Ticket, 'findOne').returns(Promise.resolve(null)); // Simulate ticket not found

      const response = await request(server)
        .post(`/api/tickets/${ticketId}/communications`)
        .send({
          sender: 'customer@example.com',
          message: 'Hello, I need help!',
          attachments: [],
        });

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error', 'Ticket not found');
    });

    test('should return 500 if there is a server error', async () => {
      const ticketId = 1; // Example ticket ID

      sinon.stub(Ticket, 'findOne').throws(new Error('Server Error')); // Simulate server error

      const response = await request(server)
        .post(`/api/tickets/${ticketId}/communications`)
        .send({
          sender: 'customer@example.com',
          message: 'Hello, I need help!',
          attachments: [],
        });

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('error', 'Server Error');
    });
  });

 
});
