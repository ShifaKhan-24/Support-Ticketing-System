// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'; // For additional matchers

describe('App Routing', () => {
  test('renders LoginPage component on initial load ("/")', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('renders Register component on "/register" route', () => {
    window.history.pushState({}, 'Register Page', '/register');
    render(<App />);
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
  });

  test('redirects to AgentPage on "/dashboard" route if role is agent', () => {
    // Set the role and id in localStorage to simulate an agent user
    localStorage.setItem('role', 'agent');
    localStorage.setItem('id', '1'); // Set a mock ID
  
    window.history.pushState({}, 'Dashboard Page', '/dashboard');
    render(<App />);
    
    // Verify that the redirect happens by checking for an element specific to the AgentPage
    expect(screen.getByRole('heading', { name: /agent dashboard/i })).toBeInTheDocument();
  });
  
  // test('redirects to CustomerPage on "/dashboard" route if role is customer', () => {
  //   // Set the role and id in localStorage to simulate a customer user
  //   localStorage.setItem('role', 'customer');
  //   localStorage.setItem('id', '2'); // Set a mock ID
  
  //   window.history.pushState({}, 'Dashboard Page', '/dashboard');
  //   render(<App />);
    
  //   // Verify that the redirect happens by checking for an element specific to the CustomerPage
  //   expect(screen.getByRole('heading', { name: /customer page/i })).toBeInTheDocument();
  // });
  
  test('redirects to login on "/dashboard" route if no role is found', () => {
    // Clear localStorage to simulate no role
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  
    window.history.pushState({}, 'Dashboard Page', '/dashboard');
    render(<App />);
    
    // Verify that the redirect happens by checking for an element specific to the login page
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });
  

  test('renders CustomerPage component on "/customer" route', () => {
    window.history.pushState({}, 'Customer Page', '/customer');
    render(<App />);
  
    // Assuming the heading has a specific class or ID
    expect(screen.getByRole('heading', { className: 'customer-page-heading' })).toBeInTheDocument();
  });

  test('renders AgentPage component on "/agent" route', () => {
    window.history.pushState({}, 'Agent Page', '/agent');
    render(<App />);
    // Assuming your AgentPage has a specific element, e.g., a heading with the text "Agent Dashboard"
    expect(screen.getByRole('heading', { name: /agent dashboard/i })).toBeInTheDocument();
  });

  // test('renders 404 page for unknown routes', () => {
  //   window.history.pushState({}, 'Not Found', '/some/unknown/path');
  //   render(<App />);
  
  //   // Assuming the heading has a specific class or ID
  //   expect(screen.getByRole('heading', { className: 'not-found-heading' })).toBeInTheDocument();
  // });
});
