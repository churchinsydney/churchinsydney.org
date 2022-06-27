import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'intersection-observer';
import 'whatwg-fetch';
import { server } from './test/__mocks__/network/server';

import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
