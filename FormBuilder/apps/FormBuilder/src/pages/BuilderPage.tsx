import React, { useEffect, useState } from 'react';
import { Box, Switch, Stack, Typography, TextField } from '@mui/material';
import FormBuilder from '../Components/Layout/FormBuilder';
import FormPreview from '../Components/Preview/FormPreview';
import { useSearchParams } from 'react-router-dom';
import { useFormBuilder } from '../context/FormBuilderContext';

export default function BuilderPage() {
  const [mode, setMode] = useState<'builder' | 'preview'>('builder');
  const [params] = useSearchParams();
  const { formConfig, updateForm } = useFormBuilder();
  const editId = params.get('edit');

  useEffect(() => {
    if (editId) {
      const stored = JSON.parse(
        localStorage.getItem('published-forms') || '{}'
      );
      const tpl = stored[editId];
      if (tpl) updateForm(tpl.config ?? tpl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ formLabel: e.target.value });
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" sx={{mb:1}}>Dynamic Form Builder</Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <TextField
            label="Form Title"
            value={formConfig.formLabel}
            onChange={handleTitleChange}
            size="small"
            sx={{ width: { xs: '100%', sm: 400, md: 500 } }}
          />

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>Preview</Typography>
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
        </Stack>
      </Box>

      {mode === 'builder' ? <FormBuilder /> : <FormPreview />}
    </Box>
  );
}
