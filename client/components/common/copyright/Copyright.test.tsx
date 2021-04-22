import { render, screen } from '@testing-library/react';
import Copyright from './Copyright';
import { lightTheme, darkTheme } from '../../../styles/theme';
import { ThemeProvider } from '@emotion/react';

test('displays Snippet Bank', async () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Copyright />
    </ThemeProvider>
  );
  const anchor = screen.getByText('Snippet Bank');
  expect(anchor).toBeInTheDocument();
});
