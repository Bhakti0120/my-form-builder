// src/layout/Layout.tsx
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormBuilder, defaultConfig } from '../../context/FormBuilderContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { updateForm } = useFormBuilder();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          {/* Logo */}
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

          {/* Navigation Links */}
          <Button color="inherit" onClick={() => navigate('/')}>
            Builder
          </Button>

          <Button color="inherit" onClick={() => navigate('/forms')}>
            Form Library
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
