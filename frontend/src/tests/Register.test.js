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

// test('renders customer specific fields when role is customer', () => {
//   render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   );

//   const roleSelect = screen.getByLabelText(/Role/i);
// userEvent.selectOptions(roleSelect, 'customer');
//   const phoneInput = screen.getByLabelText(/Phone/i);
//   const addressInput = screen.getByLabelText(/Address/i);

//   expect(phoneInput).toBeInTheDocument();
//   expect(addressInput).toBeInTheDocument();
// });

// test('renders agent specific fields when role is agent', () => {
//   render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   );

//   // ... (rest of the test case)
// });

// test('hides customer specific fields when role is not customer', () => {

//   render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   );

//   // ... (rest of the test case)
// });

// test('hides agent specific fields when role is not agent', () => {
//   render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   );

//   // ... (rest of the test case)
// });


// test('submits form with valid customer data', async () => {

//   const { getByLabelText, getByText, queryByLabelText, getByRole } = render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   );

//   const fullNameInput = getByLabelText(/Full Name/i);
//   const emailInput = getByLabelText(/Email Address/i);
//   const passwordInput = getByLabelText(/Password/i);
//   const roleSelect = getByLabelText(/Role/i);
//   const submitButton = getByRole('button', { name: /Register/i });

//   // Ensure the "customer" role is selected before querying for customer-specific fields
//   fireEvent.selectEvent(roleSelect, { target: { value: 'customer' } });

//   const phoneInput = getByLabelText(/Phone/i); // Should be found after selecting "customer"
//   const addressInput = getByLabelText(/Address/i);

//   fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });
//   fireEvent.change(phoneInput, { target: { value: '1234567890' } });
//   fireEvent.change(addressInput, { target: { value: '123 Main St' } });

//   await fireEvent.submit(submitButton);

//   // Simulate successful API response (implementation specific)
//   expect(console.log).toHaveBeenCalledWith(expect.stringContaining('User registered successfully'));
//   expect(navigate).toHaveBeenCalledWith('/'); // Check navigation to login page
// });



