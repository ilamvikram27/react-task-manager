import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the App component', () => {
  render(<App />);
  // Check for a known element in your app
  const header = screen.getByText(/all/i); // your "All" filter button
  expect(header).toBeInTheDocument();
});
