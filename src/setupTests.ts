// Generally in FE we want to test the following:
// Determine if a component renders with or without props
// See how our components will render with state changes
// Also seeing how our components deals with (reacts) user interaction

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
})

