import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../components/Register';
import { MemoryRouter } from 'react-router-dom';


test('renders Register component correctly', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Assuming the Register component has a unique ID or class name
  const titleElement = screen.getByRole('heading', { name: /Register/i });
  // Or: const titleElement = screen.getByTestId('register-title');

  expect(titleElement).toBeInTheDocument();
});

test('renders all input fields', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const fullNameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  

  expect(fullNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
 

});




