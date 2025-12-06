import React, { useEffect, useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Stack,
  Button,
} from '@mui/material';
import FormBuilder from '../Components/Layout/FormBuilder';
import FormPreview from '../Components/Preview/FormPreview';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { defaultConfig, useFormBuilder } from '../context/FormBuilderContext';

export default function App() {
  const [mode, setMode] = useState<'builder' | 'preview'>('builder');
  const [params] = useSearchParams();
  const { formConfig, updateForm } = useFormBuilder();
  const editId = params.get('edit');
  const navigate = useNavigate();
  useEffect(() => {
    if (editId) {
      const stored = JSON.parse(
        localStorage.getItem('published-forms') || '{}'
      );
      if (stored[editId]) updateForm(stored[editId].config);

    }
  }, [editId]);
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': { opacity: 0.8 },
            }}
            onClick={() => {
              updateForm(defaultConfig); // reset to default
              navigate('/'); // go home (or '/form-builder')
            }}
          >
            FormCraft
          </Typography>

          {/* Navigation
          <Button color="inherit" sx={{ mr: 1 }} onClick={() => navigate('/')}>
            Builder
          </Button> */}

          <Button
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => navigate('/forms')}
          >
            Form Library
          </Button>

          <Typography variant="body2" sx={{ mr: 1 }}>
            Preview
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Switch
              checked={mode === 'preview'}
              onChange={() =>
                setMode((m) => (m === 'builder' ? 'preview' : 'builder'))
              }
              color="default"
              slotProps={{
                input: { 'aria-label': 'toggle preview' },
              }}
            />
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        {mode === 'builder' ? <FormBuilder /> : <FormPreview />}
      </Box>
    </Box>
  );
}
