// setup-jest.ts

// Zone.js (Angular async testing support)
import 'zone.js';
import 'zone.js/testing';

// Initialize Angular test environment
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

beforeAll(() => {
  // Only init once
  try {
    getTestBed().initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  } catch {
    // ignore if already initialized (watch mode, etc.)
  }
});

// --- Optional JSDOM shims (uncomment if you hit related errors) ---

// Fix window.CSS access for some Angular internals
// Object.defineProperty(window, 'CSS', { value: null });

// Fix getComputedStyle calls (animations)
// Object.defineProperty(window, 'getComputedStyle', {
//   value: () => ({ display: 'none', appearance: ['-webkit-appearance'] })
// });

// Document doctype (some libs check it)
// Object.defineProperty(document, 'doctype', { value: '<!DOCTYPE html>' });
