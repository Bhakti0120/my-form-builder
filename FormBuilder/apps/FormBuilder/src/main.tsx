import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { FormBuilderProvider } from './context/FormBuilderContext';
import { Mode } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode:"light"
  },
  components: {
  }
})



const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormBuilderProvider>
        <App />
      </FormBuilderProvider>
    </ThemeProvider>
  </React.StrictMode>
);
