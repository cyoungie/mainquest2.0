import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MainQuest landing page', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Discover and connect/i })).toBeInTheDocument();
  expect(screen.getByText(/Social platform for college students/)).toBeInTheDocument();
});
