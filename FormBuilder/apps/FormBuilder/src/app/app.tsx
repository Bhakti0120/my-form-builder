// src/app/app.tsx
import {  useLayoutEffect, useState } from 'react';
import { Box, Switch, Stack, Typography } from '@mui/material';
import FormBuilder from '../Components/Layout/FormBuilder';
import FormPreview from '../Components/Preview/FormPreview';
import { useSearchParams } from 'react-router-dom';
import { useFormBuilder } from '../context/FormBuilderContext';

export default function App() {
  const [mode, setMode] = useState<'builder' | 'preview'>('builder');
  const [params] = useSearchParams();
  const { updateForm } = useFormBuilder();
  const editId = params.get('edit');

  useLayoutEffect(() => {
    if (editId) {
      const stored = JSON.parse(
        localStorage.getItem('published-forms') || '{}'
      );
      const tpl = stored[editId];
      if (tpl) {
        // tpl is the saved template object; tpl.config is the actual FormConfig
        updateForm(tpl.config ?? tpl);
      }
    }
  }, [editId, updateForm]);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        {/* <Typography variant="h4">Dynamic Form Builder</Typography> */}

        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Preview</Typography>
          <Switch
            checked={mode === 'preview'}
            onChange={() =>
              setMode((m) => (m === 'builder' ? 'preview' : 'builder'))
            }
            color="default"
            slotProps={{ input: { 'aria-label': 'toggle preview' } }}
          />
        </Stack>
      </Box>

      {mode === 'builder' ? <FormBuilder /> : <FormPreview />}
    </Box>
  );
}
