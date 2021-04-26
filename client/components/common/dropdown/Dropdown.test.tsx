import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { lightTheme, darkTheme } from '../../../styles/theme';
import { ThemeProvider } from '@emotion/react';

test('displays dropdown button', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Dropdown nickname={'tony'} email={'a@b.com'} onLogout={() => {}} onToggleTheme={() => {}} />
    </ThemeProvider>
  );

  const dropdownBtn = screen.getByRole('button');
  const nav = screen.getByTestId('dropdown-nav');

  expect(dropdownBtn).toBeInTheDocument();
  expect(nav).toHaveStyle('visibility: hidden');
});

test('disyplays dropdown-nav when clicks dropdown-button', () => {
  render(
    <ThemeProvider theme={lightTheme}>
      <Dropdown nickname={'tony'} email={'a@b.com'} onLogout={() => {}} onToggleTheme={() => {}} />
    </ThemeProvider>
  );

  const dropdownBtn = screen.getByRole('button');
  const nav = screen.getByTestId('dropdown-nav');

  fireEvent.click(dropdownBtn);

  expect(nav).toHaveStyle('visibility: visible');
});
