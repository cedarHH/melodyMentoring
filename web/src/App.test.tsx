// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders welcome route', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/./i);
  expect(welcomeElement).toBeInTheDocument();
});

