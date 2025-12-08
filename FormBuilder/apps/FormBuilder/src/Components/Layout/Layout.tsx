// src/layout/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { defaultConfig, useFormBuilder } from '../../context/FormBuilderContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // const location = useLocation();
  const { updateForm } = useFormBuilder();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ mb: { xs: 1, md: 3 } }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { opacity: 0.85 },
            }}
            onClick={() => {
              updateForm(defaultConfig);
              navigate('/');
            }}
          >
            FormCraft
          </Typography>

          <Button color="inherit" onClick={() => navigate('/')}>
            Builder
          </Button>

          <Button color="inherit" onClick={() => navigate('/forms')}>
            Form Library
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: { xs: 2, md: 4 },
          width: { xs: '95%', md: '80%' },
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
