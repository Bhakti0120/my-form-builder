// src/app/App.tsx
import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../AppRouter';
import { FormBuilderProvider } from '../context/FormBuilderContext';

const theme = createTheme({
  palette: { mode: 'light' },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormBuilderProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FormBuilderProvider>
    </ThemeProvider>
  );
}
