import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import React from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FormBuilderProvider } from './context/FormBuilderContext';
import FormLibraryPage from './pages/FormLibraryPage';
import PublishedFormPage from './pages/PublishedFormPage';
import AppRouter from './AppRouter';

const theme = createTheme({
  palette: { mode: 'light' },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <FormBuilderProvider>
          <AppRouter />
        </FormBuilderProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
