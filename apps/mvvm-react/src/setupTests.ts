// This file is run before each test file.
// It's a good place to set up global configurations or imports.

// Extends Vitest's expect method with methods from react-testing-library
// e.g. toBeInTheDocument, toHaveTextContent, etc.
import '@testing-library/jest-dom';

// If you need to set up anything else globally for your tests, you can do it here.
// For example, you could set up MSW server here if you didn't want to do it in each test file,
// but the current approach (beforeAll/afterAll in test file) is also common.
// If using MSW for all tests, you might consider:
// import { server } from './mocks/server';
// beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
