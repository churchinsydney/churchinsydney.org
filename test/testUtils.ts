import { render } from '@testing-library/react';
import { ReactElement, JSXElementConstructor } from 'react';

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: { children: ReactElement }) => {
  return children;
};

const customRender = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  options = {}
) => render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
