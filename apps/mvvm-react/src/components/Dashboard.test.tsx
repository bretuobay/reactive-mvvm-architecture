import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import Dashboard from './Dashboard';
import { server } from '../mocks/server'; // Corrected path

// MSW setup for tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Dashboard Component', () => {
  it('renders successfully without throwing an error', () => {
    expect(() => render(<Dashboard />)).not.toThrow();
  });

  it('displays the main title "Greenhouse Dashboard"', async () => {
    render(<Dashboard />);
    // Use findByRole for async operations, though h1 might be present immediately
    // For initial render, getByRole might be fine if not waiting for data.
    // Using findByRole to be safe if any part of title appearance is delayed.
    expect(await screen.findByRole('heading', { name: /Greenhouse Dashboard/i, level: 1 })).toBeInTheDocument();
  });

  it('displays section titles', async () => {
    render(<Dashboard />);
    // Sections might initially show "Loading..." or similar,
    // but the titles themselves should be there.
    expect(await screen.findByRole('heading', { name: /Overview/i, level: 2 })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Sensor Readings/i, level: 2 })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /Alert Status/i, level: 2 })).toBeInTheDocument();
  });

  // More tests will be added for content based on mocked data
  it('shows loading state for charts initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Loading charts.../i)).toBeInTheDocument();
  });

  it('shows loading state for alerts initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Loading alerts.../i)).toBeInTheDocument();
  });
});
